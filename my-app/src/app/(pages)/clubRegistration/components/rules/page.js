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
          <h1>Rules and Regulations</h1>
          <p>
            Please read the following rules and regulations carefully before
            submitting your application.
          </p>
        </div>
        <div className="rc-two">
          <div className="rc-two-in">
            <p>
              <VscDebugBreakpointLog />
              All students must register for one course only—either a beginner
              or intermediate course.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students cannot enroll in multiple courses at the same time.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Beginner courses are designed for students with no prior knowledge
              of the subject.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Intermediate courses are open to students who have completed a
              beginner course or have equivalent knowledge.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Students must complete the payment through the ERP system and provide
              the payment reference number during registration.
            </p>
            <p>
              <VscDebugBreakpointLog />
              Registration will be confirmed only after verifying the ERP payment
              reference number.
            </p>
          </div>
        </div>
        <div className="rc-three">
          <input type="checkbox" checked={data.agree} onChange={handleChange} />
          <p>I have read and agree to the above rules and regulations</p>
        </div>
      </div>
    </div>
  );
};

export default page;
