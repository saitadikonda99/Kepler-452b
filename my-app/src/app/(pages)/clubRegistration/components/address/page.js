import React from "react";

import { boyHostels, girlHostels, busRoutes } from "../../residencyData/data";
import { countryNames } from "../../countryData/data";
import { districtNames } from "../../districtData/data";

import "./page.css";

const page = ({ data, setData }) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="AddressComponent">
      <div className="AddressComponent-in">
        <div className="Address-one">
          <h1>Address</h1>
          <p>
            Please provide the following information to help us verify your
            address.
          </p>
        </div>
        <div className="Address-two">
          <div className="Address-two-one crSelect">
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

          {data?.residency === "Hosteler" && data?.gender === "Female" && (
            <div className="Address-two-two crSelect">
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
            <div className="Address-two-two crSelect">
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

          {data?.residency === "Day Scholar" && (
            <div className="Address-two-three crSelect">
              <select
                name="busRoute"
                value={data.busRoute}
                onChange={handleChange}
                id="selectInput"
              >
                <option value=" ">Select Bus Route / Own transport</option>
                <option value="Own Transport">Own Transport</option>
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
        <div className="Address-three">
          <div className="Address-three-one crSelect">
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
            <div className="Address-three-two crSelect">
              <div className="Address-three-two-one">
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

              <div className="Address-three-two crSelect">
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

          <div className="Address-three-three crInput">
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
    </div>
  );
};

export default page;
