"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../../Components/Footer/page";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import axios from "axios";

import "./page.css";

const Page = () => {
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = {
    leadership: "Leadership Team",
    coordinators: "Domain Coordinators", 
    club_leaders: "Club Leaders",
    core_team: "Core Team",
    staff: "Staff",
    trainers: "Trainers",
    mentors: "Industry Mentors",
    previous_council: "Previous Council"
  };

  const fetchTeamData = async () => {
    try {
      const response = await axios.get("/api/admin/Team");
      setTeamData(response.data);
    } catch (error) {
      console.error("Error fetching team data:", error);
      // Fallback to empty array if API fails
      setTeamData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const getTeamByCategory = (category) => {
    return teamData.filter(member => member.category === category);
  };

  if (isLoading) {
    return (
      <div className="TeamPageComponent">
        <div className="TeamPage-nav">
          <Navbar />
        </div>
        <div className="TeamPageComponent-in">
          <div className="teamPage-one">
            <h1>Meet Our People</h1>
          </div>
          <div className="teamPage-two">
            <p>Loading team members...</p>
          </div>
        </div>
        <div className="TeamPage-footer">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="TeamPageComponent">
      <div className="TeamPage-nav">
        <Navbar />
      </div>
      <div className="TeamPageComponent-in">
        <div className="teamPage-one">
            <h1>Meet Our People</h1>
        </div>
        <div className="teamPage-two">
          <p>
            Our team is the heart of the Student Activity Center, supporting
            clubs and initiatives that bring students together. Through
            collaboration and creativity, we aim to enrich every student's
            journey on campus.
          </p>
        </div>
        
        {/* Team Members by Category */}
        {Object.entries(categories).map(([categoryKey, categoryName]) => {
          const categoryMembers = getTeamByCategory(categoryKey);
          if (categoryMembers.length === 0) return null;
          
          return (
            <div key={categoryKey} className="team-category-section">
              <h2 className="category-title">{categoryName}</h2>
              <div className="team-grid">
                {categoryMembers.map((member, index) => (
                  <div key={member.id || index} className="team-member-card">
                    <div className="member-image" style={{backgroundImage: `url(${member.image_url})`}}>
                    </div>
                    <div className="member-info">
                      <h3>{member.name}</h3>
                      <p>{member.title}</p>
                      <div className="member-social">
                        {member.linkedin_url && (
                          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="social-link">
                            <FaLinkedin />
                          </a>
                        )}
                        <a href={`mailto:${member.email}`} className="social-link">
                          <FaEnvelope />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="TeamPage-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
