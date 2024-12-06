import React from "react";

import { branchNames } from "../../branchData/data";
import { countryCodes, countryNames } from "../../countryData/data";

import "./page.css";

const page = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "idNumber") {
      setData({
        ...data,
        [name]: value,
        email: value + "@kluniversity.in",
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  return (
    <div className="StudentInfoComponent">
      <div className="StudentInfoComponent-in">
        <div className="cr-si-one">
          <h1>Student Information</h1>
          <p>
            Let's start by collecting some basic information about you and fill the details as per your University Records.
          </p>
        </div>

        <div className="cr-si-two">
          <div className="cr-si-two-one crInput">
            <input
              type="text"
              placeholder="Enter your Name as per University Records"
              value={data.name}
              name="name"
              className="registrationInput"
              onChange={handleChange}
            />
          </div>

          <div className="cr-si-two-two crInput">
            <input
              type="text"
              placeholder="Enter your University Id Number"
              value={data.idNumber}
              name="idNumber"
              className="registrationInput"
              onChange={handleChange}
            />
          </div>

          <div className="cr-si-two-three crInput">
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
        <div className="cr-si-three">
          <div className="cr-si-three-one crSelect">
            <select
              name="branch"
              value={data.branch}
              onChange={handleChange}
              id="selectInput"
            >
              <option value="">Select your branch</option>
              {branchNames.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="cr-si-three-two crSelect">
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

          <div className="cr-si-three-three crSelect">
            <select
              name="year"
              value={data.year}
              onChange={handleChange}
              id="selectInput"
            >
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className="cr-si-four">
          <div className="cr-si-four-one crSelect">
            <select
              name="countryCode"
              value={data.countryCode}
              onChange={handleChange}
              id="selectInput"
            >
              <option value="">Country code</option>
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

          <div className="cr-si-four-two crInput">
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
  );
};

export default page;
