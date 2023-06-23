import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SocialScape",
  description: "Share your thoughts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
