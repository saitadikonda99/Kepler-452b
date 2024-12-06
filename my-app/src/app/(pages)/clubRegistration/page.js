"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../sil/Navbar";
import Footer from "../components/footer/page";

import Loader from '../../animation/Loading';


import "./page.css";

import Rules from "./components/rules/rules.js";
import CourseDetails from "./components/courseDetails/courseDetails.js";
import UnderTaking from "./components/underTaking/underTaking.js";
import StudentInfo from "./components/studentInfo/studentInfo.js";
import Address from "./components/address/address.js";
import ClubData from "./components/clubData/clubData.js";

const steps = [
  { label: "Program Details", component: CourseDetails },
  { label: "Rules", component: Rules },
  { label: "Under Taking", component: UnderTaking },
  { label: "Club Details", component: ClubData },
  { label: "Student Info", component: StudentInfo },
  { label: "Address & Residency", component: Address },
];

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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

  const validateStep = () => {
    let isValid = true;
    if (currentStep === 3) {
      if (!data.agree) {
        toast.error("Please click on the checkbox to move forward");
        isValid = false;
      }
    } else if (currentStep === 5) {
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
    } else if (currentStep === 6) {
      if (!data.country || !data.pinCode || !data.residency) {
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
    } else if (currentStep === 4) {
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

  useEffect(() => {
    const fetchRegistrationData = async () => {
      const response = await axios.get("/api/admin/manageRegistration");

      if (response.status === 200) {
        console.log(response.data);
        if (response.data.length === 0) {
          setRegistration(true);
        }

        const academicYearId = response.data[0]?.academic_year_id;
        setData({
          ...data,
          academicYearId: academicYearId,
        });
      }
    };

    fetchRegistrationData();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const maxSizeInBytes = 2 * 1024 * 1024;  
      if (data.idCard.size > maxSizeInBytes) {
        toast.error("File size exceeds the limit of 2MB");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "idCard") {
  +         formData.append(key, data[key], data[key].name);
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await axios.post("/api/clubRegistration", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoading(false);
        console.log(response);
        setRegistrationStatus(true);
        toast.success("Registration Successful");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  if (registration) {
    return (
      <div className="RegistrationClosed">
        <div className="RegistrationClosed-in">
          <h1>Registration are currently closed</h1>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="ClubRegistrationComponent">
      <div className="ClubRegistrationComponent-in">
        <div className="ClubRegistration-Navbar">
          <Navbar />
        </div>

        {registrationStatus ? (
          <div className="RegistrationSuccess">
            <div className="RegistrationSuccess-in">
              <h1>Registration Successful</h1>
              <p>
                Your registration has been successful. Please check your email
                for further details.
              </p>
            </div>
          </div>
        ) : (
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
                    {currentStep === 1 && (
                      <CourseDetails />
                    )}
                    {currentStep === 2 && 
                    (  <Rules />)
                    }
                    {currentStep === 3 && (
                      <UnderTaking data={data} setData={setData} />
                    )}
                    {currentStep === 4 && (
                      <ClubData data={data} setData={setData} />
                    )}
                    {currentStep === 5 && (
                    <StudentInfo data={data} setData={setData} />
                  )}
                    {currentStep === 6 && (
                      <Address data={data} setData={setData} />
                    )}
                  </div>
                  <div className="cr-two-two">
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className={currentStep === 1 ? "cr-two-two-disabled" : ""}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </button>
                    {currentStep !== 6 ? (
                      <button onClick={handleNext}>Next</button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="cr-two-two-submit"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="ClubRegistration-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
