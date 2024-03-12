"use client"
import React from 'react'
import { useState, useEffect } from 'react'

// imports start here 
import { faqData } from '@/data/FaqArray'
import Footer from './Components/Footer/page'
import Link from 'next/link'
import Event from '@/app/Components/cards/Event'
import { eventData } from '@/data/EventArray'
import Navbar from '@/app/Components/Navbar/Navbar'


// package imports start here
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// icons imports start here
import { FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const page = () => {



    const [expandedQuestions, setExpandedQuestions] = useState([])
    
    const toggleAnswer = (index) => {
        if (expandedQuestions.includes(index)) {
            setExpandedQuestions(expandedQuestions.filter((i) => i !== index))
        } else {
            setExpandedQuestions([...expandedQuestions, index])
        }
    }

    const handleExplore = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        })
    }


  return (

     <div className="HomeComponent">
        <div className="HomeComponent-in">

            {/* Section starts here */}

            <div className="Navbar">
                <Navbar />
            </div>

            {/* Section Hero starts here */}

            <div className="hero">
                <div className="hero-in">
                    <video
                        preload='auto'
                        autoPlay
                        loop
                        muted
                        style={{ width: "100%" }}
                        src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/HeroVideo%2FnewVideo.mp4?alt=media&token=d193f8c5-f11a-4a44-9f08-f5ead58b33d8"
                    />
                    <div className="here-text">
                        <h1>Student Activity Center</h1>
                        <p className="animate-text">Empowering Tomorrow's Leaders Today</p>
                    </div>
                    <div className="hero-explore" onClick={handleExplore}>
                        <p>Explore SAC</p> 
                    </div>
                </div>
            </div>

              {/* Section three starts here */}

              <div className="three">
                <div className="three-in">
                    <div className="three-one">
                        <div className="three-one-in">
                            <h1>A Department without Boundaries</h1>
                        </div>
                    </div>
                    <div className="three-two">
                        <div className="three-two-in">
                            <p>Designed to accommodate path-breaking ideas, problem-solving postulates, and artistic assertions, creating an environment that encourages innovation and experimentation</p>
                        </div>
                    </div>
                    <div className="three-three">
                        <div className="three-three-one">
                            <div className="three-three-in-one count-cm">
                                <h2>Collaborations</h2>
                                <CountUp start={0} duration={4} end={100} redraw={true}>
                                    {({ countUpRef, start }) => (
                                        <VisibilitySensor onChange={start} delayedCall>
                                        <h1 ref={countUpRef} />
                                        </VisibilitySensor>
                                    )}
                                </CountUp>
                            </div>
                            <div className="three-three-in-two count-cm">
                                <h2>Clubs</h2>
                                <CountUp start={1} duration={4} end={33} redraw={true}>
                                    {({ countUpRef, start }) => (
                                        <VisibilitySensor onChange={start} delayedCall>
                                        <h1 ref={countUpRef} />
                                        </VisibilitySensor>
                                    )}
                                </CountUp>
                            </div>
                            <div className="three-three-in-three count-cm">
                                <h2>Industry Mentors</h2>
                                <CountUp start={1} duration={4} end={50} redraw={true}>
                                    {({ countUpRef, start }) => (
                                        <VisibilitySensor onChange={start} delayedCall>
                                        <h1 ref={countUpRef} />
                                        </VisibilitySensor>
                                    )}
                                </CountUp>
                            </div>
                            <div className="three-three-in-one count-cm">
                                <h2>Actively Engaged Students</h2>
                                <CountUp start={1} duration={4} end={6000} redraw={true}>
                                    {({ countUpRef, start }) => (
                                        <VisibilitySensor onChange={start} delayedCall>
                                        <h1 ref={countUpRef} />
                                        </VisibilitySensor>
                                    )}
                                </CountUp>
                            </div>
                            <div className="three-three-in-two count-cm">
                                <h2>Events</h2>
                                <CountUp start={1} duration={4} end={534} redraw={true}>
                                    {({ countUpRef, start }) => (
                                        <VisibilitySensor onChange={start} delayedCall>
                                        <h1 ref={countUpRef} />
                                        </VisibilitySensor>
                                    )}
                                </CountUp>
                            </div>
                            <div className="three-three-in-three count-cm">
                                <h2>Projects</h2>
                                <CountUp start={1} duration={4} end={104} redraw={true}>
                                    {({ countUpRef, start }) => (
                                        <VisibilitySensor onChange={start} delayedCall>
                                        <h1 ref={countUpRef} />
                                        </VisibilitySensor>
                                    )}
                                </CountUp>
                            </div>
                        </div>
                        <div className="three-three-two">
                             
                        </div>
                    </div>
                    <div className="three-four">
                        <div className="three-four-in">

                        </div>
                    </div>
                </div>
            </div>





          {/* five starts here */}

          <div className="five">
            <div className="five-in">
              <div className="five-in-heading cmn-heading">

                <h1>5 Domains Infinite Possibilities</h1>
                <p>Preparing students to make meaningful contributions to society as engaged citizens and leaders in a complex world</p>
              </div>

              <div className="five-in-one">
                <div className="five-in-one-card">
                  <div className="five-in-one-card-in">
                    <div className="five-in-one-card-in-one">
                      <img src="https://sac.kluniversity.in/static/media/Technology.21fc96e5a4346c02af02.png" alt="" />
                    </div>
                    <div className="five-in-one-card-in-two">
                      <h2>Technology</h2>
                      <p>Explore cutting-edge tech trends and hands-on projects, from coding to robotics, in our vibrant tech enthusiast community.</p>

                      <Link href='/' className="five-in-one-card-in-two-link">
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="five-in-one-card">
                  <div className="five-in-one-card-in">
                    <div className="five-in-one-card-in-one">
                      <img src="https://sac.kluniversity.in/static/media/Technology.21fc96e5a4346c02af02.png" alt="" />
                    </div>
                    <div className="five-in-one-card-in-two">
                      <h2>Liberal Arts</h2>
                      <p>Explore cutting-edge tech trends and hands-on projects, from coding to robotics, in our vibrant tech enthusiast community.</p>

                      <Link href='/' className="five-in-one-card-in-two-link">
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="five-in-one-card">
                  <div className="five-in-one-card-in">
                    <div className="five-in-one-card-in-one">
                      <img src="https://sac.kluniversity.in/static/media/Technology.21fc96e5a4346c02af02.png" alt="" />
                    </div>
                    <div className="five-in-one-card-in-two">
                      <h2>Outreach</h2>
                      <p>Explore cutting-edge tech trends and hands-on projects, from coding to robotics, in our vibrant tech enthusiast community.</p>

                      <Link href='/' className="five-in-one-card-in-two-link">
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="five-in-one-card">
                  <div className="five-in-one-card-in">
                    <div className="five-in-one-card-in-one">
                      <img src="https://sac.kluniversity.in/static/media/Technology.21fc96e5a4346c02af02.png" alt="" />
                    </div>
                    <div className="five-in-one-card-in-two">
                      <h2>Entrepreneurship</h2>
                      <p>Explore cutting-edge tech trends and hands-on projects, from coding to robotics, in our vibrant tech enthusiast community.</p>

                      <Link href='/' className="five-in-one-card-in-two-link">
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="five-in-one-card">
                  <div className="five-in-one-card-in">
                    <div className="five-in-one-card-in-one">
                      <img src="https://sac.kluniversity.in/static/media/Technology.21fc96e5a4346c02af02.png" alt="" />
                    </div>
                    <div className="five-in-one-card-in-two">
                      <h2>Health</h2>
                      <p>Explore cutting-edge tech trends and hands-on projects, from coding to robotics, in our vibrant tech enthusiast community.</p>

                      <Link href='/' className="five-in-one-card-in-two-link">
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            

          {/* Section four starts here */}

          <div className="four">
            <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/GroupPhoto%2FGroupPhoto.png?alt=media&token=9b5d582f-fb7d-4628-b187-7af43fdd6932" alt="" />
          </div>

      

          <div className="seven">
            <div className="seven-in">
              <div className="seven-in-header cmn-heading">
                <div className="breadcrumb">
                  <span>Home / News</span>
                </div>
                <h1>News from Community</h1>
              </div>

              <div className="seven-in-one">
                <div className="seven-in-one-one">

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                        <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/News%2FZeroOne.png?alt=media&token=27811623-fd4a-4a46-aaf5-ed485cf9e9b6" alt="" />
                        <div className="seven-in-one-one-box-in-desc">
                          <h4>ZeroOne Code Club</h4>
                          <p>A picture perfect day at our workshop on Linux system administration. Swipe through to catch a glimpse of coding adventures from our workshop. We're proud of the skills and memories created</p>
                        </div>
                    </div>
                  </div>

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                          <div className="seven-in-one-one-box-in-one">
                            <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2FJiraUpdatd-2.png?alt=media&token=327fcc16-7b60-42bd-9e18-00b0f9cc5da1" alt="" />
                          </div>
                          <div className="seven-in-one-one-box-in-two">
                            <h4>AeroElectric & Automation Club</h4>
                            <p>Luminous SIEP E-bike challenge Season-4, 2024  </p>
                          </div>
                    </div>
                  </div>

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                          <div className="seven-in-one-one-box-in-one">
                            <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/News%2FJiraUpdatd.png?alt=media&token=9b13b2bc-5078-4cee-b4e3-268221aaf8b8" alt="" />
                          </div>
                          <div className="seven-in-one-one-box-in-two">
                            <h4>AeroElectric & Automation Club</h4>
                            <p>AITEM Go-Karting Championship Season-1, 2024 (AGKC)</p>
                          </div>
                    </div>
                  </div>
                </div>


                <div className="seven-in-one-one">

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                        <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/News%2FYoga.png?alt=media&token=c78edaf7-6094-4ec4-8088-33ed886aa53a" alt="" />
                        <div className="seven-in-one-one-box-in-desc">
                          <h4>Yoga Club</h4>
                          <p>Embark on a journey of serenity and vitality at Surabhi 2024, KL University, Vaddeswaram. Discover the enchanting allure of yoga on our captivating stage.</p>
                        </div>
                    </div>
                  </div>

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                          <div className="seven-in-one-one-box-in-one">
                            <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-0b5.appspot.com/o/Domains%2FJiraUpdatd-2.png?alt=media&token=327fcc16-7b60-42bd-9e18-00b0f9cc5da1" alt="" />
                          </div>
                          <div className="seven-in-one-one-box-in-two">
                            <h4>ZeroOne Code Club</h4>
                            <p>ZeroOne Code Club is a community of coders who are passionate</p>
                          </div>
                    </div>
                  </div>

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                          <div className="seven-in-one-one-box-in-one">
                            <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/News%2FYoga.png?alt=media&token=c78edaf7-6094-4ec4-8088-33ed886aaa" alt="" />
                          </div>
                          <div className="seven-in-one-one-box-in-two">
                            <h4>ZeroOne Code Club</h4>
                            <p>ZeroOne Code Club is a community of coders who are passionate</p>
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



            {/* Section eight starts here */}

            <div className="eight">
                <div className="eight-in">
                    <div className="breadcrumb">
                        <span>Home / Upcoming Events</span>
                    </div>
                    <div className="eight-in-head">
                        <h1>Upcoming Events</h1>
                    </div>
                    <div className="eight-one">
                        <div className="eight-one-in">
                            {eventData.map((event, index) => (
                                <div className="eight-event-one Event-cm" key={index}>
                                    <Event 
                                        eventImage={event.image}
                                        eventName={event.name}
                                        eventDate={event.date}
                                        eventVenue={event.venue}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section nine starts here */}

            <div className="nine">
                <div className="nine-in">
                    <div className="nine-one">
                        <h1>Experience the power of community. Join us today and be a part of something truly special.</h1>
                    </div>
                    <div className="nine-two">
                        <Link href='https://t.me/kl_sac' >Join the Community</Link>
                    </div>
                </div>
            </div>

          {/* thirteen starts here */}
          <div className="thirteen">
            <div className="thirteen-in">
              <div className="breadcrumb">
                <span>Home / Clubs</span>
              </div>

              <div className="cmn-heading">
                <h1>Explore Various Categories of Clubs</h1>
              </div>

              <div className="thirteen-in-one">
                <div className="thirteen-box">
                  <div className="thirteen-box-in">
                    <h2>TEC</h2>
                    <div className="thirteen-box-in-desc">
                      <p>Central Technology Clubs under SAC</p>
                    </div>
                    <div className="thirteen-box-in-one">
                      <div className="thirteen-box-in-one-in">
                        <Link href='/' className="thirteen-box-in-one-in-link">Aero Electric Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Agriculture Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Cryptography Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Cyber Security Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Design Sphere Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Luminary Digital Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Mobile E-Sports Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Prompt-o-Ventures</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Respawn (Game Development)</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Review Tech Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">WebApps Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Zero One Code Club</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="thirteen-box">
                  <div className="thirteen-box-in">
                    <h2>LCH</h2>
                    <div className="thirteen-box-in-desc">
                      <p>Liberal Arts, Creative Arts and Hobby Clubs</p>
                    </div>

                    <div className="thirteen-box-in-one">
                      <div className="thirteen-box-in-one-in">
                        <Link href='/' className="thirteen-box-in-one-in-link">Adventure Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Arts Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Dance Club (Fusion)</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Dance Club (NARTHANA)</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Dramatics Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">F.E.K (FASHION DESIGNING)</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Film Technology Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Handicrafts Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">KL Talks Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Literature Club (VACHAS)</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Music Club (Swara)</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Script Writing Club (Versatales)</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Social Media Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Standup Comedy</Link>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="thirteen-box">
                  <div className="thirteen-box-in">
                    <h2>ESO</h2>
                    <div className="thirteen-box-in-desc">
                      <p>Extension & Society Outreach Clubs</p>
                    </div>

                    <div className="thirteen-box-in-one">
                      <div className="thirteen-box-in-one-in">
                        <Link href='/' className="thirteen-box-in-one-in-link">CEA</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Electoral Literacy Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">KL SAC - Empower</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">KL-Radio Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Kutumb Society</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Ohana</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Smart Village Revolution</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Yuva Tourism Club</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="thirteen-box">
                  <div className="thirteen-box-in">
                    <h2>IIE</h2>
                    <div className="thirteen-box-in-desc">
                      <p>Innovation, Incubation and Entrepreneurship Clubs</p>
                    </div>

                    <div className="thirteen-box-in-one">
                      <div className="thirteen-box-in-one-in">
                        <Link href='/' className="thirteen-box-in-one-in-link">KL ACIC</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">KL TBI</Link>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="thirteen-box">
                  <div className="thirteen-box-in">
                    <h2>HWB</h2>
                    <div className="thirteen-box-in-desc">
                      <p>Health and Wellbeing Clubs</p>
                    </div>

                    <div className="thirteen-box-in-one">
                      <div className="thirteen-box-in-one-in">
                        <Link href='/' className="thirteen-box-in-one-in-link">Safe Life Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Spiritual Science Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">Yoga Club</Link>
                        <Link href='/' className="thirteen-box-in-one-in-link">YRC</Link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


            {/* Section Eleven starts here */}

            <div className="Eleven">
                <div className="Eleven-in">
                    <div className="breadcrumb">
                        <span>Home  / Socials</span>
                    </div>
                    <div className="Eleven-in-head cmh-heading">
                        <h1>Follow Student Activity Center at KLEF</h1>
                    </div>
                    <div className="Eleven-one">
                        <div className="Eleven-one-in">
                            <div className="Social">
                                <div className="Social-in">
                                    <div className="Social-one YT">
                                        <FaYoutube />   
                                    </div>
                                    <div className="Social-two">
                                        <h1>YouTube</h1>
                                    </div>
                                    <div className="Social-three">
                                        <p>Subscribe to join a community of creative developers and learn the latest in Google technology.</p>
                                    </div>
                                    <div className="Social-four">
                                        <Link href="https://www.youtube.com/@studentactivitycenter_klu">Subscribe</Link>        
                                    </div>
                                </div>
                            </div>
                            <div className="Social">
                                <div className="Social-in">
                                    <div className="Social-one Insta">
                                        <RiInstagramFill />   
                                    </div>
                                    <div className="Social-two">
                                        <h1>Instagram</h1>
                                    </div>
                                    <div className="Social-three">
                                        <p>Subscribe to join a community of creative developers and learn the latest in Google technology.</p>
                                    </div>
                                    <div className="Social-four">
                                        <Link href='https://www.instagram.com/klu_sac/'>Follow</Link>        
                                    </div>
                                </div>
                            </div>
                            <div className="Social">
                                <div className="Social-in">
                                    <div className="Social-one Linked">
                                        <FaLinkedin />   
                                    </div>
                                    <div className="Social-two">
                                        <h1>LinkedIn</h1>
                                    </div>
                                    <div className="Social-three">
                                        <p>Subscribe to join a community of creative developers and learn the latest in Google technology.</p>
                                    </div>
                                    <div className="Social-four">
                                        <Link href="https://www.linkedin.com/in/klu-sac/">Connect</Link>        
                                    </div>
                                </div>
                            </div>
                            <div className="Social">
                                <div className="Social-in">
                                    <div className="Social-one Twitter">
                                        <FaSquareXTwitter />   
                                    </div>
                                    <div className="Social-two">
                                        <h1>Twitter</h1>
                                    </div>
                                    <div className="Social-three">
                                        <p>Subscribe to join a community of creative developers and learn the latest in Google technology.</p>
                                    </div>
                                    <div className="Social-four">
                                        <Link href="https://twitter.com/klsac_vja">Follow</Link>        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                


            {/* Section Twelve starts here */}

            <div className="Twelve">
                <div className="Twelve-in">
                    <div className="Twelve-in-head cmh-heading">
                        <div className="breadcrumb">
                          <span>Home  / FAQs</span>
                        </div>
                        <h1>Frequently Asked Questions</h1>
                    </div>
                    <div className="Twelve-one">
                        <div className="Twelve-one-in">
                            {faqData.map((faq, index) => (
                                <div key={index} className="Twelve-one-in-item">
                                    <div className="Twelve-one-in-item-ques">
                                        <p onClick={() => toggleAnswer(index)}>{faq.question}</p>
                                    </div>
                                    {expandedQuestions.includes(index) && (
                                        <div className="Twelve-one-in-item-ans">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



            <div className="Footer">
                <Footer />
            </div>
                            
        </div>                                    
    </div>

  )
}

export default page