"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import "./page.css";

// import icons here
import { IoMdHome } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineChangeCircle } from "react-icons/md";

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
        { name: "Image", link: "/lead/images" },
        { name: "Glimpse", link: "/lead/glimpse" },
        { name: "Upcoming Events", link: "/lead/upcomingEvents" },
        { name: "Activities", link: "/lead/activities" },
        { name: "Socials", link: "/lead/socials" },
      ],
    },
    {
      name: "Change Password",
      icon: <ImNewspaper className="sideBar-icon" />,
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
                    <div className="Sidebar-box-in" key={subIndex} onClick={handleNav(subOption.link)}>
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
