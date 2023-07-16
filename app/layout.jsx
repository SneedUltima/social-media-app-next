import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import { ToastContainer, toast } from "react-toastify";
import { NavProvider } from "../context/NavContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SocialBuzz",
  description: "Share your thoughts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NavProvider>
            <main>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              {children}
            </main>
          </NavProvider>
        </Provider>
      </body>
    </html>
  );
}
