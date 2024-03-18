// src/app/Layout.js
import { useEffect, useState } from "react";
import Head from "next/head";
import "../globals.css";

export default function Layout({ children }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating some asynchronous request
    const someRequest = () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000); // Simulating a 2-second loading time
      });
    };

    someRequest().then(() => {
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <Head>
          <link
            rel="icon"
            href="https://your-domain.com/kl_logo_one.jpeg" // Update with your actual domain
          />
        </Head>
        <div className="loader-content">
          {/* Your loading animation SVG or text here */}
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* Your meta tags and stylesheets here */}
      </Head>
      {children}
    </>
  );
}
