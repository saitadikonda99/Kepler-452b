"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { MdOutlineLogout } from "react-icons/md";
import { usePathname } from 'next/navigation'
import Logout from '../../../../lib/logout'


import "./page.css";

const navbar = ({ userDetails}) => {

    const pathname = usePathname()

    const handleLogout = Logout();
    
  return (
    <div className="AdminNavComponent">
      <div className="AdminNavComponent-in">
        <div className="AdminNavComponent-one">
          <div className="AdminNavComponent-one-in">
            {/* AN -> AdminNav */}
            <div className="AN-one">
              <img
                src="https://i.imghippo.com/files/Jgak4143wH.png"
                alt=""
               />
            </div>
            <div className="AN-two">
              <div className="AN-two-in">
                <h1>Student Activity Center - {userDetails.role} Portal</h1>
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
