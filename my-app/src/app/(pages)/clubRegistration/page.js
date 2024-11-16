"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../sil/Navbar";
import Footer from "../../Components/Footer/page";

import "./page.css";

// import data files here
import { boyHostels, girlHostels, busRoutes } from "./residencyData/data";
import { countryCodes, countryNames } from "./countryData/data";
import { districtNames } from "./districtData/data";

const page = () => {
    
  const [clubData, setClubData] = React.useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/api/getClubs", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log(response);

        if (response.status === 200) {
          setClubData(response.data);
        } else {
          toast.error("Failed to fetch stats");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    };

    fetch();
  }, []);

  const techClubs = clubData.filter(
    (club) => club.club_domain === "TEC" && club.active === 1
  );
  const lchClubs = clubData.filter(
    (club) => club.club_domain === "LCH" && club.active === 1
  );
  const esoClubs = clubData.filter(
    (club) => club.club_domain === "ESO" && club.active === 1
  );
  const hieClubs = clubData.filter(
    (club) => club.club_domain === "IIE" && club.active === 1
  );
  const hwbClubs = clubData.filter(
    (club) => club.club_domain === "HWB" && club.active === 1
  );

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/clubRegistration", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log(response);
        toast.success("Registration Successful");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const [data, setData] = useState({
    name: "",
    idNumber: "",
    email: "",
    gender: "",
    countryCode: "",
    phoneNumber: "",
    residency: "",
    hostelName: "",
    busRoute: "",
    country: "",
    state: "",
    district: "",
    pinCode: "",
    domain: "",
    clubName: "",
    idCardLink: "",
    erpPaymentLink: "",
  });

  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="ClubRegistrationComponent">
      <div className="ClubRegistrationComponent-in">
        <div className="ClubRegistration-Nav">
          <Navbar />
        </div>
        <div className="ClubRegistration-one">
          <div className="ClubRegistration-one-in">
            <div className="cr-one">
              <h1>Club Registration</h1>
            </div>
            <div className="cr-two">
              <div className="cr-two-in">
                <div className="cr-two-in-one crInput">
                  <input
                    type="text"
                    placeholder="Enter your Name as per University Records"
                    value={data.name}
                    name="name"
                    className="registrationInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="cr-two-in-two crInput">
                  <input
                    type="text"
                    placeholder="Enter your University Id Number"
                    value={data.idNumber}
                    name="idNumber"
                    className="registrationInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="cr-two-in-three crInput">
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    value={data.email}
                    name="email"
                    className="registrationInput"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="cr-three">
              <div className="cr-three-in">
                <div className="cr-three-in-one crSelect">
                  <select
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                    id="selectInput"
                  >
                    <option value=" ">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="cr-three-in-two crSelect">
                  <div className="cr-three-in-two-one">
                    <select
                      name="countryCode"
                      value={data.countryCode}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      {countryCodes.map((country, index) => (
                        <option
                          key={`${country.code}-${index}`}
                          value={country.dial_code}
                        >
                          {country.dial_code} ({country.name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="cr-three-in-two-two crInput">
                    <input
                      type="text"
                      placeholder="Enter your Phone Number"
                      value={data.phoneNumber}
                      name="phoneNumber"
                      className="registrationInput"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="cr-four">
              <div className="cr-four-in">
                <div className="cr-four-in-one crSelect">
                  <select
                    name="residency"
                    value={data.residency}
                    onChange={handleChange}
                    id="selectInput"
                  >
                    <option value=" ">Residency</option>
                    <option value="Day Scholar">Day Scholar</option>
                    <option value="Hosteler">Hosteler</option>
                  </select>
                </div>

                {data?.residency === "Hosteler" &&
                  data?.gender === "Female" && (
                    <div className="cr-four-in-two crSelect">
                      <select
                        name="hostelName"
                        value={data.hostelName}
                        onChange={handleChange}
                        id="selectInput"
                      >
                        <option value=" ">Select Hostel Name</option>
                        {girlHostels.map((hostel) => (
                          <option key={hostel.hostelName} value={hostel.hostelName}>
                            {hostel.hostelName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                {data?.residency === "Hosteler" && data?.gender === "Male" && (
                  <div className="cr-four-in-two crSelect">
                    <select
                      name="hostelName"
                      value={data.hostelName}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value=" ">Select Hostel Name</option>
                      {boyHostels.map((hostel) => (
                        <option key={hostel.hostelName} value={hostel.hostelName}>
                          {hostel.hostelName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {data?.residency === "dayScholar" && (
                  <div className="cr-four-in-three crSelect">
                    <select
                      name="busRoute"
                      value={data.busRoute}
                      onChange={handleChange}
                      id="selectInput"
                    >
                      <option value=" ">
                        Select Bus Route / Own transport
                      </option>
                      {busRoutes.map((route) => (
                        <option
                          key={route.id}
                          value={route.Location + "-" + route.Route}
                        >
                          {route.Location + "-" + route.Route}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="cr-five">
              <div className="cr-five-in">
                <div className="cr-five-in-one crSelect">
                  <select
                    name="country"
                    value={data.country}
                    onChange={handleChange}
                    id="selectInput"
                  >
                    <option value=" ">Select your country</option>
                    {countryNames.map((country, index) => (
                      <option key={`${country}-${index}`} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {data?.country === "India" ? (
                  <div className="cr-five-in-two crSelect">
                    <div className="cr-five-in-two-one">
                      <select
                        name="state"
                        value={data.state}
                        onChange={handleChange}
                        id="selectInput"
                      >
                        <option value=" ">Select your state</option>
                        {Object.keys(districtNames).map((state, index) => (
                          <option key={`${state}-${index}`} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="cr-five-in-two-two crSelect">
                      <select
                        name="district"
                        value={data.district}
                        onChange={handleChange}
                        id="selectInput"
                      >
                        <option value=" ">Select your district</option>
                        {districtNames[data.state]?.map((district, index) => (
                          <option key={`${district}-${index}`} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}

                <div className="cr-five-in-three crInput">
                  <input
                    type="text"
                    placeholder="Enter your Pin Code"
                    value={data.pinCode}
                    name="pinCode"
                    className="registrationInput"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="cr-six">
              <div className="cr-six-in">
                <div className="cr-six-in-one crSelect">
                  <select
                    name="domain"
                    value={data.domain}
                    onChange={handleChange}
                    id="selectInput"
                  >
                    <option value=" ">Select your domain</option>
                    <option value="TEC">Technology</option>
                    <option value="LCH">Literature and Cultural</option>
                    <option value="ESO">Environment and Social</option>
                    <option value="IIE">
                      Innovation, Incubation and Entrepreneurship
                    </option>
                    <option value="HWB">Health and Wellbeing</option>
                  </select>
                </div>

                <div className="cr-six-in-two crSelect">
                  <select
                    name="clubName"
                    value={data.clubName}
                    onChange={handleChange}
                    id="selectInput"
                  >
                    <option value=" ">Select your club</option>
                    {data.domain === "TEC" &&
                      techClubs.map((club) => (
                        <option key={club.club_id} value={club.club_name}>
                          {club.club_name}
                        </option>
                      ))}
                    {data.domain === "LCH" &&
                      lchClubs.map((club) => (
                        <option key={club.club_id} value={club.club_name}>
                          {club.club_name}
                        </option>
                      ))}
                    {data.domain === "ESO" &&
                      esoClubs.map((club) => (
                        <option key={club.club_id} value={club.club_name}>
                          {club.club_name}
                        </option>
                      ))}
                    {data.domain === "IIE" &&
                      hieClubs.map((club) => (
                        <option key={club.club_id} value={club.club_name}>
                          {club.club_name}
                        </option>
                      ))}
                    {data.domain === "HWB" &&
                      hwbClubs.map((club) => (
                        <option key={club.club_id} value={club.club_name}>
                          {club.club_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="cr-seven">
              <div className="cr-seven-in">
                <div className="cr-seven-in-one">
                  <div className="cr-seven-in-one-one crInput">
                    <input
                      type="text"
                      placeholder="Enter your Id Card Link"
                      value={data.idCardLink}
                      name="idCardLink"
                      className="registrationInput"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="cr-seven-in-one-two crInput">
                    <input
                      type="text"
                      placeholder="Enter your ERP Payment Link"
                      value={data.erpPaymentLink}
                      name="erpPaymentLink"
                      className="registrationInput"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="cr-seven-in-two">
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ClubRegistration-footer">{/* <Footer /> */}</div>
      </div>
    </div>
  );
};

export default page;
