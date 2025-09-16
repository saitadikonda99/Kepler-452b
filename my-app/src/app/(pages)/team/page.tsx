"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../../Components/Footer/page";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

import axios from "axios";
import Image from "next/image";
import "./page.css";

const Page = () => {
  const [teamData, setTeamData] = useState([]);
  const [filteredTeamData, setFilteredTeamData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("viewAll");
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const fetchTeamData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/admin/Team");
      setTeamData(response.data);
      setFilteredTeamData(response.data);
    } catch (error) {
      console.error("Error fetching team data:", error);
      setTeamData([]);
      setFilteredTeamData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await axios.get("/api/admin/Team/addCategory");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    
    if (categoryValue === "viewAll") {
      setFilteredTeamData(teamData);
    } else {
      const filtered = teamData.filter((member) => member.category === categoryValue);
      setFilteredTeamData(filtered);
    }
  };

  return (
    <div className="TeamPageComponent">
      <div className="TeamPage-nav">
        <Navbar />
      </div>
      <div className="TeamPageComponent-in">
        <div className="teamPage-one">
          <img src="https://i.imghippo.com/files/PYQ7895.jpg" alt="Team" />
          <div className="teamPage-one-one">
            <h1>THE TEAM</h1>
          </div>
        </div>
        <div className="teamPage-two">
          <div className="teamPage-two-one">
            <h1>Meet Our People</h1>
          </div>
          <div className="teamPage-two-two">
            <p>
              Our team is the heart of the Student Activity Center, supporting
              clubs and initiatives that bring students together. Through
              collaboration and creativity, we aim to enrich every student's
              journey on campus.
            </p>
          </div>
          <div className="teamPage-two-three">
            <div 
              className={`teamPage-two-three-item ${selectedCategory === "viewAll" ? 'active' : ''}`}
              onClick={() => handleCategoryClick("viewAll")}
            >
              <h2>View All</h2>
            </div>
            {categoriesLoading ? (
              <div className="loading-categories">
                <p>Loading categories...</p>
              </div>
            ) : (
              categories.map((category, index) => (
                <div 
                  key={category.id || index} 
                  className={`teamPage-two-three-item ${selectedCategory === category.category_name ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.category_name)}
                >
                  <h2>{category.category_name}</h2>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="teamPage-three">
          {isLoading ? (
            <div className="loading-container">
              <p>Loading team members...</p>
            </div>
          ) : filteredTeamData.length === 0 ? (
            <div className="no-results-container">
              <p>No team members found for the selected category.</p>
            </div>
          ) : (
            filteredTeamData.map((item, index) => (
              <div key={index} className="team-card">
                <div className="team-card-in">
                  <div className="team-card-one">
                    <img src={item.image_url} alt="Team" />
                  </div>
                </div>
                <div className="team-card-two">
                  <div className="team-card-two-one">
                    <h1>{item.name}</h1>
                    <p>{item.title}</p>
                  </div>
                <div className="team-card-two-two">
                  <FaLinkedin className="team-card-two-two-one" />
                  <MdOutlineMail className="team-card-two-two-two" />
                </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="TeamPage-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
