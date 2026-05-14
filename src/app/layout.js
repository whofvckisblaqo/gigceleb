import { Geist } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/ui/SessionProvider";
import TawkTo from "@/components/ui/TawkTo";
import Translator from "@/components/ui/Translator";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Gigceleb — Exclusive Celebrity Experiences",
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
          <TawkTo />
          <Translator />
        </NextAuthProvider>
      </body>
    </html>
  );
}