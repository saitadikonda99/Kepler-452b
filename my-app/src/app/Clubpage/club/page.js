import React from "react";
import "./page.css";

import Link from "next/link";

import Footer from "../../Components/Footer/page";
import { ClubArray } from "../../../data/ClubArray";

const Page = ({ params }) => {
  const club = ClubArray[params.ClubId];

  return (
    <div className="club-page">
      <div className="club-page-in">
        <div className="back-to-home">
          <Link className="back-to-home-link" href="/">
            Back to Home
          </Link>
        </div>
        <div className="club-page-header">
          <div className="club-page-header-in">
            <div className="club-page-header-in-one">
              <h3>{club?.Club_Categ}</h3>
              <h1> {club?.Club_Name}</h1>
              <h4>{club?.Club_Lead_Name}</h4>
            </div>
            <div className="club-page-header-in-two">
              <h1>Department of Student Activity Center</h1>
              <span>
                A department where learning occurs beyond the confines of the
                traditional classroom walls
              </span>
            </div>
          </div>
        </div>

        <div className="club-page-in-one">
          <div className="club-page-in-one-one">
            <img src={club?.Club_Image} alt={club?.Club_Name} />
          </div>
          <div className="club-page-in-one-two">
            <div className="club-page-in-one-two-in">
              <h2>What is {club?.Club_Name}?</h2>
              <p>{club?.Club_Description}</p>
            </div>
          </div>
        </div>
        <div className="club-page-last">
          <h4>{club?.Rights}</h4>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
