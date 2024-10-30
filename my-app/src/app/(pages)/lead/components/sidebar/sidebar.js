"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import "./page.css";

// import icons here
import { IoMdHome } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuNetwork } from "react-icons/lu";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { IoMdImages } from "react-icons/io";
import { MdOutlineChangeCircle } from "react-icons/md";
import { MdViewQuilt } from "react-icons/md";

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
      link: "/lead/home",
    },
    {
      name: "Update Club Details",
      icon: <MdOutlineChangeCircle className="sideBar-icon" />,
      link: "",
      subOptions: [
        { name: "Image", icon: <IoMdImages className="sideBar-icon" /> , link: "/lead/images" },
        { name: "Glimpse", icon: <MdViewQuilt className="sideBar-icon" /> , link: "/lead/glimpse" },
        { name: "Upcoming Events", icon: <BsCalendar2MinusFill className="sideBar-icon" /> , link: "/lead/upcomingEvents" },
        { name: "Activities", icon: <IoMdImages className="sideBar-icon" /> , link: "/lead/activities" },
        { name: "Socials", icon: <IoMdImages className="sideBar-icon" /> , link: "/lead/socials" },
      ],
    },
    {
      name: "Add Activities",
      icon: <BsCalendar2MinusFill className="sideBar-icon" />,
      link: "/lead/addActivities",
    },
    {
      name: "Add Projects",
      icon: <LuNetwork className="sideBar-icon" />,
      link: "/lead/addProjects",
    },
    {
      name: "Change Password",
      icon: <RiLockPasswordFill className="sideBar-icon" />,
      link: "/lead/changePassword",
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
              {option.subOptions && openSubMenu === option.name && (
                <div className="Sidebar-box">
                  {option.subOptions.map((subOption, subIndex) => (
                    <div className="Sidebar-box-in subOption" key={subIndex} onClick={handleNav(subOption.link)}>
                      {subOption.icon}
                      <p>{subOption.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default sidebar;
