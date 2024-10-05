"use client";
import React from "react";
import { useState, useEffect } from "react";

import Footer from "./Components/Footer/page";
import Navbar from "./Components/Navbar/Navbar";

// UI imports start here
import Home from "./UI/home/page";
import Stats from "./UI/stats/page";
import Domains from "./UI/domains/page";
import News from "./UI/news/page";
import Events from "./UI/events/page";
import Socials from "./UI/socials/page";
import Faq from "./UI/Faq/page";
import Clubs from "./UI/clubs/page";

import LoaderComponent from "./Components/loader/loader";

const page = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const savedLoaderState = sessionStorage.getItem("showLoader");

    if (savedLoaderState !== null) {
      setShowLoader(JSON.parse(savedLoaderState));
    }

    const someRequest = () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 4000);
      });
    };

    someRequest().then(() => {
      setShowLoader(false);
      sessionStorage.setItem("showLoader", JSON.stringify(false));
    });
    
  }, []);

  return showLoader ? (
    <LoaderComponent />
  ) : (
    <div className="HomeComponent">
      <div className="HomeComponent-in">
        <div className="Navbar">
          <Navbar />
        </div>

        {/* Home Component */}
        <Home />
        {/* Home Stats */}
        <Stats />
        {/* Home Domains */}
        <Domains />

        {/* Home Image */}
       {/* <div className="four">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/GroupPhoto%2FGroupPhoto.png?alt=media&token=9b5d582f-fb7d-4628-b187-7af43fdd6932"
            alt=""
          />
        </div> */}

        {/* Home News */}
        <News />
        {/* Home Events */}
        <Events />
        {/* Home Socials */}
        <Socials />
        {/* Home Faq's */}
        <Faq />
        {/* Home Clubs */}
        <Clubs />

        {/* Footer */}
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;
