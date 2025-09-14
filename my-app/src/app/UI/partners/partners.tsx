import React from "react";

import "./partners.css";


const partners = () => {

    const partnersData = [
        {
            name: "Partner 1",
            image: "https://i.imghippo.com/files/WquH3553mQ.png",
        },
        {
            name: "Partner 2",
            image: "https://i.imghippo.com/files/WquH3553mQ.png",
        },
        {
            name: "Partner 3",
            image: "https://i.imghippo.com/files/WquH3553mQ.png",
        },
        {
            name: "Partner 4",
            image: "https://i.imghippo.com/files/WquH3553mQ.png",
        },
        {
            name: "Partner 5",
            image: "https://i.imghippo.com/files/WquH3553mQ.png",
        },
        {
            name: "Partner 6",
            image: "https://i.imghippo.com/files/WquH3553mQ.png",
        },
        {
            name: "Partner 7",
            image: "https://i.imghippo.com/files/WquH3553mQ.png",
        },
        {
            name: "Partner 8",
            image: "https://i.imghippo.com/files/WquH3553mQ.png",
        },
        
    ];

    const duplicatedPartners = [...partnersData, ...partnersData];

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
            <div className="partners-scroll-container">
                <div className="partners-scroll-track">
                    {duplicatedPartners.map((partner, index) => (
                        <div key={`${partner.name}-${index}`} className="partners-one-in-box">
                            <img src={partner.image} alt={partner.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default partners;
