"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

import "./page.css";

// Import components
import Dashboard from "../../dashboard/dashboard"

const Page = () => {
  const [newsData, setNewsData] = useState([]);
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
        const response = await axios.get('/api/admin/news/landscape');
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching landscape news:", error);
        toast.error(error.response?.data?.message || "Failed to fetch news");
      }
    };
    fetchData();
  }, []);

  const handleUpdateClick = (newsId) => {
    const selectedNews = newsData.find((news) => news.id === newsId);
    setUpdateData({
      newsId: selectedNews.id,
      newsLink: selectedNews.news_link,
      clubName: selectedNews.club_name,
      newsContent: selectedNews.news_content,
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
      const response = await axios.post("/api/admin/news/landscape", updateData, {
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
        toast.error(response.data.message || "Failed to update news");
      }
    } catch (error) {
      console.error("Error updating the news:", error);
      toast.error(error.response?.data?.message || "Error updating the news");
    }
  };

  return (
      <Dashboard>
        <div className="LC-one">
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
                <div className="NewsLandScape-content">
                  <h1>News List</h1>
                  {Array.isArray(newsData) && newsData.length > 0 ? (
                    newsData.map((news) => (
                      <div key={news.id}>
                        <h2>{news.club_name}</h2>
                        <p>{news.news_content}</p>
                        <Link href={news.news_link} target="_blank" rel="noopener noreferrer">Read More</Link>
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
      </Dashboard>
  );
};

export default Page;
