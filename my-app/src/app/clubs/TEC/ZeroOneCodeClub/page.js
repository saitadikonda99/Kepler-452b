import React from 'react'


// imports start here 
import Navbar from '../../components/navbar/page'
import Footer from '../../../Components/Footer/page'


const page = () => {
  return (
        <div className="ClubPageComponent">
            <div className="ClubPageComponent-in">
                <div className="ClubPageNavbar">
                    <Navbar ClubName="ZeroOne CodeClub"/>
                </div>
                <div className="ClubPage">
                    <div className="ClubPage-in">

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