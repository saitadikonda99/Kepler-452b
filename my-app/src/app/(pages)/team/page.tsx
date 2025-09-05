import React from "react";
import Navbar from "./Navbar";
import Footer from "../../Components/Footer/page";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

import "./page.css";

const Page = () => {
  const teamData = [
    // President
    {
      name: "Alex Johnson",
      title: "President",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/alex-johnson/",
      email: "alex.johnson@studentcenter.edu",
      category: "leadership"
    },
    
    // Vice Presidents
    {
      name: "Sarah Chen",
      title: "Vice President - Operations",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/sarah-chen/",
      email: "sarah.chen@studentcenter.edu",
      category: "leadership"
    },
    {
      name: "Michael Rodriguez",
      title: "Vice President - Events",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/michael-rodriguez/",
      email: "michael.rodriguez@studentcenter.edu",
      category: "leadership"
    },
    {
      name: "Emily Watson",
      title: "Vice President - Communications",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/emily-watson/",
      email: "emily.watson@studentcenter.edu",
      category: "leadership"
    },
    {
      name: "David Kim",
      title: "Vice President - Finance",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/david-kim/",
      email: "david.kim@studentcenter.edu",
      category: "leadership"
    },
    
    // Domain Student Coordinators
    {
      name: "Jessica Liu",
      title: "Tech Coordinator",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/jessica-liu/",
      email: "jessica.liu@studentcenter.edu",
      category: "coordinators"
    },
    {
      name: "Ryan Patel",
      title: "Sports Coordinator",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/ryan-patel/",
      email: "ryan.patel@studentcenter.edu",
      category: "coordinators"
    },
    {
      name: "Maya Singh",
      title: "Cultural Coordinator",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/maya-singh/",
      email: "maya.singh@studentcenter.edu",
      category: "coordinators"
    },
    {
      name: "James Wilson",
      title: "Academic Coordinator",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/james-wilson/",
      email: "james.wilson@studentcenter.edu",
      category: "coordinators"
    },
    {
      name: "Sophie Brown",
      title: "Community Outreach Coordinator",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/sophie-brown/",
      email: "sophie.brown@studentcenter.edu",
      category: "coordinators"
    },
    
    // Club Leads & Co-leads
    {
      name: "Daniel Martinez",
      title: "Coding Club Lead",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/daniel-martinez/",
      email: "daniel.martinez@studentcenter.edu",
      category: "club_leaders"
    },
    {
      name: "Lisa Zhang",
      title: "Coding Club Co-Lead",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/lisa-zhang/",
      email: "lisa.zhang@studentcenter.edu",
      category: "club_leaders"
    },
    {
      name: "Kevin O'Connor",
      title: "Debate Club Lead",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/kevin-oconnor/",
      email: "kevin.oconnor@studentcenter.edu",
      category: "club_leaders"
    },
    {
      name: "Rachel Green",
      title: "Debate Club Co-Lead",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/rachel-green/",
      email: "rachel.green@studentcenter.edu",
      category: "club_leaders"
    },
    
    // Core Team
    {
      name: "Tom Anderson",
      title: "Core Team Member",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/tom-anderson/",
      email: "tom.anderson@studentcenter.edu",
      category: "core_team"
    },
    {
      name: "Nina Kumar",
      title: "Core Team Member",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/nina-kumar/",
      email: "nina.kumar@studentcenter.edu",
      category: "core_team"
    },
    {
      name: "Chris Taylor",
      title: "Core Team Member",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/chris-taylor/",
      email: "chris.taylor@studentcenter.edu",
      category: "core_team"
    },
    
    // Staff
    {
      name: "Dr. Maria Garcia",
      title: "Faculty Advisor",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/maria-garcia/",
      email: "maria.garcia@studentcenter.edu",
      category: "staff"
    },
    {
      name: "Prof. Robert Lee",
      title: "Student Affairs Director",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/robert-lee/",
      email: "robert.lee@studentcenter.edu",
      category: "staff"
    },
    
    // Trainers
    {
      name: "Jennifer Adams",
      title: "Leadership Trainer",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/jennifer-adams/",
      email: "jennifer.adams@studentcenter.edu",
      category: "trainers"
    },
    {
      name: "Mark Thompson",
      title: "Technical Skills Trainer",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/mark-thompson/",
      email: "mark.thompson@studentcenter.edu",
      category: "trainers"
    },
    
    // Industry Mentors
    {
      name: "Sarah Williams",
      title: "Industry Mentor - Tech",
      image: "https://i.imghippo.com/files/LUue9250Wv.png",
      linkedin: "https://www.linkedin.com/in/sarah-williams/",
      email: "sarah.williams@techcorp.com",
      category: "mentors"
    },
    {
      name: "John Davis",
      title: "Industry Mentor - Finance",
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      linkedin: "https://www.linkedin.com/in/john-davis/",
      email: "john.davis@financecorp.com",
      category: "mentors"
    }
  ];

  const categories = {
    leadership: "Leadership Team",
    coordinators: "Domain Coordinators", 
    club_leaders: "Club Leaders",
    core_team: "Core Team",
    staff: "Staff",
    trainers: "Trainers",
    mentors: "Industry Mentors"
  };

  const getTeamByCategory = (category) => {
    return teamData.filter(member => member.category === category);
  };

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
                  <div key={index} className="team-member-card">
                    <div className="member-image" style={{backgroundImage: `url(${member.image})`}}>
                    </div>
                    <div className="member-info">
                      <h3>{member.name}</h3>
                      <p>{member.title}</p>
                      <div className="member-social">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                          <FaLinkedin />
                        </a>
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
