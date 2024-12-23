"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import "./page.css";

// import icons here
import { IoMdHome } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { BiCalendarEvent } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";

const sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(null);

  const router = useRouter() 

  const toggleSubMenu = (option) => {
    return () => {
      if (openSubMenu !== null) {
        setIsOpen(null);
        setOpenSubMenu(null);
      } else {
        setIsOpen(option.name);
        setOpenSubMenu(option.name);
      }
    };
  };

  const handleNav = (link) => {
    return () => {
      if (link) {
        void router.push(link);
      }
    };
  };

  const sidebarOptions = [
    {
      name: "Home",
      icon: <IoMdHome className="sideBar-icon" />,
      link: "/student/home",
    },
    {
      name: "My Club",
      icon: <MdGroups className="sideBar-icon" />,
      link: "/student/myClub",
    },
    {
      name: "My Sessions",
      icon: <BiCalendarEvent className="sideBar-icon" />,
      link: "/student/mySessions",
    },
    {
      name: "My Points",
      icon: <AiFillStar className="sideBar-icon" />,
      link: "/student/myPoints",
    },
    {
      name: "My Profile",
      icon: <CgProfile className="sideBar-icon" />,
      link: "/student/myProfile",
    },
    {
      name: "Change Password",
      icon: <RiLockPasswordFill className="sideBar-icon" />,
      link: "/student/changePassword",
    }
  ];

  return (
    <div className="SidebarComponent">
      <div className="SidebarComponent-in">
        <div className="SidebarComponent-in-in">
        {sidebarOptions.map((option, index) => (
            <div className="Sidebar-box" key={index} onClick={handleNav(option.link)}>
              <div className="Sidebar-box-in" onClick={toggleSubMenu(option)}>
                {option.icon}
                <p>{option.name}</p>
              </div>
              {/* {option.subOptions && openSubMenu === option.name && (
                <div className="Sidebar-box">
                  {option.subOptions.map((subOption, subIndex) => (
                    <div className="Sidebar-box-in subOption" key={subIndex} onClick={handleNav(subOption.link)}>
                      {subOption.icon}
                      <p>{subOption.name}</p>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default sidebar;
