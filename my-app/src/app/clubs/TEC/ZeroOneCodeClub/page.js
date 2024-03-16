import React from 'react'


import './page.css'

// imports start here 
import Navbar from '../../components/navbar/ClubNavbar'
import Footer from '../../../Components/Footer/page'
import { ClubsArray } from '../../../../data/ClubsArray'


const page = () => {
  return (
        <div className="ClubPageComponent">
            <div className="ClubPageComponent-in">
                <div className="ClubPageNavbar">
                    <Navbar ClubName={ClubsArray[0].clubName} ClubImg={ClubsArray[0].clubImg} />
                </div>

                <div className="clubpage-hero">
                    <div className="clubpage-hero-in">
                        <img className='clubpage-hero-in-img' src={ClubsArray[0].heroImg} alt="" />
                    </div>

                    <div className="clubpage-hero-one">
                        <div className="clubpage-hero-one-in">
                            <h1>Docker Builds: Now Lightning Fast</h1>
                            <h3>Announcing Docker Build Cloud general availability</h3>
                        </div>
                    </div>
                </div>

                <div className="ClubPageFooter">
                    <Footer />
                </div>
            </div>
        </div>
   )
}

export default page