"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../sil/Navbar";
import Footer from "../components/footer/page";

import "./page.css";


import Rules from "./components/rules/page.js";
import CourseDetails from "./components/courseDetails/page.js";
import StudentInfo from "./components/studentInfo/page.js";
import Address from "./components/address/page.js";
import ClubData from "./components/clubData/page.js";

const steps = [
  { label: "Rules", component: Rules },
  { label: "Course Details", component: CourseDetails },
  { label: "Student Info", component: StudentInfo },
  { label: "Address", component: Address },
  { label: "Club Data", component: ClubData },
];

const Page = () => {
  const [data, setData] = useState({
    agree: false,
    name: "",
    idNumber: "",
    email: "",
    branch: "",
    gender: "",
    countryCode: "",
    phoneNumber: "",
    year: "",
    residency: "",
    hostelName: "",
    busRoute: "",
    country: "",
    state: "",
    district: "",
    pinCode: "",
    domain: "",
    clubId: "",
    clubName: "",
    idCard: "",
    erpReferenceNumber: "",
    courseId: "",
    academicYearId: "",
    courseName: "",
    courseLevel: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = () => {
    let isValid = true;
    if (currentStep === 1) {
      if (!data.agree) {
        toast.error("Please agree to the terms and conditions");
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (
        !data.name ||
        !data.idNumber ||
        !data.email ||
        !data.branch ||
        !data.gender ||
        !data.countryCode ||
        !data.phoneNumber ||
        !data.year
      ) {
        toast.error("Please fill all the fields");
        isValid = false;
      }
    } else if (currentStep === 4) {
      if (
        !data.country ||
        !data.pinCode ||
        !data.residency
      ) {
        toast.error("Please fill all the fields");
        isValid = false;
      }
      if (data.country === "India") {
        if (!data.state || !data.district) {
          toast.error("Please fill all the fields");
          isValid = false;
        }
      }
      if (data.residency === "Hosteler" && !data.hostelName) {
        toast.error("Please fill all the fields");
        isValid = false;
      }

      if (data.residency === "Day Scholar" && !data.busRoute) {
        toast.error("Please fill all the fields");
        isValid = false;
      }
    } else if (currentStep === 5) {
      if (
        !data.clubId ||
        !data.courseId ||
        !data.courseName ||
        !data.courseLevel ||
        !data.domain ||
        !data.clubName ||
        !data.idCard ||
        !data.erpReferenceNumber
      ) {
        toast.error("Please fill all the fields");
        isValid = false;
      }
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    console.log(data);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="ClubRegistrationComponent">
      <div className="ClubRegistrationComponent-in">
        <div className="ClubRegistration-Navbar">
          <Navbar />
        </div>

        <div className="clubRegistration-one">
          <div className="clubRegistration-in">
            <div className="cr-one">
              <div className="cr-one-in">
                <div className="horizontal-timeline">
                  {steps.map((step, index) => {
                    const isCompleted = index + 1 <= currentStep;  
                    const isActive = index + 1 === currentStep;  

                    return (
                      <div
                        key={index}
                        className={`timeline-step ${
                          isCompleted ? "completed" : ""
                        } ${isActive ? "active" : ""}`}
                      >
                        <div className="step-label">{step.label}</div>
                        <div className="step-circle"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="cr-two">
              <div className="cr-two-in">
                <div className="cr-two-one">
                  {currentStep === 1 && <Rules data={data} setData={setData} />}
                  {currentStep === 2 && <CourseDetails />}
                  {currentStep === 3 && (
                    <StudentInfo data={data} setData={setData} />
                  )}
                  {currentStep === 4 && <Address data={data} setData={setData} />}
                  {currentStep === 5 && <ClubData data={data} setData={setData} />}
                </div>
                <div className="cr-two-two">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className={currentStep === 1 ? "cr-two-two-disabled" : ""}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </button>
                  {currentStep !== 5 ? (
                    <button onClick={handleNext}>Next</button>
                  ) : (
                    <button onClick={handleSubmit} className="cr-two-two-submit">
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ClubRegistration-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
