import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Point Of Sales",
  description: "The best POS system for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logoeasefarm.png" />
      <body className={poppins.className}>
        {/* <Navbar notifications={[]} /> */}
        <ToasterContext />
        <div>{children}</div>
      </body>
    </html>
  );
}
