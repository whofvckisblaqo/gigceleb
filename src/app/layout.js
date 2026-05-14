import { Geist } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/ui/SessionProvider";
import Smartsupp from "@/components/ui/Smartsupp";
import Translator from "@/components/ui/Translator";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "StarReach — Where Fans Meet Fame",
  description:
    "The premier celebrity booking platform. Book VIP experiences, meet & greets, event appearances and more.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <NextAuthProvider>
          {children}
          <Smartsupp />
          <Translator />
        </NextAuthProvider>
      </body>
    </html>
  );
}