import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Footer, Nav} from "./components/index"
import { Poppins } from 'next/font/google'
 
const poppins = Poppins({
  weight: ["300",'400',"500","600"],
  subsets: ['latin'],
  display: 'swap',
})
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohammed Khaled MERN Stack",
  description: "Mern Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Nav/>
        <Footer/>
        </body>
    </html>
  );
}
