import React from "react";

import "./page.css";

import { VscDebugBreakpointLog } from "react-icons/vsc";


const page = ({ data, setData }) => {
  
  const handleChange = (e) => {
    setData({ ...data, agree: e.target.checked });
  };

  return (
    <div className="RulesComponent">
      <div className="RulesComponent-in">
        <div className="rc-one">
          <h1>Rules and Regulations for Registration</h1>
          <p>
            Please read the following rules and regulations carefully before
            submitting your application.
          </p>
        </div>
        <div className="rc-two">
          <div className="rc-two-in">
            <p>
              <VscDebugBreakpointLog />
              Students are permitted to register under only one domain from the five available each semester.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Once a domain is selected, it cannot be changed for the duration of the semester.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Each domain encompasses several clubs.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students may register for only one club within their chosen domain.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Multiple club registrations within the same domain are not permitted.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students must thoroughly review the programs offered by their selected club before completing registration.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Upon registration, active participation in all assigned programs for the semester is mandatory.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Failure to participate in assigned programs will result in the deduction of points.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Regular attendance in club activities and programs is compulsory.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students with unsatisfactory attendance will face penalties and may lose eligibility to continue with the Student Activity Center.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Once the registration process is completed, students cannot modify their selected club or domain for the semester.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students are strongly advised to evaluate their options carefully before finalizing their registration.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students must consult the Student Activity Center Handbook for comprehensive rules, regulations, and procedural guidelines related to registration and participation.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students are encouraged to make informed decisions and avoid manipulation or hasty choices during registration.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Post-registration, club assignments will be mandatory, and students must comply with their designated responsibilities.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students failing to meet attendance or program participation requirements will face penalties, including potential removal from Student Activity Center activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
