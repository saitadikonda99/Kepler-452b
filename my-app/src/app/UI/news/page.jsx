"use client";
import React from "react";
import "./page.css";

import { useState, useEffect } from "react";

import data from "../../../data/data.json";

const page = () => {
  const [newsLandscape, setNewsLandscape] = useState([]);
  const [newsPortrait, setNewsPortrait] = useState([]);

  useEffect(() => {
    setNewsLandscape(data.newsLandscape);
    setNewsPortrait(data.newsPortrait);
  }, []);

  // useEffect(() => {

  //     const handleNewsLandscape = async () => {
  //       try {
  //         const response = await axios.get('/api/news/landscape');
  //         setNewsLandscape(response.data);
  //       }
  //       catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     const handleNewsPortrait = async () => {
  //       try {
  //         const response = await axios.get('/api/news/portrait');
  //         setNewsPortrait(response.data);
  //       }
  //       catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     handleEvent();
  //     handleNewsLandscape();
  //     handleNewsPortrait();

  //   }, []);

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
                <img src={newsLandscape[0]?.newsLink} alt="" />
                <div className="seven-in-one-one-box-in-desc">
                  <h4>{newsLandscape[0]?.clubName}</h4>
                  <p>{newsLandscape[0]?.newsContent}</p>
                </div>
              </div>
            </div>

            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <div className="seven-in-one-one-box-in-one">
                  <img src={newsPortrait[0]?.newsLink} alt="" />
                </div>
                <div className="seven-in-one-one-box-in-two">
                  <h4>{newsPortrait[0]?.clubName}</h4>
                  <p>{newsPortrait[0]?.newsContent}</p>
                </div>
              </div>
            </div>

            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <div className="seven-in-one-one-box-in-one">
                  <img src={newsPortrait[1]?.newsLink} alt="" />
                </div>
                <div className="seven-in-one-one-box-in-two">
                  <h4>{newsPortrait[1]?.clubName}</h4>
                  <p>{newsPortrait[1]?.newsContent}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="seven-in-one-one">
            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <img src={newsLandscape[1]?.newsLink} alt="" />
                <div className="seven-in-one-one-box-in-desc">
                  <h4>{newsLandscape[1]?.clubName}</h4>
                  <p>{newsLandscape[1]?.newsContent}</p>
                </div>
              </div>
            </div>

            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <div className="seven-in-one-one-box-in-one">
                  <img src={newsPortrait[2]?.newsLink} alt="" />
                </div>
                <div className="seven-in-one-one-box-in-two">
                  <h4>{newsPortrait[2]?.clubName}</h4>
                  <p>{newsPortrait[2]?.newsContent}</p>
                </div>
              </div>
            </div>

            <div className="seven-in-one-one-box">
              <div className="seven-in-one-one-box-in">
                <div className="seven-in-one-one-box-in-one">
                  <img src={newsPortrait[3]?.newsLink} alt="" />
                </div>
                <div className="seven-in-one-one-box-in-two">
                  <h4>{newsPortrait[3]?.clubName}</h4>
                  <p>{newsPortrait[3]?.newsContent}</p>
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
