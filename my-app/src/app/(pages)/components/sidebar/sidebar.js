"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import "./page.css";
import Link from "next/link";

// import icons here
import { MdEventAvailable } from "react-icons/md"; 
import { ImNewspaper } from "react-icons/im";  
import { MdGroups } from "react-icons/md";   
import { HiUserGroup } from "react-icons/hi";
import { MdPersonAdd } from "react-icons/md";  
import { IoMdHome } from "react-icons/io";  
import { MdManageAccounts } from "react-icons/md";
import { MdUpdate } from "react-icons/md"; 
import { RiLockPasswordFill } from "react-icons/ri";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoPhoneLandscapeOutline } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { MdFactCheck } from "react-icons/md";
import { MdApproval } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { MdPersonSearch } from "react-icons/md";
import { MdGroups3 } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { MdSchool } from "react-icons/md";

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
        { name: "Portrait", icon: <IoPhonePortraitOutline className="sideBar-icon" />, link: "/admin/news/portrait" },
        { name: "Landscape", icon: <IoPhoneLandscapeOutline className="sideBar-icon" />, link: "/admin/news/landscape" },
      ],
    },
    {
      name: "Team",
      icon: <MdGroups className="sideBar-icon" />,
      link: "/admin/team",
    },
    {
      name: "Add Club",
      icon: <MdGroups className="sideBar-icon" />,
      link: "/admin/addClub",
    },
    {
      name: "Update Club",
      icon: <MdUpdate className="sideBar-icon" />,
      link: "",
      subOptions: [
        { name: "Update Lead", icon: <MdSupervisorAccount className="sideBar-icon" />, link: "/admin/clubUpdate/lead" }
      ],
    },
    {
      name: "View Clubs",
      icon: <HiUserGroup className="sideBar-icon" />,
      link: "/admin/viewClubs",
    },
    {
      name: "Add Admin",
      icon: <MdPersonAdd className="sideBar-icon"/>,
      link: "/admin/addAdmin",
    },
    {
      name: "Add Students",
      icon: <MdPersonAdd className="sideBar-icon" />,
      link: "/admin/Members/addMembers",
    },
    {
      name: "Manage Sessions",
      icon: <MdManageAccounts className="sideBar-icon" />,
      link: "",
      subOptions: [
        { name: "Add Session", icon: <MdLibraryAdd className="sideBar-icon" />, link: "/admin/manageSessions/addSession" },
        { name: "Update Session", icon: <MdOutlineUpdate className="sideBar-icon" />, link: "/admin/manageSessions/updateSession" },
        { name: "Take Attendance", icon: <MdFactCheck className="sideBar-icon" />, link: "/admin/manageSessions/takeAttendance" },
        { name: "Approve Sessions", icon: <MdApproval className="sideBar-icon" />, link: "/admin/manageSessions/approveSessions" }
      ],
    },
    {
      name: "Manage Users",
      icon: <MdManageAccounts className="sideBar-icon" />,
      link: "/admin/manageUsers",
    },
    {
      name: "Manage Registration",
      icon: <MdManageAccounts className="sideBar-icon" />,
      link: "/admin/manageRegistration",
    },
    {
      name: "Manage Courses",
      icon: <MdSchool className="sideBar-icon" />,
      link: "",
      subOptions: [
        { name: "Add Course", icon: <MdLibraryAdd className="sideBar-icon" />, link: "/admin/addCourse" },
        { name: "Update Course", icon: <MdOutlineUpdate className="sideBar-icon" />, link: "/admin/updateCourse" },
      ],
    },
    {
      name: "Manage Students",
      icon: <MdManageAccounts className="sideBar-icon" />,
      link: "",
      subOptions: [
        { name: "Verify Payment", icon: <MdPayment className="sideBar-icon" />, link: "/admin/manageStudents/verifyPayment" },
        { name: "Student Profile", icon: <MdPersonSearch className="sideBar-icon" />, link: "/admin/manageStudents/studentProfile" },
        { name: "Clubs Data", icon: <MdGroups3 className="sideBar-icon" />, link: "/admin/manageStudents/SortData" },
        { name: "Download Data", icon: <MdDownload className="sideBar-icon" />, link: "/admin/manageStudents/download" },
      ],
    },
    {
      name: "Change Password",
      icon: <RiLockPasswordFill className="sideBar-icon" />,
      link: "/admin/changePassword",
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
