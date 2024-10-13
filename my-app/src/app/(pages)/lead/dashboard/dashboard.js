import React from "react";

// imports start here
import Sidebar from '../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/page'

import './page.css'

const page = ({ children }) => {
  return (
    <div className="DashboardComponent">
      <div className="DashboardComponent-in">
        <div className="DashboardComponent-Nav">
          <Navbar role={"Club Lead"} />
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

export default page;
