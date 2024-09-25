"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

const page = () => {
  const [clubData, setClubData] = useState([]);
  const [show, setShow] = useState(false);
  const [updateData, setUpdateData] = useState({
    clubId: null,
    clubName: "",
    clubLogo: "",
    clubDes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  }

  const handleClick = (clubId) => {
    setShow(!show);
    setUpdateData((prevData) => ({
      ...prevData,
      clubId: clubId, 
    }));
  };

  const handleSubmit = async () => {

    try {
      const response = await axios.post("/api/clubUpdate", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Update successful");
      }
      else {
        toast.success("Internal server error");
      }

    } catch (error) {
        toast.error("Internal server error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clubs", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setClubData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="LeadComponent">
      <div className="LeadComponent-in">
        {Array.isArray(clubData) && clubData.length > 0 ? (
          clubData.map((club) => (
            <div key={club.id}>
              <h2>{club.club_name}</h2>
              <img src={club.club_logo} alt={club.club_name} />
              <p>{club.club_description}</p>
              <p>Uploaded at: {new Date(club.uploadAt).toLocaleString()}</p>
              <button onClick={() => handleClick(club?.club_id)}>Update</button>
            </div>
          ))
        ) : (
            <p>No clubs available.</p>
        )}
        

        {show ? (
          <div className="UpdateComponent">
            <div className="UpdateComponent-in">
              <input 
                type="text"
                value={updateData.clubName}
                placeholder="name of the club"
                name='clubName'
                onChange={handleChange}
             />
              <input 
                type="text" 
                placeholder="club logo link" 
                value={updateData.clubLogo}
                name='clubLogo'
                onChange={handleChange}
            />
              <input 
                type="text" 
                placeholder="club des"
                name='clubDes'
                value={updateData.clubDes}
                onChange={handleChange}
             />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default page;
