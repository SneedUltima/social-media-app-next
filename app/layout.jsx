import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@components/Header";
import Navbar from "@components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SocialBuzz",
  description: "Share your thoughts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="flex">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
