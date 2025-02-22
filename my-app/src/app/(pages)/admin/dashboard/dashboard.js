import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

// imports start here
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/page'

import './page.css'

const Dashboard = ({ children }) => {

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
    <div className="DashboardComponent">
      <div className="DashboardComponent-in">
        <div className="DashboardComponent-Nav">
          <Navbar userDetails={userDetails}/>
        </div>
        <div className="DashboardComponent-one">
          <div className="DashboardComponent-one-in">
            <div className="DC-sideBar">
                <Sidebar />
            </div>
            <div className="DC-one">
              {children}
            </div>
          </div>
        </div>
        <div className="DashboardComponent-Footer">
          <div className="DashboardComponent-Footer-in">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
