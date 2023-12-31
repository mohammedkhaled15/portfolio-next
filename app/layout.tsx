import "./globals.css";
import type { Metadata } from "next";
import { Footer, Nav } from "./components/index"
// import { Poppins } from 'next/font/google'
import Provider from "./components/provider/Provider";

// const poppins = Poppins({
//   weight: ["300", '400', "500", "600"],
//   subsets: ['latin'],
//   display: 'swap',
// })


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
      <body>
        <Provider>
          {children}
          <Nav />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
