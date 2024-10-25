"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import "./page.css";

// import icons here
import { MdEventAvailable } from "react-icons/md"; 
import { ImNewspaper } from "react-icons/im";  
import { HiUserGroup } from "react-icons/hi";   
import { FaUsersViewfinder } from "react-icons/fa6";
import { BsPersonFillAdd } from "react-icons/bs";  
// import { CiViewList } from "react-icons/ci";   
import { IoMdHome } from "react-icons/io";  
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlinePublishedWithChanges } from "react-icons/md"; 
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
      link: "/admin/home",
    },
    {
      name: "Events",
      icon: <MdEventAvailable className="sideBar-icon" />,
      link: "/admin/events",
    },
    {
      name: "News",
      icon: <ImNewspaper className="sideBar-icon" />,
      link: "",
      subOptions: [
        { name: "Portrait", link: "/admin/news/portrait" },
        { name: "Landscape", link: "/admin/news/landscape" },
      ],
    },
    {
      name: "Add Club",
      icon: <HiUserGroup className="sideBar-icon" />,
      link: "/admin/addClub",
    },
    {
      name: "Update Club",
      icon: <MdOutlinePublishedWithChanges className="sideBar-icon" />,
      link: "",
      subOptions: [
        { name: "Update Lead", link: "/admin/clubUpdate/lead" }
      ],
    },
    {
      name: "View Clubs",
      icon: <FaUsersViewfinder className="sideBar-icon" />,
      link: "/admin/viewClubs",
    },
    {
      name: "Add Admin",
      icon:<BsPersonFillAdd className="sideBar-icon"/>,
      link: "/admin/addAdmin",
    },
    {
      name: "Change Password",
      icon: <MdOutlineChangeCircle className="sideBar-icon" />,
      link: "/admin/changePassword",
    },
    {
      name: "Manage Users",
      icon: <MdOutlineManageAccounts className="sideBar-icon" />,
      link: "/admin/manageUsers",
    },
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
