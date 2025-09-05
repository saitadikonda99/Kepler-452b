"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaLinkedin,
  FaEnvelope,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import "./page.css";

// import components here
import Dashboard from "../dashboard/dashboard";
import Loader from "../../../animation/Loading";

const Page = () => {
  const [teamData, setTeamData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image_url: "",
    linkedin_url: "",
    email: "",
    category: "leadership",
    display_order: 0,
    is_active: true,
  });

  const categories = [
    { value: "leadership", label: "Leadership Team" },
    { value: "coordinators", label: "Domain Coordinators" },
    { value: "club_leaders", label: "Club Leaders" },
    { value: "core_team", label: "Core Team" },
    { value: "staff", label: "Staff" },
    { value: "trainers", label: "Trainers" },
    { value: "mentors", label: "Industry Mentors" },
    { value: "previous_council", label: "Previous Council" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      title: member.title,
      image_url: member.image_url,
      linkedin_url: member.linkedin_url || "",
      email: member.email,
      category: member.category,
      display_order: member.display_order || 0,
      is_active: member.is_active,
    });
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      title: "",
      image_url: "",
      linkedin_url: "",
      email: "",
      category: "leadership",
      display_order: 0,
      is_active: true,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData({
      name: "",
      title: "",
      image_url: "",
      linkedin_url: "",
      email: "",
      category: "leadership",
      display_order: 0,
      is_active: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        id: editingMember?.id || null,
      };

      const response = await axios.post("/api/admin/Team", submitData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setShowForm(false);
        setEditingMember(null);
        fetchTeamData();
      } else {
        toast.error(response.data.message || "Failed to save team member");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving team member");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/admin/Team?id=${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Team member deleted successfully");
        fetchTeamData();
      } else {
        toast.error(response.data.message || "Failed to delete team member");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error deleting team member"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/admin/Team", {
        withCredentials: true,
      });
      setTeamData(response.data);
    } catch (error) {
      toast.error("Failed to fetch team data");
      console.error("Error fetching team data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const getTeamByCategory = (category) => {
    return teamData.filter((member) => member.category === category);
  };

  return (
    <Dashboard>
      <div className="TeamAdminComponent">
        <div className="TeamAdminComponent-in">
          <div className="TeamAdmin-one">
            <div className="TeamAdmin-one-one">
              <h1>Team Management</h1>
              <button onClick={handleAddNew} className="add-btn">
                <FaPlus /> Add New Member
              </button>
            </div>
            <div className="TeamAdmin-one-two">
              <p>
                Instructions to update team images{" "}
                <MdOutlineIntegrationInstructions className="TeamAdmin-icon" />
              </p>
            </div>
            <div className="TeamAdmin-one-three">
              <div className="TeamAdmin-one-three-one">
                <VscDebugBreakpointLog />
                <p>
                  Image Dimensions: Team member images should be 400px x 500px for optimal display on the website.
                </p>
              </div>
              <div className="TeamAdmin-one-three-one">
                <VscDebugBreakpointLog />
                <p>
                  After resizing the image, download it and upload it to a storage service like
                  <a
                    href="http://firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Firebase Storage
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://www.imghippo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Imghippo
                  </a>
                  . Please refer to the{" "}
                  <a
                    href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Video_Tutorial.mp4?alt=media&token=a9487ecb-40aa-423a-bf20-26150128b7f5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video Tutorial
                  </a>
                </p>
              </div>
            </div>
          </div>

          {showForm ? (
            isLoading ? (
              <Loader />
            ) : (
              <div className="TeamAdmin-form">
                <div className="TeamAdmin-form-in">
                  <h2>
                    {editingMember ? "Edit Team Member" : "Add New Team Member"}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="title">Title/Position *</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="linkedin_url">LinkedIn URL</label>
                        <input
                          type="url"
                          id="linkedin_url"
                          name="linkedin_url"
                          value={formData.linkedin_url}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="image_url">Image URL *</label>
                        <input
                          type="url"
                          id="image_url"
                          name="image_url"
                          value={formData.image_url}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          {categories
                            .filter((cat) => cat.value !== "leadership")
                            .map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="display_order">Display Order</label>
                        <input
                          type="number"
                          id="display_order"
                          name="display_order"
                          value={formData.display_order}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="form-group checkbox-group">
                        <label>
                          <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleInputChange}
                          />
                          Active
                        </label>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="submit-btn">
                        {editingMember ? "Update" : "Add"} Member
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )
          ) : isLoading ? (
            <Loader />
          ) : (
            <div className="TeamAdmin-list">
              {categories.map((category) => {
                const categoryMembers = getTeamByCategory(category.value);
                if (categoryMembers.length === 0) return null;

                return (
                  <div key={category.value} className="category-section">
                    <h3 className="category-title">{category.label}</h3>
                    <div className="team-grid">
                      {categoryMembers.map((member) => (
                        <div key={member.id} className="team-member-card">
                          <div
                            className="member-image"
                            style={{
                              backgroundImage: `url(${member.image_url})`,
                            }}
                          >
                            <div className="member-actions">
                              <button
                                onClick={() => handleEdit(member)}
                                className="edit-btn"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(member.id)}
                                className="delete-btn"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          <div className="member-info">
                            <h4>{member.name}</h4>
                            <p>{member.title}</p>
                            <div className="member-social">
                              {member.linkedin_url && (
                                <a
                                  href={member.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="social-link"
                                >
                                  <FaLinkedin />
                                </a>
                              )}
                              <a
                                href={`mailto:${member.email}`}
                                className="social-link"
                              >
                                <FaEnvelope />
                              </a>
                            </div>
                            <div className="member-status">
                              <span
                                className={`status ${member.is_active ? "active" : "inactive"}`}
                              >
                                {member.is_active ? <FaEye /> : <FaEyeSlash />}
                                {member.is_active ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
