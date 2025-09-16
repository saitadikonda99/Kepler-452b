"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import "./page.css";

// import components here
import Dashboard from "../dashboard/dashboard";
import Loader from "../../../animation/Loading";

const Page = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [show, setShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [updateData, setUpdateData] = useState({
    testimonialId: null,
    testimonialName: "",
    testimonialTitle: "",
    testimonialImage: "",
    testimonialText: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (testimonialId) => {
    const selectedTestimonial = testimonialData.find((testimonial) => testimonial.id === testimonialId);

    setUpdateData({
      testimonialId: selectedTestimonial.id,
      testimonialName: selectedTestimonial.testimonial_name,
      testimonialTitle: selectedTestimonial.testimonial_title,
      testimonialImage: selectedTestimonial.testimonial_image,
      testimonialText: selectedTestimonial.testimonial_text,
    });

    setIsAdding(false);
    setShow(true);
  };

  const handleAddNew = () => {
    setUpdateData({
      testimonialId: null,
      testimonialName: "",
      testimonialTitle: "",
      testimonialImage: "",
      testimonialText: "",
    });

    setIsAdding(true);
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
    setIsAdding(false);
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
      const response = await axios.post("/api/admin/testimonials", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoading(false);
        toast.success(isAdding ? "Testimonial added successfully!" : "Testimonial updated successfully!");
        setShow(false);
        setIsAdding(false);

        if (isAdding) {
          fetchData();
        } else {
          setTestimonialData((prevData) =>
            prevData.map((testimonial) =>
              testimonial.id === updateData.testimonialId
                ? {
                    ...testimonial,
                    testimonial_name: updateData.testimonialName,
                    testimonial_title: updateData.testimonialTitle,
                    testimonial_image: updateData.testimonialImage,
                    testimonial_text: updateData.testimonialText
                  }
                : testimonial
            )
          );
        }
      } else {
        setIsLoading(false);
        toast.error(response.data.message || `Failed to ${isAdding ? 'add' : 'update'} testimonial`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || `Error ${isAdding ? 'adding' : 'updating'} the testimonial`);
    }
  };

  const handleDelete = async (testimonialId) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/admin/testimonials?id=${testimonialId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Testimonial deleted successfully!");
        
        setTestimonialData((prevData) =>
          prevData.filter((testimonial) => testimonial.id !== testimonialId)
        );
      } else {
        setIsLoading(false);
        toast.error(response.data.message || "Failed to delete testimonial");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Error deleting the testimonial");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/admin/testimonials", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setTestimonialData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching testimonials:", error);
      toast.error(error.response?.data?.message || "Failed to fetch testimonials");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="TestimonialComponent">
        <div className="TestimonialComponent-in">
          <div className="Testimonial-one">
            <div className="Testimonial-one-one">
              <p>
                Instructions to update testimonial images{" "}
                <MdOutlineIntegrationInstructions className="Testimonial-icon" />
              </p>
            </div>
            <div className="Testimonial-one-two">
              <div className="Testimonial-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display. 
                </p>
                <Link href="https://www.canva.com/design/DAGVOZTJzh8/Jlj-pRBJ7Qt87h9OdTMTlA/view?utm_content=DAGVOZTJzh8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" target="_blank">Canva Link</Link>
              </div>

              <div className="Testimonial-one-two-one">
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
              <div className="Testimonial-two">
                <div className="Testimonial-two-in">
                  <div className="TestimonialUpdate-one">
                    <label htmlFor="testimonialName">Testimonial Name</label>
                    <input
                      type="text"
                      placeholder="Testimonial Name"
                      name="testimonialName"
                      id="testimonialName"
                      value={updateData.testimonialName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="TestimonialUpdate-two">
                    <label htmlFor="testimonialTitle">Testimonial Title</label>
                    <input
                      type="text"
                      placeholder="Testimonial Title (e.g., CEO @ Company)"
                      name="testimonialTitle"
                      id="testimonialTitle"
                      value={updateData.testimonialTitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="TestimonialUpdate-three">
                    <label htmlFor="testimonialImage">Testimonial Image Link</label>
                    <input
                      type="text"
                      placeholder="Testimonial Image Link"
                      name="testimonialImage"
                      id="testimonialImage"
                      value={updateData.testimonialImage}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="TestimonialUpdate-four">
                    <label htmlFor="testimonialText">Testimonial Text</label>
                    <textarea
                      placeholder="Testimonial Text"
                      name="testimonialText"
                      id="testimonialText"
                      value={updateData.testimonialText}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  <div className="TestimonialUpdate-five">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>
                      {isAdding ? "Add Testimonial" : "Update Testimonial"}
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            isLoading ? <Loader /> : (
              <div className="Testimonial-three">
                <div className="Testimonial-three-header">
                  <h2>Testimonials Management</h2>
                  <button onClick={handleAddNew} className="add-testimonial-btn">
                    Add New Testimonial
                  </button>
                </div>
                <div className="Testimonial-three-in">
                  {Array.isArray(testimonialData) && testimonialData.length > 0 ? (
                    testimonialData.map((testimonial) => (
                      <div className="Testimonial-three-one" key={testimonial.id}>
                        <div className="Testimonial-three-one-img">
                          <img
                            src={testimonial.testimonial_image}
                            alt={testimonial.testimonial_name}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="Testimonial-three-one-content">
                          <div className="Testimonial-three-one-name">
                            <p>{testimonial.testimonial_name}</p>
                          </div>
                          <div className="Testimonial-three-one-title">
                            <p>{testimonial.testimonial_title}</p>
                          </div>
                          <div className="Testimonial-three-one-text">
                            <p>{testimonial.testimonial_text}</p>
                          </div>
                        </div>
                        <div className="Testimonial-three-one-actions">
                          <button onClick={() => handleClick(testimonial.id)}>Update</button>
                          <button 
                            onClick={() => handleDelete(testimonial.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-testimonials">
                      <p>No testimonials found. Add your first testimonial!</p>
                    </div>
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