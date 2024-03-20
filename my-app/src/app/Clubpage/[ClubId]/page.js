import React from 'react';
import './page.css';

import Footer from '../../Components/Footer/page';
import { ClubArray } from '../../../data/ClubArray'

const Page = ({ params }) => {

  const club = ClubArray[params.ClubId];

  return (
    <div className='club-page'>
        <div className="club-page-in">
            <div className="club-page-header">
                <div className="club-page-header-in">
                    <div className="club-page-header-in-one">
                        <h3>{club?.ClubName}</h3>
                        <h1> {club?.ClubName}</h1>
                        <h4>{club?.Manager}</h4>
                    </div>
                    <div className="club-page-header-in-two">
                        <h1>{club?.Department}</h1>
                        <span>{club?.DepartmentDescription}</span>
                    </div>
                </div>
            </div>

            <div className="club-page-in-one">
                <div className="club-page-in-one-one">
                    <img src={club?.ClubImg} alt={club?.ClubName} />
                </div>
                <div className="club-page-in-one-two">
                    <div className="club-page-in-one-two-in">
                        <h2>What is {club?.ClubName}?</h2>
                        <p>{club?.Description}</p>
                    </div>
                </div>

            </div>
            <div className="club-page-last">
            <h4>{club?.Rights}</h4>
            </div>
        </div>

        <Footer />

    </div>
  )
}

export default Page;
