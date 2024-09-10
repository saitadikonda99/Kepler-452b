import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KL University SAC",
  description: "Student Activity Center at K L Deemed to be University",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
        <body className={inter.className}>
            <Toaster position="top-right" />
            {children}
        </body>
    </html>
  );
}