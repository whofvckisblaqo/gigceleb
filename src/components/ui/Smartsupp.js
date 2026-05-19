import "./globals.css";
import { Inter } from "next/font/google";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Smartsupp from "@/components/Smartsupp";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your Website Name",
  description: "Your Website Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <Smartsupp />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}