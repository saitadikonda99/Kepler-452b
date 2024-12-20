"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Dashboard from "../../dashboard/dashboard";
import "./page.css";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

const Page = () => {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setData(text);   
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `/api/clubUpdate/addActivities`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.status === 200) {
        toast.success("Activities added successfully");
      } else {
        toast.error("Check the file data");
      }
    } catch (error) {
      toast.error("Check the file data");
    }
  };

  return (
    <Dashboard>
      <div className="addActivitiesComponent">
        <div className="addActivitiesComponent-in">
          <div className="addActivities-one">
            <div className="addActivities-one-one">
              <p>
                Instructions for Uploading Club Activity Files{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="addActivities-one-two">
              <div className="addActivities-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Upload a file to add a new activity to the club's profile.
                </p>
              </div>
              <div className="addActivities-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Please ensure the file is in the 
                  <a href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Activities.csv?alt=media&token=399dde4b-3835-43e1-9813-379e39e75f9c" download="Activities.csv"> .csv format</a> and relevant
                  to the activity you want to add.
                </p>
              </div>
            </div>
          </div>
          <div className="addActivities-two" id="final">
            <div className="addActivities-two-a" id="final-two">
              <div className={`custom-file-input ${file ? 'file-added' : ''}`}>
                <input
                  type="file"
                  id="csvFile"
                  name="csvFile"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                <span>{file ? file.name : 'Drop or Add your CSV file here'}</span>
              </div>
            </div>
            <div className="addActivities-two-b" id="final-three">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
