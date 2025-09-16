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
import DropZone from "../../../Components/ui/dropZone";

const Page = () => {
  const [teamData, setTeamData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image_url: "",
    linkedin_url: "",
    email: "",
    category: "",
    display_order: 0,
    is_active: true,
  });

  const handleUploadSuccess = (data: any) => {
    toast.success(data.message || "Team members uploaded successfully!");
    setUploading(false);
    fetchTeamData();
  };

  const handleUploadError = (error: string) => {
    toast.error(error);
    setUploading(false);
  };

  const handleUploadStart = () => {
    setUploading(true);
  };

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
      category: categories.length > 0 ? categories[0].category_name : "",
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
      category: categories.length > 0 ? categories[0].category_name : "",
      display_order: 0,
      is_active: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

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
        setFormData({
          name: "",
          title: "",
          image_url: "",
          linkedin_url: "",
          email: "",
          category: categories.length > 0 ? categories[0].category_name : "",
          display_order: 0,
          is_active: true,
        });
        fetchTeamData();
      } else {
        toast.error(response.data.message || "Failed to save team member");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving team member");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id, memberName) => {
    if (!window.confirm(`Are you sure you want to delete "${memberName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await axios.delete(`/api/admin/Team?id=${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(`"${memberName}" has been deleted successfully`);
        fetchTeamData();
      } else {
        toast.error(response.data.message || "Failed to delete team member");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error deleting team member"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/admin/Team", {
        withCredentials: true,
      });
      console.log(response.data);
      setTeamData(response.data);
    } catch (error) {
      toast.error("Failed to fetch team data");
      console.error("Error fetching team data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/admin/Team/addCategory", {
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchTeamData();
    fetchCategories();
  }, []);

  const getTeamByCategory = (categoryName) => {
    return teamData.filter((member) => member.category === categoryName);
  };

  return (
    <Dashboard>
      <div className="TeamAdminComponent">
        <div className="TeamAdminComponent-in">
          <div className="TeamAdmin-one">
            <div className="TeamAdmin-one-one">
              <p>
                Instructions to update team data{" "}
                <MdOutlineIntegrationInstructions className="TeamAdmin-icon" />
              </p>
            </div>
            <div className="TeamAdmin-one-two">
              <div className="TeamAdmin-one-two-one">
                <p>
                  Download the provided Excel template and fill in the details
                  of the team members you want to add.
                </p>
                <a href="/Team.xlsx" download="Team.xlsx">Download Excel Template</a>
              </div>
              <div className="TeamAdmin-one-two-one">
                <p>Download the CSV file and upload it to the database.</p>
              </div>
              <div className="TeamAdmin-one-two-one">
                <p><strong>Note:</strong> Your Excel/CSV file can use either 'category_id' (numeric ID from Categories page) or 'category' (category name). Both formats are supported.</p>
              </div>
            </div>
          </div>
          <div className="TeamAdmin-two">
            <div className="TeamAdmin-two-in">
              <DropZone
                endpoint="/api/admin/Team"
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

              {showForm && (
                <div className="manual-entry-section">
                  <form onSubmit={handleSubmit} className="team-form">
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
                          placeholder="Enter team member name"
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
                          placeholder="Enter position"
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
                          placeholder="Enter email"
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
                          placeholder="Enter LinkedIn URL"
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
                          placeholder="Enter image URL"
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
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.category_name}>
                              {cat.category_name}
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
                          placeholder="Enter display order"
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
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={sending}
                        className="submit-button"
                      >
                        {sending ? "Adding..." : (editingMember ? "Update Member" : "Add Member")}
                      </button>
                    </div>
                  </form>

                  {sending && (
                    <div className="upload-status">
                      <div className="spinner"></div>
                      <p>Adding team member...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {!showForm && (
            <div className="TeamAdmin-list">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div className="list-header">
                    <h2>Team Members</h2>
                    <button onClick={handleAddNew} className="add-btn">
                      Add New Team Member
                    </button>
                  </div>
                  {categories.map((category) => {
                    const categoryMembers = getTeamByCategory(category.category_name);
                    if (categoryMembers.length === 0) return null;

                    return (
                      <div key={category.id} className="category-section">
                        <h3 className="category-title">{category.category_name}</h3>
                        <div className="team-grid">
                          {categoryMembers.map((member) => (
                            <div key={member.id} className="team-card">
                              <div className="team-card-in">
                                <div className="team-card-one">
                                  <img src={member.image_url} alt={member.name} />
                                  <div className="member-actions">
                                    <button
                                      onClick={() => handleEdit(member)}
                                      className="edit-btn"
                                      title="Edit team member"
                                    >
                                      <FaEdit />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(member.id, member.name)}
                                      className="delete-btn"
                                      disabled={deletingId === member.id}
                                      title="Delete team member"
                                    >
                                      {deletingId === member.id ? (
                                        <div className="spinner-small"></div>
                                      ) : (
                                        <FaTrash />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="team-card-two">
                                <div className="team-card-two-one">
                                  <h1>{member.name}</h1>
                                  <p>{member.title}</p>
                                </div>
                                <div className="team-card-two-two">
                                  {member.linkedin_url && (
                                    <a
                                      href={member.linkedin_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="social-link"
                                    >
                                      <FaLinkedin className="team-card-two-two-one" />
                                    </a>
                                  )}
                                  <a
                                    href={`mailto:${member.email}`}
                                    className="social-link"
                                  >
                                    <FaEnvelope className="team-card-two-two-two" />
                                  </a>
                                </div>
                              </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Page;
