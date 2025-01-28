"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./page.css";
import Navbar from "./Navbar";

const mentorsData = [
  {
    name: "Naveen Kumar",
    title: "Indian Administrative Service (IAS)",
    role: "Secretary, Irrigation and Water Resources, Government of Uttar Pradesh",
    domain: "Civil Services"
  },
  {
    name: "Drashti J.",
    title: "Software Engineer",
    role: "Gandhinagar, Gujarat, India",
    domain: "Technology"
  },
  {
    name: "Dr Muralidhar Panchagnula",
    title: "Indian School of Business (ISB), Hyd.",
    role: "Alumnus, Sen. Adv. Consultant, Healthcare Mngmt.",
    domain: "Business"
  },
  {
    name: "Kishore Kommi",
    title: "Indian Police Service (IPS)|| AI Practitioner || IIT KGP 2010-15",
    role: "Financial Engineering|| Ex-Data Scientist @ Bosch Centre for AI || Built 'Plentext' || Patent Holder",
    domain: "Law"
  },
  {
    name: "Leila Kraljevic",
    title: "Co-Founder @Delius Caravans",
    role: "German Design Award Winner | German Innovation Award Special | Good Design Award | The Burj CEO Woman Leadership of the Year",
    domain: "Design"
  },
  {
    name: "Rakesh Kumar Korada",
    title: "Sr Associate Manager at Sutherland",
    role: "Integration Specialist Oracle SOA, OSB, OIC, Certified Scrum Master",
    domain: "Technology"
  },
  {
    name: "Krish",
    title: "Building Praavi | OneBharat | Ex BharatPe | Ex Blinkit",
    role: "Founder of Heartprobe, Halfriend & BookOn | Ex DOE @ Leadership Foundation | Top 1% on Topmate",
    domain: "Entrepreneurship"
  },
  {
    name: "Sarita (Ritika) Sarkar",
    title: "Entrepreneur- Sarkar's Kitchen",
    role: "Bagh Beans Coffee & Art, Symbiosis institute of Management Studies",
    domain: "Food and Beverage"
  },
  {
    name: "Bhakt Pralhad",
    title: "Founder-Chairman, 'Biocosmic Foundation'",
    role: "Founder-Mentor, AMBHRNI School of Vedic Intellect, Founder-CEO @ Biocosmic Innovations, Biocosmic Intelligence Labs Biocosmic X",
    domain: "Education"
  },
  {
    name: "Asha Dullab",
    title: "Clinical Psychologist",
    role: "specializing in holistic mental health solutions, Global Care Hospital Abu Dhabi Emirate, United Arab Emirates",
    domain: "Healthcare"
  },
  {
    name: "Sadhna Singh",
    title: "NITI Aayog Army Officer",
    role: "New Delhi, India",
    domain: "Government"
  },
  {
    name: "RITIKA VINAY",
    title: "MRS ASIA PACIFIC 2014 | MRS INDIA",
    role: "QUEEN OF SUBSTANCE PAGEANT | IIM BANGALORE NSRCEL GOLDMAN SACH ALUMNI",
    domain: "Pageant"
  },
  {
    name: "Raghavi Shukla",
    title: "Lawyer @ TMT Law Practice",
    role: "Queer | Transwoman | Law & Policy | Dispute Resolution | DEI | CLC'23",
    domain: "Law"
  },
  {
    name: "Ganesh Dileep",
    title: "Chief of Staff - CEEW (Council on Energy, Environment and Water)",
    role: "Council on Energy, Environment and Water (CEEW), Indian Institute of Technology, Madras",
    domain: "Environment"
  },
  {
    name: "Selvamuthukumar Balasubramanian",
    title: "Founder & MD, Rajarajeswari Food's | Co Founder & CTO, WiTree Technology",
    role: "",
    domain: "Food and Beverage"
  },
  {
    name: "Siddharth Ram",
    title: "Building an A24 like studio for India & An Angel Investor",
    role: "Ex-Polygon, Ex-Accel & Startup Village",
    domain: "Entrepreneurship"
  },
  {
    name: "Deepika Sohal",
    title: "Transformation Leader",
    role: "Author | Finance",
    domain: "Business"
  },
  {
    name: "Matha Abhiram",
    title: "Film Director/Actor/Writer/Project Mentor",
    role: "Self Employed, ADITYA INSTITUTE OF TECHNOLOGY & MANAGEMENT, K.Kothuru, Tekkali - 532201, Srikakulam District, A.P(CC-A5)",
    domain: "Film and Media"
  },
  {
    name: "Sandy Khanda",
    title: "Founder @ Green Pencil Foundation",
    role: "CSR Project Implementation & Management | Proud Farmer | Social Development & Climate Advocacy | Climate Education To Fight With Climate Change Philanthropist",
    domain: "CSR"
  },
  {
    name: "Mohit Goel",
    title: "Founder & CEO @Metalok",
    role: "Web Metaverse COE ( Centre of Excellence )",
    domain: "Technology"
  }
]

const MentorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mentorsPerPage] = useState(12);
  const [selectedDomain, setSelectedDomain] = useState("all");

  const domains = ["all", "Technology", "Business", "Healthcare", "Law", "Education", "Government", "Arts"];

  const getFilteredMentors = () => {
    let filtered = mentorsData.filter((mentor) => {
      const matchesSearch = 
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (mentor.title && mentor.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mentor.role && mentor.role.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDomain = 
        selectedDomain === "all" ? true :
        mentor.domain === selectedDomain;

      return matchesSearch && matchesDomain;
    });

    return filtered;
  };

  const filteredMentors = getFilteredMentors();
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="mentorsComponent">
      <div className="mentorsComponent-in">
        <div className="mentorsComponent-Nav">
          <Navbar />
        </div>

        <div className="controls">
          <input
            type="text"
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="filters">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="domain-filter"
            >
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain === "all" ? "All Domains" : domain}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mentorsComponent-one">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Role</th>
                <th>Domain</th>
              </tr>
            </thead>
            <tbody>
              {currentMentors.map((mentor, index) => (
                <tr key={index}>
                  <td>{mentor.name}</td>
                  <td>{mentor.title}</td>
                  <td>{mentor.role}</td>
                  <td>{mentor.domain}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="previous"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              Prev
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`page-num ${currentPage === number ? "page-active" : ""}`}
                aria-label={`Page ${number}`}
              >
                {number}
              </button>
            ))}
            <button
              className="next"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;