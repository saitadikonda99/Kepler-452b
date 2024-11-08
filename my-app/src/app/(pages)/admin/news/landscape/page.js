"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import Loader from "../../../../animation/loader";

import "./page.css";

// Import components
import Dashboard from "../../dashboard/dashboard";

const Page = () => {
  const [newsData, setNewsData] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    newsId: null,
    newsLink: "",
    clubName: "",
    newsContent: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/admin/news/landscape");
        setNewsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching landscape news:", error);
        toast.error(error.response?.data?.message || "Failed to fetch news");
        setIsLoading(false);
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
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/admin/news/landscape",
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        toast.success("News updated successfully!");
        setShowUpdateForm(false);
        setNewsData((prevData) =>
          prevData.map((news) =>
            news.id === updateData.newsId ? { ...news, ...updateData } : news
          )
        );
      } else {
        setIsLoading(false);
        toast.error(response.data.message || "Failed to update news");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating the news:", error);
      toast.error(error.response?.data?.message || "Error updating the news");
    }
  };

  return (
    <Dashboard>
      <div className="NewsLandscapeComponent">
        <div className="NewsLandscapeComponent-in">
          <div className="newsLandscape-one">
            <div className="newsLandscape-one-one">
              <p>
                Instructions to update news{" "}
                <MdOutlineIntegrationInstructions className="newsLandscape-icon" />
              </p>
            </div>
            <div className="newsLandscape-one-two">
              <div className="newsLandscape-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display.
                </p>
                <Link
                  href="https://www.canva.com/design/DAGVOb7x6hg/H4_YD4-t9s5ZT-iXhWKKjg/view?utm_content=DAGVOb7x6hg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
                  target="_blank"
                >
                  Canva Link
                </Link>
              </div>
              <div className="newsLandscape-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                After resizing the image, download it and upload it to a storage service like 
                  <Link href="http://firebase.google.com/" target="_blank">
                    {" "}
                    Firebase Storage
                  </Link>{" "}
                  or{" "}
                  <Link href="https://www.imghippo.com/" target="_blank">
                    Imghippo.
                  </Link> Please refer to the <Link href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Video_Tutorial.mp4?alt=media&token=a9487ecb-40aa-423a-bf20-26150128b7f5" target="_blank">
                    {" "}
                    Video Tutorial
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>

          {showUpdateForm ? (
            isLoading ? (
              <Loader />
            ) : (
              <div className="newsLandscape-two">
                <div className="newsLandscape-two-in">
                  <div className="NewsUpdate-one">
                    <label htmlFor="newsLink">News Image Link</label>
                    <input
                      type="text"
                      placeholder="News Link"
                      name="newsLink"
                      id="newsLink"
                      value={updateData.newsLink}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="NewsUpdate-two">
                    <label htmlFor="clubName">Club Name</label>
                    <input
                      type="text"
                      placeholder="Club Name"
                      name="clubName"
                      id="clubName"
                      value={updateData.clubName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="NewsUpdate-three">
                    <label htmlFor="newsContent">News Content</label>
                    <input
                      type="text"
                      placeholder="News Content"
                      name="newsContent"
                      id="newsContent"
                      value={updateData.newsContent}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="NewsUpdate-five">
                    <button onClick={() => setShowUpdateForm(false)}>
                      Cancel
                    </button>
                    <button onClick={handleSubmit}>Update</button>
                  </div>
                </div>
              </div>
            )
          ) : isLoading ? (
            <Loader />
          ) : (
            <div className="newsLandscape-three">
              <div className="newsLandscape-three-in">
                {Array.isArray(newsData) && newsData.length > 0 && (
                  <div className="newsLandscape-three-in">
                    <div className="newsLandscape-three-in-two">
                      <div className="newsLandscape-three-in-two-in">
                        {newsData.map((news) => (
                          <div
                            key={news.id}
                            className="newsLandscape-three-in-two-content"
                          >
                            <img src={news.news_link} alt="News Image" />
                            <h2>{news.club_name}</h2>
                            <p>{news.news_content}</p>
                            <div className="newsLandscape-three-in-two-button">
                              <button
                                onClick={() => handleUpdateClick(news.id)}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
