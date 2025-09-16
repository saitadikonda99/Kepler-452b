"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./testimonials.css";

import { BiSolidQuoteAltLeft } from "react-icons/bi";
import Image from "next/image";

const testimonials = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/admin/testimonials", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setTestimonialsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setIsLoading(false);
        setTestimonialsData([]);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <div className="TestimonialsComponent">
        <div className="TestimonialsComponent-in">
          <div className="TestimonialsComponent-header cmn-heading">
            <div className="breadcrumb">
              <span>Home / Testimonials</span>
            </div>
            <h1>Discover what others are saying about us.</h1>
          </div>
          <div className="testimonials-loading">
            <p>Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="TestimonialsComponent">
      <div className="TestimonialsComponent-in">
        <div className="TestimonialsComponent-header cmn-heading">
          <div className="breadcrumb">
            <span>Home / Testimonials</span>
          </div>
          <h1>Discover what others are saying about us.</h1>
        </div>
        <div className="testimonials-scroll-container">
          <div className="testimonials-scroll-container">
            {testimonialsData.length > 0 ? (
              <>
                <div className="testimonials-scroll-row testimonials-scroll-left">
                  <div className="testimonials-scroll-content">
                    {[
                      ...testimonialsData,
                      ...testimonialsData,
                      ...testimonialsData,
                    ].map((testimonial, index) => (
                      <TestimonialsCard 
                        key={`left-${index}`} 
                        image={testimonial.testimonial_image}
                        name={testimonial.testimonial_name}
                        title={testimonial.testimonial_title}
                        description={testimonial.testimonial_text}
                      />
                    ))}
                  </div>
                </div>

                <div className="testimonials-scroll-row testimonials-scroll-right">
                  <div className="testimonials-scroll-content">
                    {[...testimonialsData, ...testimonialsData, ...testimonialsData]
                      .reverse()
                      .map((testimonial, index) => (
                        <TestimonialsCard 
                          key={`right-${index}`} 
                          image={testimonial.testimonial_image}
                          name={testimonial.testimonial_name}
                          title={testimonial.testimonial_title}
                          description={testimonial.testimonial_text}
                        />
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="no-testimonials-message">
                <p>No testimonials available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default testimonials;

const TestimonialsCard = ({ image, name, title, description }) => {
  return (
    <div className="TestimonialsCard">
      <div className="TestimonialsCard-in">
        <div className="testimonialsCard-one">
          <BiSolidQuoteAltLeft />
        </div>
        <div className="testimonialsCard-two">
          <p>{description}</p>
        </div>
        <div className="testimonialsCard-three">
          <div className="testimonialsCard-three-one">
            <Image src={image} alt="Testimonials" width={100} height={100} />
          </div>
          <div className="testimonialsCard-three-two">
            <p className="testimonialsCard-three-two-name">{name}</p>
            <p className="testimonialsCard-three-two-title">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
