"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "./page.css";

// import components here

import Navbar from "../../../../components/navbar/navbar";
import Sidebar from "../../../../components/sidebar/sidebar";
import Footer from "../../../../components/footer/page";

const Page = () => {
  const [clubData, setClubData] = useState([]);
  const [show, setShow] = useState(false);

  const [updateData, setUpdateData] = useState({
    id: null,
    clubId: null,
    clubDomain: "",
    clubName: "",
    clubLogo: "",
    clubDes: "",
  });

  const handleClick = (clubId) => {
    const selectedClub = clubData.find((club) => club.club_id === clubId);

    setUpdateData({
      id: selectedClub.id,
      clubId: selectedClub.club_id,
      clubDomain: selectedClub.club_domain,
      clubName: selectedClub.club_name,
      clubLogo: selectedClub.club_logo,
      clubDes: selectedClub.club_description,
    });

    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/admin/clubUpdate/details", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status === 200) {
        toast.success("Club updated successfully!");
        setShow(false);
        setClubData((prevData) =>
          prevData.map((club) =>
            club.id === updateData.clubId ? { ...club, ...updateData } : club
          )
        );
      } else {
        console.log(response);
        toast.error("Failed to update club");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating the club");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/allClubs", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setClubData(response.data);
      } else {
        toast.error("Internal server error");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="updateComponent">
      <div className="updateComponent-in">
        <div className="updateComponent-Nav">
          <Navbar />
        </div>
        <div className="updateComponent-one">
          <div className="updateComponent-one-in">
            <div className="UC-sideBar">
              <Sidebar />
            </div>
            <div className="UC-one">
              {show ? (
                <div className="updateForm">
                  <div className="updateComponent-one">
                    <h1>Update Club</h1>
                    <p>Please carefully enter the details</p>
                  </div>
                  <div className="updateComponent-two">
                    <div className="updateComponent-two-in">

                    <div className="updateComponent-in-one">
                        <input
                          type="text"
                          value={updateData.clubId}
                          placeholder="Enter the club id"
                          name="clubId"
                          onChange={handleChange}
                        />
                      </div>


                      <div className="updateComponent-in-one">
                        <input
                          type="text"
                          value={updateData.clubName}
                          placeholder="Name of the club"
                          name="clubName"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="updateComponent-in-two">
                        <input
                          type="text"
                          placeholder="Club logo link"
                          value={updateData.clubLogo}
                          name="clubLogo"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="updateComponent-in-three">
                        <select name="clubDomain" value={updateData.clubDomain} onChange={handleChange} >
                          <option value="">Select domain</option>
                          <option value="TEC">TEC</option>
                          <option value="LCH">LCH</option>
                          <option value="ESO">ESO</option>
                          <option value="IIE">IIE</option>
                          <option value="HWB">HWB</option>
                        </select>
                      </div>

                      <div className="updateComponent-in-four">
                        <input
                          type="text"
                          placeholder="Club description"
                          value={updateData.clubDes}
                          name="clubDes"
                          onChange={handleChange}
                        />
                      </div>
                    
                      <div className="updateComponent-in-seven">
                        <button onClick={handleSubmit}>Update</button>
                        <button onClick={handleClose}>cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : Array.isArray(clubData) && clubData.length > 0 ? (
                clubData.map((club) => (
                  <div key={club.id}>
                    <h2>Name :{club.club_name}</h2>
                    <p>Club id: {club.club_id}</p>
                    <img src={club.club_logo} alt={club.club_name} />
                    <p>Lead Name: {club.lead_name}</p>
                    <p>Lead Id: {club.lead_username}</p>
                    <p>Club Domain: {club.club_domain}</p>
                    <p>Des: {club.club_description}</p>
                    <p>leadEmail: {club.lead_email}</p>
                    <p>
                      Uploaded at: {new Date(club.uploadAt).toLocaleString()}
                    </p>
                    <button onClick={() => handleClick(club.club_id)}>
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <p>No clubs available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="updateComponent-Footer">
          <div className="updateComponent-Footer-in">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
