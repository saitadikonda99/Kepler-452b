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
                <div className="ClubPage">
                    <div className="ClubPage-in">

                        <div className="Club-one">
                            <div className="Club-one-one">
                                <img src={ClubsArray[0].heroImg} alt="" />
                            </div>
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