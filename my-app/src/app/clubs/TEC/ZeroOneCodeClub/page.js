// "use client";
// import React from 'react'
// import { useState } from 'react'
// import Link from 'next/link'

// import './page.css'

// import Navbar from '../../components/navbar/ClubNavbar'
// import Footer from '../../../Components/Footer/page'
// // import { ClubsArray } from '../../../../data/ClubsArray'

// // import start here 
// import { MdLocalActivity } from "react-icons/md";
// import { FaArrowRightLong } from "react-icons/fa6";


// const page = () => {


//     const [option, setOption] = useState(1);


//     const handleClick = (num) => {
//         setOption(num);
//     }



//   return (
//         <div className="ClubPageComponent">
//             <div className="ClubPageComponent-in">
//                 <div className="ClubPageNavbar">
//                     <Navbar ClubName={ClubsArray[0].clubName} ClubImg={ClubsArray[0].clubImg} />
//                 </div>



                

//                 <div className="club-hero">
//                     <div className="club-hero-in">
//                             <img className='clubpage-hero-in-img' src={ClubsArray[0].heroImg} alt="" />

//                             <div className="club-hero-in-description">
//                                 <h1>Docker Builds: Now Lightning Fast</h1>
//                                 <h3>Announcing Docker Build Cloud general availability</h3>

//                                 <a href="fonts.google.com">Join the community</a>
//                             </div>
//                     </div>
//                 </div>




//                         <div className="Club-two">
//                             <div className="Club-two-one">
//                                 <div className="Club-two-one-one">
//                                     <p>What is {ClubsArray[0].clubName}?</p>
//                                 </div>
//                                 <div className="Club-two-one-two">
//                                     <h1>{ClubsArray[0].About}</h1>
//                                 </div>
//                                 <div className="Club-two-one-three">
//                                     <p>{ClubsArray[0].AboutDes}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="Club-three">
//                             <div className="Club-three-one">
//                                  <div className="Club-three-options">
//                                     <div className="C-option-one c-op-cm">
//                                         <div className="C-option-one-in c-op-cm-in" onClick={() => handleClick(1)}>
//                                             <MdLocalActivity className='icon-op'/>
//                                             <p>Glimpse</p>
//                                         </div>
//                                     </div>
//                                     <div className="C-option-two c-op-cm">
//                                         <div className="C-option-two-in c-op-cm-in" onClick={() => handleClick(2)}>
//                                             <MdLocalActivity className='icon-op' />
//                                             <p>Share</p>
//                                         </div>
//                                     </div>
//                                     <div className="C-option-three c-op-cm">
//                                         <div className="C-option-three-in c-op-cm-in" onClick={() => handleClick(3)}>
//                                             <MdLocalActivity className='icon-op' />
//                                             <p>Activities</p>
//                                         </div>
//                                     </div>
//                                     <div className="C-option-four c-op-cm">
//                                         <div className="C-option-four-in c-op-cm-in" onClick={() => handleClick(4)}>
//                                             <MdLocalActivity className='icon-op' />
//                                             <p>Team</p>
//                                         </div>
//                                     </div>
//                                  </div>
//                             </div>
//                         </div>

//                         <div className="Club-four">
//                             <div className="Club-four-in">

//                                 <div className="Club-four-one" id={option == 1 ? "" : "hide-club"}>
//                                     <div className="Club-four-one-in">
//                                         <p>one</p>
//                                     </div>
//                                 </div>
                                
//                                 <div className="Club-four-two" id={option == 2 ? "" : "hide-club"}>
//                                     <div className="Club-four-two-in">
//                                         <p>two</p>
//                                     </div>
//                                 </div>

//                                 <div className="Club-four-three" id={option == 3 ? "" : "hide-club"}>
//                                     <div className="Club-four-three-in">
//                                         <p>three</p>
//                                     </div>
//                                 </div>

//                                 <div className="Club-four-four" id={option == 4 ? "" : "hide-club"}>
//                                     <div className="Club-four-four-in">
//                                         <p>four</p>
//                                     </div>
//                                 </div>


//                             </div>
//                         </div>



//                         <div className="Club-five">
//                             <div className="Club-five-in">
//                                 <div className="Club-five-one">
//                                     <p>{ClubsArray[0].clubName}</p>
//                                     <h1>Stats That Matter.</h1>
//                                 </div>
//                                 <div className="Club-five-two">
//                                     <div className="Club-five-two-in">
//                                         <div className="Club-five-two-one cm-club-stats">
//                                             <h1>300+</h1>
//                                             <p>Members</p>
//                                         </div>
//                                         <div className="Club-five-two-two cm-club-stats">
//                                             <h1>100+</h1>
//                                             <p>Activities</p>
//                                         </div>
//                                         <div className="Club-five-two-three cm-club-stats">
//                                             <h1>5+</h1>
//                                             <p>Projects</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="ClubPage-six">
//                             <div className="ClubPage-six-in">
//                                 <div className="ClubPage-six-one">
//                                     <p>Connect</p>
//                                 </div>
//                                 <div className="ClubPage-six-two">
//                                     <h1>Meet the community</h1>
//                                 </div>
//                                 <div className="ClubPage-six-three">
//                                     <p>Stop by any of the hundreds of meetups around the world for in-person banter or join our Slack and Discourse for virtual peer support. Our Docker Captains are also a great source of developer insight and expertise.</p>
//                                 </div>
//                                 <div className="ClubPage-six-four">
//                                     <Link href='/'>Connect with us</Link>
//                                     <FaArrowRightLong className='connect-icon'/>    
//                                 </div>

//                                 <div className="ClubPage-six-five">
//                                     <div className="ClubPage-six-five-in">
//                                         <div className="ClubPage-six-five-one">
//                                             <div className="ClubPage-six-five-one-in">
//                                                 <h1>Choose a subscription that's right for you</h1>
//                                                 <p>Find your perfect balance of collaboration, security, and support with a Docker subscription.</p>
//                                             </div>
//                                         </div>
//                                         <div className="ClubPage-six-five-two">
//                                             <button>Find Pricing</button>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>


                    
//                 </div>

//                 <div className="ClubPageFooter">
//                     <Footer />
//                 </div>
//         </div>
//    )
// }

// export default page