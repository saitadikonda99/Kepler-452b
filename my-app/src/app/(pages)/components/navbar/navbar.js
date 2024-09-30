"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { MdOutlineLogout } from "react-icons/md";
import { usePathname } from 'next/navigation'

import "./page.css";

const navbar = () => {

    const pathname = usePathname()

    const [userDetails, setUserDetails] = useState({
        username: "",
        name: "",
        role: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserDetails({
            username: user.username,
            name: user.name,
            role: user.role,
        });
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
                <h1>Student Activity Center - Admin Panel</h1>
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
                <button> Logout <MdOutlineLogout/> </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default navbar;
