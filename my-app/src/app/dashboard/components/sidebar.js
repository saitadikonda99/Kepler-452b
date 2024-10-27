import React from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import "./sidebar.css";

import { MdSpaceDashboard } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa6";
import { GoCodeOfConduct } from "react-icons/go";
import { MdDraw } from "react-icons/md";
import { GrGrow } from "react-icons/gr";
import { SiKnowledgebase } from "react-icons/si";

const sidebar = () => {

    const pathname = usePathname()

  return (
    <div className="AnalyticsComponent-sidebar">
      <div className="AnalyticsComponent-sidebar-in">
        <div className="AnalyticsComponent-sidebar-in-one">
          <div className="Analytics-one">
            <div className="Analytics-one-in">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/HeroVideo%2FOfficialSacLogo.png?alt=media&token=8a73bd93-832c-4d5d-819d-0e371d12b01c"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="AnalyticsComponent-sidebar-in-two">
          <div className="Analytics-two Analytics-nav">
            <div className="Analytics-two-in Analytics-nav-in">
              <MdSpaceDashboard className="analytics-icon"/>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>
          <div className="Analytics-three Analytics-nav">
            <div className="Analytics-three-in Analytics-nav-in">
                <FaLaptopCode className="analytics-icon"/>
              <Link href="/dashboard/TEC">TEC</Link>
            </div>
          </div>
          <div className="Analytics-four Analytics-nav">
            <div className="Analytics-four-in Analytics-nav-in">
                <MdDraw className="analytics-icon"/>
              <Link href="/dashboard/LCH">LCH</Link>
            </div>
          </div>
          <div className="Analytics-five Analytics-nav">
            <div className="Analytics-five-in Analytics-nav-in">
                <GrGrow className="analytics-icon"/>
              <Link href="/dashboard/ESO">ESO</Link>
            </div>
          </div>
          <div className="Analytics-six Analytics-nav">
            <div className="Analytics-six-in Analytics-nav-in">
                <SiKnowledgebase className="analytics-icon"/>
              <Link href="/dashboard/IIE">IIE</Link>
            </div>
          </div>
          <div className="Analytics-seven Analytics-nav">
            <div className="Analytics-seven-in Analytics-nav-in">
                <GoCodeOfConduct className="analytics-icon"/>
              <Link href="/dashboard/HWB">HWB</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sidebar;
