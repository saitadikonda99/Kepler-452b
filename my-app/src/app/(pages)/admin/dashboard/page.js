import React from "react";
import Link from "next/link";


// imports start here
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/page'

import './page.css'

const page = () => {
  return (
    <div className="DashboardComponent">
      <div className="DashboardComponent-in">
        <div className="DashboardComponent-Nav">
          <Navbar />
        </div>
        <div className="DashboardComponent-one">
          <div className="DashboardComponent-one-in">
            <div className="DC-sideBar">
                <Sidebar />
            </div>
            <div className="DC-one">

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
