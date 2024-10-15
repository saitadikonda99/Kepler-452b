"use client";
import React from "react";
import "./page.css";

import { useState, useEffect } from "react";
import axios from 'axios'

const page = () => {
  const [newsLandscape, setNewsLandscape] = useState([]);
  const [newsPortrait, setNewsPortrait] = useState([]);

  useEffect(() => {

      const handleNewsLandscape = async () => {
        try {
          const response = await axios.get('/api/admin/news/landscape');
          setNewsLandscape(response.data);
        }
        catch (error) {
          console.log(error);
        }
      };

      const handleNewsPortrait = async () => {
        try {
          const response = await axios.get('/api/admin/news/portrait');
          setNewsPortrait(response.data);
        }
        catch (error) {
          console.log(error);
        }
      };

      handleNewsLandscape();
      handleNewsPortrait();

    }, []);

  return (
    <div className="seven">
      <div className="seven-in">
        <div className="seven-in-header cmn-heading">
          <div className="breadcrumb">
            <span>Home / News</span>
          </div>
          <h1>News from Community</h1>
        </div>

        <div className="seven-in-one">
          <div className="seven-in-one-one">
            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <img src={newsLandscape[0]?.news_link} alt="" />
                <div className="seven-in-one-one-box-in-desc">
                  <h4>{newsLandscape[0]?.club_name}</h4>
                  <p>{newsLandscape[0]?.news_content}</p>
                </div>
              </div>
            </div>

            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <div className="seven-in-one-one-box-in-one">
                  <img src={newsPortrait[0]?.news_link} alt="" />
                </div>
                <div className="seven-in-one-one-box-in-two">
                  <h4>{newsPortrait[0]?.club_name}</h4>
                  <p>{newsPortrait[0]?.news_content}</p>
                </div>
              </div>
            </div>

            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <div className="seven-in-one-one-box-in-one">
                  <img src={newsPortrait[1]?.news_link} alt="" />
                </div>
                <div className="seven-in-one-one-box-in-two">
                  <h4>{newsPortrait[1]?.club_name}</h4>
                  <p>{newsPortrait[1]?.news_content}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="seven-in-one-one">
            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <img src={newsLandscape[1]?.news_link} alt="" />
                <div className="seven-in-one-one-box-in-desc">
                  <h4>{newsLandscape[1]?.club_name}</h4>
                  <p>{newsLandscape[1]?.news_content}</p>
                </div>
              </div>
            </div>

            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <div className="seven-in-one-one-box-in-one">
                  <img src={newsPortrait[2]?.news_link} alt="" />
                </div>
                <div className="seven-in-one-one-box-in-two">
                  <h4>{newsPortrait[2]?.club_name}</h4>
                  <p>{newsPortrait[2]?.news_content}</p>
                </div>
              </div>
            </div>

            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <div className="seven-in-one-one-box-in-one">
                  <img src={newsPortrait[3]?.news_link} alt="" />
                </div>
                <div className="seven-in-one-one-box-in-two">
                  <h4>{newsPortrait[3]?.club_name}</h4>
                  <p>{newsPortrait[3]?.news_content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
