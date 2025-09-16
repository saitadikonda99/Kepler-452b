"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import "./page.css";

import Dashboard from "../dashboard/dashboard";
import Loader from "../../../animation/Loading";

const Page = () => {
  const [partnerData, setPartnerData] = useState([]);
  const [show, setShow] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [updateData, setUpdateData] = useState({
    partnerId: null,
    partnerName: "",
    partnerImage: "",
    partnerLink: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (partnerId) => {
    const selectedPartner = partnerData.find((partner) => partner.id === partnerId);

    setUpdateData({
      partnerId: selectedPartner.id,
      partnerName: selectedPartner.partner_name,
      partnerImage: selectedPartner.partner_image,
      partnerLink: selectedPartner.partner_link || "",
    });

    setIsAdding(false);
    setShow(true);
  };

  const handleAddNew = () => {
    setUpdateData({
      partnerId: null,
      partnerName: "",
      partnerImage: "",
      partnerLink: "",
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
      const response = await axios.post("/api/admin/partners", updateData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoading(false);
        toast.success(isAdding ? "Partner added successfully!" : "Partner updated successfully!");
        setShow(false);
        setIsAdding(false);

        if (isAdding) {
          fetchData();
        } else {
          setPartnerData((prevData) =>
            prevData.map((partner) =>
              partner.id === updateData.partnerId
                ? {
                    ...partner,
                    partner_name: updateData.partnerName,
                    partner_image: updateData.partnerImage,
                    partner_link: updateData.partnerLink
                  }
                : partner
            )
          );
        }
      } else {
        setIsLoading(false);
        toast.error(response.data.message || `Failed to ${isAdding ? 'add' : 'update'} partner`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || `Error ${isAdding ? 'adding' : 'updating'} the partner`);
    }
  };

  const handleDelete = async (partnerId) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/admin/partners?id=${partnerId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoading(false);
        toast.success("Partner deleted successfully!");
        
        setPartnerData((prevData) =>
          prevData.filter((partner) => partner.id !== partnerId)
        );
      } else {
        setIsLoading(false);
        toast.error(response.data.message || "Failed to delete partner");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Error deleting the partner");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/admin/partners", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setPartnerData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching partners:", error);
      toast.error(error.response?.data?.message || "Failed to fetch partners");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="PartnerComponent">
        <div className="PartnerComponent-in">
          <div className="Partner-one">
            <div className="Partner-one-one">
              <p>
                Instructions to update partner images{" "}
                <MdOutlineIntegrationInstructions className="Partner-icon" />
              </p>
            </div>
            <div className="Partner-one-two">
              <div className="Partner-one-two-one">
                <VscDebugBreakpointLog />
                <p>
                  Resize Image: Use the provided Canva link to resize the image
                  to the optimal dimensions for website display. 
                </p>
                <Link href="https://www.canva.com/design/DAGVOZTJzh8/Jlj-pRBJ7Qt87h9OdTMTlA/view?utm_content=DAGVOZTJzh8&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" target="_blank">Canva Link</Link>
              </div>

              <div className="Partner-one-two-one">
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
              <div className="Partner-two">
                <div className="Partner-two-in">
                  <div className="PartnerUpdate-one">
                    <label htmlFor="partnerName">Partner Name</label>
                    <input
                      type="text"
                      placeholder="Partner Name"
                      name="partnerName"
                      id="partnerName"
                      value={updateData.partnerName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="PartnerUpdate-two">
                    <label htmlFor="partnerImage">Partner Image Link</label>
                    <input
                      type="text"
                      placeholder="Partner Image Link"
                      name="partnerImage"
                      id="partnerImage"
                      value={updateData.partnerImage}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="PartnerUpdate-three">
                    <label htmlFor="partnerLink">Partner Website Link (Optional)</label>
                    <input
                      type="text"
                      placeholder="Partner Website Link"
                      name="partnerLink"
                      id="partnerLink"
                      value={updateData.partnerLink}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="PartnerUpdate-four">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit}>
                      {isAdding ? "Add Partner" : "Update Partner"}
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            isLoading ? <Loader /> : (
              <div className="Partner-three">
                <div className="Partner-three-header">
                  <h2>Partners Management</h2>
                  <button onClick={handleAddNew} className="add-partner-btn">
                    Add New Partner
                  </button>
                </div>
                <div className="Partner-three-in">
                  {Array.isArray(partnerData) && partnerData.length > 0 ? (
                    partnerData.map((partner) => (
                      <div className="Partner-three-one" key={partner.id}>
                        <div className="Partner-three-one-img">
                          <img
                            src={partner.partner_image}
                            alt={partner.partner_name}
                            width={200}
                            height={150}
                          />
                        </div>
                        <div className="Partner-three-one-name">
                          <p>{partner.partner_name}</p>
                        </div>
                        {partner.partner_link && (
                          <div className="Partner-three-one-link">
                            <a 
                              href={partner.partner_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Visit Website
                            </a>
                          </div>
                        )}
                        <div className="Partner-three-one-actions">
                          <button onClick={() => handleClick(partner.id)}>Update</button>
                          <button 
                            onClick={() => handleDelete(partner.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-partners">
                      <p>No partners found. Add your first partner!</p>
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
