'use client';
import React from 'react';
import './page.css';
import Image from 'next/image';
import Navbar from './Navbar.js';

const OrganogramPage = () => {
  return (
    <>
      <Navbar />
      <div className="organogram-container">
        <div className="header">
          <h1>Organogram Of Student Activity Centre</h1>
        </div>

        <div className="org-chart">
          {/* Level 1 */}
          <div className="level">
            <div className="box-wrapper">
              <div className="box">Director SAC</div>
            </div>
          </div>

          {/* Level 2 */}
          <div className="level">
            <div className="box-wrapper">
              <div className="box">SAC Office</div>
            </div>
          </div>

          {/* Level 3 */}
          <div className="level">
            <div className="box-wrapper">
              <div className="box">Council President</div>
            </div>
          </div>

          {/* Level 4 */}
          <div className="level">
            <div className="box-wrapper">
              <div className="box">Vice President - 1</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Vice President - 2</div>
            </div>
          </div>

          {/* Level 5 - Councils */}
          <div className="level councils">
            <div className="box-wrapper">
              <div className="box">Finance and Logistics Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">HR Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Academic Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Transport Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">PR & Media Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Drafting Council</div>
            </div>
          </div>

          {/* Level 6 - Sub Councils */}
          <div className="level sub-councils">
            <div className="box-wrapper">
              <div className="box">IIE Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Internal and External Affairs Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Tech Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Hostel Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">ESO Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">HWB Council</div>
            </div>
            <div className="box-wrapper">
              <div className="box">LCH Council</div>
            </div>
          </div>

          {/* Level 7 - Convenors */}
          <div className="level convenors">
            <div className="box-wrapper">
              <div className="box">Technical Convenor</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Liberal Arts Convenor</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Health & Wellness Convenor</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Out Reach & Extension Convenor</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Innovation and Incubation Convenor</div>
            </div>
          </div>

          {/* Level 8 - Club Leads */}
          <div className="level leads">
            <div className="box-wrapper">
              <div className="box">Technical Club Leads</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Liberal Arts Club Leads</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Health & Wellness Club Leads</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Out Reach & Extension Club Leads</div>
            </div>
            <div className="box-wrapper">
              <div className="box">Innovation and Incubation Club Leads</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganogramPage;