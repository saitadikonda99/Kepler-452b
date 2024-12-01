"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import "./page.css";

// Import components
import Dashboard from "../../dashboard/dashboard";
import Loader from "../../../../animation/Loading";

const Page = () => {
  const [newsData, setNewsData] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [updateData, setUpdateData] = useState({
    newsId: null,
    newsLink: "",
    clubName: "",
    newsContent: "",
  });

  const handleClick = (newsId) => {
    const selectedNews = newsData.find((news) => news.id === newsId);
    setUpdateData({
      newsId: selectedNews.id,
      newsLink: selectedNews.news_link,
      clubName: selectedNews.club_name,
      newsContent: selectedNews.news_content,
    });
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
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
      const response = await axios.post("/api/admin/news/portrait", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoading(false);
        toast.success("News updated successfully!");
        setShow(false);
        setNewsData((prevData) =>
          prevData.map((news) =>
            news.id === updateData.newsId
              ? {
                  ...news,
                  news_link: updateData.newsLink,
                  club_name: updateData.clubName,
                  news_content: updateData.newsContent,
                }
              : news
          )
        );
      } else {
        setIsLoading(false);
        toast.error("Failed to update news");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error updating the news");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/news/portrait');
        setNewsData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to fetch news");
      }
    }
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="NewsComponent">
        <div className="NewsComponent-in">
          <div className="News-one">
            <div className="News-one-one">
              <p>
                Instructions to update images{" "}
                <MdOutlineIntegrationInstructions className="News-icon" />
              </p>
            </div>
            <div className="News-one-two">
              <div className="News-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display.
                </p>
                <Link href="https://www.canva.com/design/DAGVOZTJzh8/Jlj-pRBJ7Qt87h9OdTMTlA/view?utm_content=DAGVOZTJzh8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" target="_blank">Canva Link</Link>
              </div>

              <div className="News-one-two-one">
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

          {show ? (
            isLoading ? <Loader /> : (
              <div className="News-two">
                <div className="News-two-in">
                  <div className="NewsUpdate-one">
                    <label htmlFor="newsLink">News Image Link</label>
                    <input
                      type="text"
                      placeholder="News Image Link"
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
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>Update</button>
                  </div>
                </div>
              </div>
            )
          ) : (
            isLoading ? <Loader /> : (
              <div className="News-three">
                <div className="News-three-in">
                  {Array.isArray(newsData) && newsData.length > 0 && (
                    newsData.map((news) => (
                      <div className="News-three-one" key={news.id}>
                        <div className="News-three-one-img">
                          <img src={news.news_link} alt="News Image" />
                        </div>
                        <div className="News-three-one-name">
                          <p>{news.club_name}</p>
                        </div>
                        <div className="News-three-one-content">
                          <p>{news.news_content}</p>
                        </div>
                        <button onClick={() => handleClick(news.id)}>Update</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
