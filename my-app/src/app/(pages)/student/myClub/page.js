"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from '../dashboard/dashboard'
import './page.css'

import Loading from '../../../animation/Loading';


const page = () => {
  const [clubDetails, setClubDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/student/myClub');
        console.log('Club Details received:', response.data[0]);
        setClubDetails(response.data[0]);
      } catch (error) {
        console.error('Error fetching club details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubDetails();
  }, []);

  if (loading) {
    return (
      <Dashboard>
        <Loading />
      </Dashboard>
    );
  }

  if (!clubDetails) {
    return (
      <Dashboard>
        <div className="no-club">
          <h2>No club information available</h2>
        </div>
      </Dashboard>
    );
  }

  const domainFullNames = {
    TEC: 'Technology Clubs',
    LCH: 'Liberal Arts, Creative Arts and Hobby Clubs',
    ESO: 'Extension & Society Outreach Clubs',
    IIE: 'Innovation, Incubation and Entrepreneurship Clubs',
    HWB: 'Health and Wellbeing Clubs'
  };

  return (
    <Dashboard>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image">
              {clubDetails.club_logo ? (
                <img
                  src={clubDetails.club_logo}
                  alt="Club Logo"
                  className="club-logo"
                />
              ) : (
                <div className="default-logo">
                  {clubDetails.club_name?.charAt(0)}
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1>{clubDetails.club_name}</h1>
              <p className="domain-text">{domainFullNames[clubDetails.club_domain]}</p>
              <p className="description">{clubDetails.club_description}</p>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-label">Lead Name</span>
              <span className="stat-value">{clubDetails.lead_name}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Id Number</span>
              <span className="stat-value">{clubDetails.lead_username}</span>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default page