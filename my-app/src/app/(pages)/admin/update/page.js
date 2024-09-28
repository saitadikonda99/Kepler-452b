"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const [clubData, setClubData] = useState([]);
  const [show, setShow] = useState(false); 

  const [updateData, setUpdateData] = useState({
    leadUsername: null,
    clubId: null,
    leadName: "",
    leadEmail: "",
    clubName: "",
    clubLogo: "",
    clubDes: "",
  });

  const handleClick = (clubId) => {

    const selectedClub = clubData.find((club) => club.club_id === clubId);

    setUpdateData({
      leadUsername: selectedClub.lead_username,  
      clubId: selectedClub.club_id,
      leadName: selectedClub.lead_name,
      leadEmail: selectedClub.lead_email,
      clubName: selectedClub.club_name,
      clubLogo: selectedClub.club_logo,
      clubDes: selectedClub.club_description,
    });

    setShow(true);
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
      const response = await axios.post(
        "/api/admin/updateClub",
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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
                  <input
                    type="text"
                    placeholder="Club description"
                    value={updateData.clubDes}
                    name="clubDes"
                    onChange={handleChange}
                  />
                </div>
                <div className="updateComponent-in-four">
                  <input
                    type="text"
                    placeholder="Lead name"
                    value={updateData.leadName}
                    name="leadName"
                    onChange={handleChange}
                  />
                </div>
                <div className="updateComponent-in-five">
                  <input
                    type="text"
                    placeholder="Lead email"
                    value={updateData.leadEmail}
                    name="leadEmail"
                    onChange={handleChange}
                  />
                </div>
                <div className="updateComponent-in-six">
                  <button onClick={handleSubmit}>Update</button>
                </div>
              </div>
            </div>
          </div>
        ) : (

          Array.isArray(clubData) && clubData.length > 0 ? (
            clubData.map((club) => (
              <div key={club.id}>
                <h2>Name :{club.club_name}</h2>
                <img src={club.club_logo} alt={club.club_name} />
                <p>Lead Name: {club.lead_name}</p>
                <p>Lead Id: {club.lead_username}</p>
                <p>Des: {club.club_description}</p>
                <p>leadEmail: {club.lead_email}</p>
                <p>Uploaded at: {new Date(club.uploadAt).toLocaleString()}</p>
                <button onClick={() => handleClick(club.club_id)}>Update</button>
              </div>
            ))
          ) : (
            <p>No clubs available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
