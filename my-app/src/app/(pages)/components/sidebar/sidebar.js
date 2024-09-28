import React from 'react'
import Link from 'next/link'
import './page.css'

// import icons here
import { IoMdHome } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import { GrUpdate } from "react-icons/gr";

const sidebar = () => {

    const sidebarOptions = [
        {
            name: 'Home',
            icon: <IoMdHome className='sideBar-icon' />,
            link: ''
        },
        {
            name: 'Events',
            icon: <MdEventAvailable className='sideBar-icon' />,
            link: 'events'
        },
        {
            name: 'News',
            icon: <ImNewspaper className='sideBar-icon' />,
            link: 'news'
        },
        {
            name: 'Add Club',
            icon: <HiUserGroup className='sideBar-icon' />,
            link: 'addClub'
        },
        {
            name: 'Update Club',
            icon: <GrUpdate className='sideBar-icon' />,
            link: 'update'
        },
        {
            name: 'view Club',
            icon: <IoMdHome className='sideBar-icon' />,
            link: ''
        }
    ]

  return (
        <div className="SidebarComponent">
            <div className="SidebarComponent-in">
                <div className="SidebarComponent-in-in">
                    {sidebarOptions.map((option) => (
                        <div className="Sidebar-box">
                        <div className="Sidebar-box-in">
                            {option.icon}
                            <Link href={option.link}>{option.name}</Link>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default sidebar