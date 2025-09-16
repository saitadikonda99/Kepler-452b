"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./partners.css";

const partners = () => {
    const [partnersData, setPartnersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get("/api/admin/partners", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setPartnersData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching partners:", error);
                setIsLoading(false);
                // Fallback to empty array if API fails
                setPartnersData([]);
            }
        };

        fetchPartners();
    }, []);

    const duplicatedPartners = [...partnersData, ...partnersData];

    if (isLoading) {
        return (
            <div className="PartnersComponent">
                <div className="PartnersComponent-in">
                    <div className="PartnersComponent-header cmn-heading">
                        <div className="breadcrumb">
                            <span>Home / Partners</span>
                        </div>
                        <h1>Partners</h1>
                    </div>
                    <div className="partners-loading">
                        <p>Loading partners...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="PartnersComponent">
            <div className="PartnersComponent-in">
                <div className="PartnersComponent-header cmn-heading">
                    <div className="breadcrumb">
                        <span>Home / Partners</span>
                    </div>
                    <h1>Partners</h1>
                </div>
                <div className="partners-one">
                    {partnersData.length > 0 ? (
                        <div className="partners-scroll-container">
                            <div className="partners-scroll-track">
                                {duplicatedPartners.map((partner, index) => (
                                    <div key={`${partner.partner_name}-${index}`} className="partners-one-in-box">
                                        {partner.partner_link ? (
                                            <a 
                                                href={partner.partner_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="partner-link"
                                            >
                                                <img 
                                                    src={partner.partner_image} 
                                                    alt={partner.partner_name}
                                                    title={partner.partner_name}
                                                />
                                            </a>
                                        ) : (
                                            <img 
                                                src={partner.partner_image} 
                                                alt={partner.partner_name}
                                                title={partner.partner_name}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="no-partners-message">
                            <p>No partners available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default partners;
