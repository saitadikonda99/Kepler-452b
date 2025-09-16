"use client";
import React from "react";
import { useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

// imports start here
import Dashboard from "../dashboard/dashboard";
import DropZone from "../../../Components/ui/dropZone";

import "./page.css";

const page = () => {
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ClubName: "",
    clubDomain: "TEC",
    ActivityName: "",
    ActivityDate: "",
    ActivityVenue: "",
    ActivityType: "",
    ActivityReportLink: "",
    ActivityParticipants: ""
  });

  const handleUploadSuccess = (data: any) => {
    toast.success(data.message || "Activities uploaded successfully!");
    setUploading(false);
  };

  const handleUploadError = (error: string) => {
    toast.error(error);
    setUploading(false);
  };

  const handleUploadStart = () => {
    setUploading(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendData = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await axios.post('/api/admin/activities', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Activity added successfully!");
        setFormData({
          ClubName: "",
          clubDomain: "TEC",
          ActivityName: "",
          ActivityDate: "",
          ActivityVenue: "",
          ActivityType: "",
          ActivityReportLink: "",
          ActivityParticipants: ""
        });
        setShowForm(false);
      } else {
        toast.error(response.data.message || "Failed to add activity");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error adding activity");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dashboard>
      <div className="ActivitiesComponent">
        <div className="ActivitiesComponent-in">
          <div className="Activities-one">
            <div className="Activities-one-one">
              <p>
                Instructions to update images{" "}
                <MdOutlineIntegrationInstructions className="Activities-icon" />
              </p>
            </div>
            <div className="Activities-one-two">
              <div className="Activities-one-two-one">
                <p>
                  Download the provided Excel template and fill in the details
                  of the activities you want to add.
                </p>
                <a href="/activity_data.xlsx" download="Activities.xlsx">Download Excel Template</a>
              </div>
              <div className="Activities-one-two-one">
                <p>Download the CSV file and upload it to the database.</p>
              </div>
            </div>
          </div>
          <div className="Activities-two">
            <div className="Activities-two-in">
              <DropZone
                endpoint="/api/admin/activities"
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                onUploadStart={handleUploadStart}
              />

              {uploading && (
                <div className="upload-status">
                  <div className="spinner"></div>
                  <p>Uploading CSV file...</p>
                </div>
              )}

              <div className="manual-entry-section">
                <button 
                  className="manual-entry-button"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "Hide Manual Entry" : "Add Activity Manually"}
                </button>

                {showForm && (
                  <form onSubmit={handleSendData} className="activity-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="ClubName">Club Name *</label>
                        <input
                          type="text"
                          id="ClubName"
                          name="ClubName"
                          value={formData.ClubName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter club name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="clubDomain">Club Domain *</label>
                        <select
                          id="clubDomain"
                          name="clubDomain"
                          value={formData.clubDomain}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="TEC">TEC</option>
                          <option value="LCH">LCH</option>
                          <option value="ESO">ESO</option>
                          <option value="HWB">HWB</option>
                          <option value="IIE">IIE</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="ActivityName">Activity Name *</label>
                        <input
                          type="text"
                          id="ActivityName"
                          name="ActivityName"
                          value={formData.ActivityName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter activity name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ActivityDate">Activity Date *</label>
                        <input
                          type="date"
                          id="ActivityDate"
                          name="ActivityDate"
                          value={formData.ActivityDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="ActivityVenue">Activity Venue *</label>
                        <input
                          type="text"
                          id="ActivityVenue"
                          name="ActivityVenue"
                          value={formData.ActivityVenue}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter venue"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ActivityType">Activity Type *</label>
                        <input
                          type="text"
                          id="ActivityType"
                          name="ActivityType"
                          value={formData.ActivityType}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter activity type"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="ActivityParticipants">Number of Participants *</label>
                        <input
                          type="number"
                          id="ActivityParticipants"
                          name="ActivityParticipants"
                          value={formData.ActivityParticipants}
                          onChange={handleInputChange}
                          required
                          min="0"
                          placeholder="Enter number of participants"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ActivityReportLink">Report Link (Optional)</label>
                        <input
                          type="url"
                          id="ActivityReportLink"
                          name="ActivityReportLink"
                          value={formData.ActivityReportLink}
                          onChange={handleInputChange}
                          placeholder="Enter report link"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button 
                        type="button" 
                        onClick={() => setShowForm(false)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={sending}
                        className="submit-button"
                      >
                        {sending ? "Adding..." : "Add Activity"}
                      </button>
                    </div>
                  </form>
                )}

                {sending && (
                  <div className="upload-status">
                    <div className="spinner"></div>
                    <p>Adding activity...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
