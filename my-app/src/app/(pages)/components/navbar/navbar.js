"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { MdOutlineLogout } from "react-icons/md";
import { usePathname } from 'next/navigation'
import Logout from '../../../../lib/logout'
import { toast } from "react-hot-toast";
import axios from "axios";


import "./page.css";

const navbar = ({ role }) => {

    const pathname = usePathname()

    const handleLogout = Logout();

    const [userDetails, setUserDetails] = useState({
        username: "",
        name: "",
        role: "",
    });

    useEffect(() => {

      const fetch = async () => {

        try {
            const response = await axios.get("/api/user", {
                headers: {
                    "Content-Type": "application/json", 
                },
                withCredentials: true,
            });

            if (response.status == 200) {
                setUserDetails({
                    username: response.data[0].username,
                    name: response.data[0].name,
                    role: response.data[0].role,
                });
            }
            else {
                toast.error("Failed to fetch user details");
            }

        } catch (error) {
          toast.error("Failed to fetch user details");
        }
      }

        fetch();

    }, []);

  return (
    <div className="AdminNavComponent">
      <div className="AdminNavComponent-in">
        <div className="AdminNavComponent-one">
          <div className="AdminNavComponent-one-in">
            {/* AN -> AdminNav */}
            <div className="AN-one">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/HeroVideo%2FOfficialSacLogo.png?alt=media&token=8a73bd93-832c-4d5d-819d-0e371d12b01c"
                alt=""
               />
            </div>
            <div className="AN-two">
              <div className="AN-two-in">
                <h1>Student Activity Center - {role} Panel</h1>
              </div>
            </div>
            <div className="AN-three">
                <div className="An-three-in">
                    <img src="https://as2.ftcdn.net/v2/jpg/03/55/72/07/1000_F_355720743_3GQv9QBh9uyBVGO25npy9iYODrTBa3wU.jpg" alt="" />
                    <p>{userDetails.username}</p>
                </div>
            </div>
          </div>
        </div>
        <div className="AdminNavComponent-two">
            <div className="AdminNavComponent-two-in">
                <p>{pathname}</p>
                <button onClick={handleLogout} > Logout <MdOutlineLogout/> </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default navbar;
