import React from "react";

import "./testimonials.css";

import { BiSolidQuoteAltLeft } from "react-icons/bi";
import Image from "next/image";

const testimonials = () => {
  const testimonialsData = [
    {
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      name: "Pavan karthik Madadapu",
      title: "CEO @ Karthik Creations",
      description:
        "Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.",
    },
    {
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      name: "Isabella Rodriguez",
      title: "CEO of ABC Company",
      description:
        "Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.",
    },
    {
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      name: "Gabrielle Williams",
      title: "CEO of ABC Company",
      description:
        "Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.",
    },
    {
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      name: "Samantha Johnson",
      title: "CEO of ABC Company",
      description:
        "Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable creative agency.",
    },
    {
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      name: "Natalie Martinez",
      title: "CEO and Co-founder of ABC Company",
      description:
        "From concept to execution, their creativity knows no bounds - a game-changer for our brand's success.",
    },
    {
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      name: "Victoria Thompson",
      title: "CEO and Co-founder of ABC Company",
      description:
        "A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended for any project.",
    },
    {
      image: "https://i.imghippo.com/files/KHQV5981JOM.png",
      name: "John Peter",
      title: "CEO and Co-founder of ABC Company",
      description:
        "Their team's artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.",
    },
  ];

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

            <div className="testimonials-scroll-row testimonials-scroll-left">
              <div className="testimonials-scroll-content">
                {[
                  ...testimonialsData,
                  ...testimonialsData,
                  ...testimonialsData,
                ].map((testimonial, index) => (
                  <TestimonialsCard key={`left-${index}`} {...testimonial} />
                ))}
              </div>
            </div>

            <div className="testimonials-scroll-row testimonials-scroll-right">
              <div className="testimonials-scroll-content">
                {[...testimonialsData, ...testimonialsData, ...testimonialsData]
                  .reverse()
                  .map((testimonial, index) => (
                    <TestimonialsCard key={`right-${index}`} {...testimonial} />
                  ))}
              </div>
            </div>
            
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
