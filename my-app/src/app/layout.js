import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "KL University SAC",
  description: "Student Activity Center at K L Deemed to be University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className="font-sans">
            <Toaster position="top-right" />
            {children}
        </body>
    </html>
  );
}