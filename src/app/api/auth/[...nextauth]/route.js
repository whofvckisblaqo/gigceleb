import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isAdmin: { label: "isAdmin", type: "text" },
      },
      async authorize(credentials) {
        await connectDB();

        let user;

        // Admin login — bypasses verification
        if (credentials.isAdmin === "true") {
          user = await User.findOne({ role: "admin" });
          if (!user) throw new Error("Admin account not found");

          // Auto verify admin if not verified
          if (!user.isVerified) {
            await User.findByIdAndUpdate(user._id, { isVerified: true });
          }
        } else {
          user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("No account found with this email");

          // Check email verification for regular users
          if (!user.isVerified) {
            throw new Error("Please verify your email before logging in");
          }
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Incorrect password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };