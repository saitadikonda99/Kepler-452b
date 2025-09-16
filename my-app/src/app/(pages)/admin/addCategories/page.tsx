"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Dashboard from "../dashboard/dashboard";
import DropZone from "../../../Components/ui/dropZone";
import "./page.css";

import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

const page = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: ""
  });

  const handleUploadSuccess = (data: any) => {
    toast.success(data.message || "Categories uploaded successfully!");
    setUploading(false);
    fetchCategories();
  };

  const handleUploadError = (error: string) => {
    toast.error(error);
    setUploading(false);
  };

  const handleUploadStart = () => {
    setUploading(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      categoryName: category.category_name
    });
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({
      categoryName: ""
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      categoryName: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const submitData = {
        ...formData,
        id: editingCategory?.id || null,
      };

      const response = await axios.post('/api/admin/Team/addCategory', submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Category added successfully!");
        setFormData({
          categoryName: ""
        });
        setShowForm(false);
        setEditingCategory(null);
        fetchCategories();
      } else {
        toast.error(response.data.message || "Failed to add category");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error adding category");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const response = await axios.delete(`/api/admin/Team/addCategory?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(response.data.message || "Failed to delete category");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting category");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/admin/Team/addCategory');
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Dashboard>
      <div className="AddCategoriesComponent">
        <div className="AddCategoriesComponent-in">
          <div className="AddCategoriesComponent-in-one">
            <div className="AddCategoriesComponent-in-one-one">
              <p>
                Instructions to update categories{" "}
                <MdOutlineIntegrationInstructions className="AddCategories-icon" />
              </p>
            </div>
            <div className="AddCategoriesComponent-in-one-two">
              <div className="AddCategoriesComponent-in-one-two-one">
                <p>
                  Download the provided Excel template and fill in the details
                  of the categories you want to add.
                </p>
                <a href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Categories.xlsx?alt=media&token=399dde4b-3835-43e1-9813-379e39e75f9c" download="Categories.xlsx">Download Excel Template</a>
              </div>
              <div className="AddCategoriesComponent-in-one-two-one">
                <p>Download the CSV file and upload it to the database.</p>
              </div>
              <div className="AddCategoriesComponent-in-one-two-one">
                <p><strong>Note:</strong> When uploading team members via Excel, you can use either the Category ID (shown below) in a 'category_id' column, or the category name in a 'category' column.</p>
              </div>
            </div>
          </div>
          <div className="AddCategoriesComponent-in-two">
            <div className="AddCategoriesComponent-in-two-in">
              <DropZone
                endpoint="/api/admin/Team/addCategory"
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
                  <form onSubmit={handleSubmit} className="category-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="categoryName">Category Name *</label>
                        <input
                          type="text"
                          id="categoryName"
                          name="categoryName"
                          value={formData.categoryName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter category name"
                        />
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
                        {sending ? "Adding..." : (editingCategory ? "Update Category" : "Add Category")}
                      </button>
                    </div>
                  </form>

                  {sending && (
                    <div className="upload-status">
                      <div className="spinner"></div>
                      <p>Adding category...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {!showForm && (
            <div className="categories-list">
              <div className="list-header">
                <h2>Categories</h2>
                <button onClick={handleAddNew} className="add-btn">
                  Add New Category
                </button>
              </div>
                <div className="categories-grid">
                {categories.map((category) => (
                  <div key={category.id} className="category-card">
                    <div className="category-info">
                      <p className="category-name">{category.category_name}</p>
                      <p className="category-id">ID: {category.id}</p>
                    </div>
                    <div className="category-actions">
                      <button
                        onClick={() => handleEdit(category)}
                        className="edit-btn"
                      >
                        <FaPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="delete-btn"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default page;
