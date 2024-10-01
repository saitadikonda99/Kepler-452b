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
      link: "/admin/dashboard",
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
      icon: <GrUpdate className="sideBar-icon" />,
      link: "",
      subOptions: [
        { name: "Update Lead", link: "/admin/update/clubUpdate/lead" },
        { name: "Update Details", link: "/admin/update/clubUpdate/details" },
      ],
    },
    {
      name: "view Clubs",
      icon: <IoMdHome className="sideBar-icon" />,
      link: "/admin/viewClubs",
    },
    {
      name: "add admin",
      icon: <IoMdHome className="sideBar-icon" />,
      link: "/admin/addAdmin",
    },
    {
      name: "Change Password",
      icon: <IoMdHome className="sideBar-icon" />,
      link: "/admin/changePassword",
    },
    {
      name: "Manage Users",
      icon: <IoMdHome className="sideBar-icon" />,
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
