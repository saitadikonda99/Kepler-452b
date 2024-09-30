"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

import "./page.css";

// Import components
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/page";

const Page = () => {
  const [newsData, setNewsData] = useState({
    newsId: null,
    newsLink: "",
    clubName: "",
    newsContent: "",
  });

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [updateData, setUpdateData] = useState({
    newsId: null,
    newsLink: "",
    clubName: "",
    newsContent: "",
  });


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/news/portrait');

        console.log(response)

        if (response.status === 200) {
          setNewsData(response.data);
        } else {
          toast.error("Failed to fetch news");
        }
      } catch (error) {
        toast.error("Internal server error");
      }
    }
    fetchData();
  }, []);

  const handleUpdateClick = (newsId) => {
    const selectedNews = newsData.find((news) => news.id === newsId);
    setUpdateData({
      newsId: selectedNews.id,
      newsLink: selectedNews.newsLink,
      clubName: selectedNews.clubName,
      newsContent: selectedNews.newsContent,
    });
    setShowUpdateForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/news/portrait", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("News updated successfully!");
        setShowUpdateForm(false);
        setNewsData((prevData) =>
          prevData.map((news) =>
            news.id === updateData.newsId ? { ...news, ...updateData } : news
          )
        );
      } else {
        toast.error("Failed to update news");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating the news");
    }
  };

  return (
    <div className="NewsPortraitScape">
      <div className="NewsPortraitScape-in">
        <div className="NewsPortraitScape-Nav">
          <Navbar />
        </div>
        <div className="NewsPortraitScape-one">
          <div className="NewsPortraitScape-one-in">
            <div className="NC-sideBar">
              <Sidebar />
            </div>
            <div className="NC-one">
              {showUpdateForm ? (
                <div className="updateForm">
                  <h1>Update News</h1>
                  <p>Please carefully update the news details</p>
                  <input
                    type="text"
                    placeholder="News Link"
                    name="newsLink"
                    value={updateData.newsLink}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Club Name"
                    name="clubName"
                    value={updateData.clubName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="News Content"
                    name="newsContent"
                    value={updateData.newsContent}
                    onChange={handleChange}
                  />
                  <button onClick={handleSubmit}>Update</button>
                  <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
                </div>
              ) : (
                <div className="NewsPortraitScape-content">
                  <h1>News List</h1>
                  {Array.isArray(newsData) && newsData.length > 0 ? (
                    newsData.map((news) => (
                      <div key={news.id}>
                        <h2>{news.clubName}</h2>
                        <p>{news.newsContent}</p>
                        <Link href={news.newsLink} target="_blank" rel="noopener noreferrer">Read More</Link>
                        <button onClick={() => handleUpdateClick(news.id)}>Update</button>
                      </div>
                    ))
                  ) : (
                    <p>No news available.</p>
                  )}
                  <div className="goBackLink">
                    <Link href="/admin/dashboard">Go Back</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="NewsPortraitScape-Footer">
          <div className="NewsPortraitScape-Footer-in">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
