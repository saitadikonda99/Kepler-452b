import React from "react";

import "./page.css";

const page = ({ data, setData }) => {
  
  const handleChange = (e) => {
    setData({ ...data, agree: e.target.checked });
  };

  return (
    <div className="RulesComponent">
      <div className="RulesComponent-in">
        <div className="rc-one">
          <h1>Rules and Regulations</h1>
          <p>
            Please read the following rules and regulations carefully before
            submitting your application.
          </p>
        </div>
        <div className="rc-two">
          <div className="rc-two-in">
            <p>
              Before we get too far along, let's confirm your eligibility for
              the program. In order to apply for this program you must meet all
              of the criteria listed below.
            </p>
            <p>
              Before we get too far along, let's confirm your eligibility for
              the program. In order to apply for this program you must meet all
              of the criteria listed below.
            </p>
            <p>
              Before we get too far along, let's confirm your eligibility for
              the program. In order to apply for this program you must meet all
              of the criteria listed below.
            </p>
            <p>
              Before we get too far along, let's confirm your eligibility for
              the program. In order to apply for this program you must meet all
              of the criteria listed below.
            </p>
            <p>
              Before we get too far along, let's confirm your eligibility for
              the program. In order to apply for this program you must meet all
              of the criteria listed below.
            </p>
          </div>
        </div>
        <div className="rc-three">
          <input type="checkbox" checked={data.agree} onChange={handleChange} />
          <p>I agree to the above terms and conditions</p>
        </div>
      </div>
    </div>
  );
};

export default page;
