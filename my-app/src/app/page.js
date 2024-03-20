"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

// imports start here 
import { faqData } from '../data/FaqArray';
import Footer from './Components/Footer/page'
import Link from 'next/link'
import Event from './Components/cards/Event'
// import { eventData } from '../data/EventArray'
import Navbar from './Components/Navbar/Navbar'


// package imports start here
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// icons imports start here
import { FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';


const page = () => {

    const [expandedQuestions, setExpandedQuestions] = useState([])
    const [eventData, setEventData] = useState([])
    const [newsLandscape, setNewsLandscape] = useState([])
    const [newsPortrait, setNewsPortrait] = useState([])
    
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

    useEffect(() => {
        const handleEvent = async () => {
          try {
            const response = await axios.get('/api/events');
            setEventData(response.data);
          } catch (error) {
            console.log(error);
          }
        };

        const handleNewsLandscape = async () => {
          try {
            const response = await axios.get('/api/news/landscape');
            setNewsLandscape(response.data);
          }
          catch (error) {
            console.log(error);
          }
        };

        const handleNewsPortrait = async () => {
          try {
            const response = await axios.get('/api/news/portrait');
            setNewsPortrait(response.data);
          }
          catch (error) {
            console.log(error);
          }
        };

        handleEvent();
        handleNewsLandscape();
        handleNewsPortrait();

      }, []);
    


  return (

     <div className="HomeComponent">
        <div className="HomeComponent-in">

{/* ------------------------------ navigation bar ----------------------------------- */}

            <div className="Navbar">
                <Navbar />
            </div>

{/* ------------------------------ navigation bar ----------------------------------- */}

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

{/* ------------------------------ section three ----------------------------------- */}

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






{/* ------------------------------ section five ----------------------------------- */}
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
                      <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F1.png?alt=media&token=3130a20e-b803-45bb-b28d-02c97243555c" alt="" />
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
                      <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F2.png?alt=media&token=6aa75a30-7215-466c-8f5e-2fbc66800ba9" alt="" />
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
                      <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F3.png?alt=media&token=606f9e07-78e3-4d00-b939-2800d378df32" alt="" />
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
                      <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F4.png?alt=media&token=8cf75e7e-fad4-47b4-81de-db358f9c57a9" alt="" />
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
                      <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Domains%2F5.png?alt=media&token=f357d924-a71d-476a-afc9-eccbd8103034" alt="" />
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
            

{/* ------------------------------ section four ----------------------------------- */}

          <div className="four">
            <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/GroupPhoto%2FGroupPhoto.png?alt=media&token=9b5d582f-fb7d-4628-b187-7af43fdd6932" alt="" />
          </div>

      
{/* ------------------------------ section seven ----------------------------------- */}
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
                        <img src={newsLandscape[0]?.newsLink} alt="" />
                        <div className="seven-in-one-one-box-in-desc">
                          <h4>{newsLandscape[0]?.clubName}</h4>
                          <p>{newsLandscape[0]?.newsContent}</p>
                        </div>
                    </div>
                  </div>


                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                          <div className="seven-in-one-one-box-in-one">
                            <img src={newsPortrait[0]?.newsLink} alt="" />
                          </div>
                          <div className="seven-in-one-one-box-in-two">
                            <h4>{newsPortrait[0]?.clubName}</h4>
                            <p>{newsPortrait[0]?.newsContent}</p>
                          </div>
                    </div>
                  </div>

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                         <div className="seven-in-one-one-box-in-one">
                            <img src={newsPortrait[1]?.newsLink} alt="" />
                          </div>
                          <div className="seven-in-one-one-box-in-two">
                            <h4>{newsPortrait[1]?.clubName}</h4>
                            <p>{newsPortrait[1]?.newsContent}</p>
                          </div>
                    </div>
                  </div>
                </div>


                <div className="seven-in-one-one">

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                        <img src={newsLandscape[1]?.newsLink} alt="" />
                        <div className="seven-in-one-one-box-in-desc">
                          <h4>{newsLandscape[1]?.clubName}</h4>
                          <p>{newsLandscape[1]?.newsContent}</p>
                        </div>
                    </div>
                  </div>

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                         <div className="seven-in-one-one-box-in-one">
                            <img src={newsPortrait[2]?.newsLink} alt="" />
                          </div>
                          <div className="seven-in-one-one-box-in-two">
                            <h4>{newsPortrait[2]?.clubName}</h4>
                            <p>{newsPortrait[2]?.newsContent}</p>
                          </div>
                    </div>
                  </div>

                  <div className="seven-in-one-one-box">
                    <div className="seven-in-one-one-box-in">
                          <div className="seven-in-one-one-box-in-one">
                            <img src={newsPortrait[3]?.newsLink} alt="" />
                          </div>
                          <div className="seven-in-one-one-box-in-two">
                            <h4>{newsPortrait[3]?.clubName}</h4>
                            <p>{newsPortrait[3]?.newsContent}</p>
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



{/* ------------------------------ section eight ----------------------------------- */}

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
                        {eventData?.map((event, index) => (
                            <div className="eight-event-one Event-cm" key={index}>
                                <Event
                                    eventLink={event.eventLink}
                                    eventName={event.eventName}
                                    eventDate={event.eventDate}
                                    eventVenue={event.eventVenue}
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>

{/* ------------------------------ section nine ----------------------------------- */}

            <div className="nine">
              <div className="nine-in">
                <div className="nine-in-one">
                  <div className="nine-in-one-in">
                    <h4>Think like a Champion</h4>
                    <h1>Unlocking your Creativity with SAC</h1>
                    <p>We got you covered! Get started with the basics with our guide to containers, including what they are, their advantage over virtual machines, and more.</p>
                    <Link className='nine-in-one-link' href='/'>Read the container guide</Link>
                  </div>
                </div>
                <div className="nine-in-two">
                  <div className="nine-in-two-in">
                    <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Home%2FInnovation.jpg?alt=media&token=8ada740c-bf29-4b45-82d1-c9f329a5c62b" alt="" />
                  </div>
                </div>
              </div>
            </div>


            <div className="fourteen">
              
              <div className="fourteen-in">
                <div className="fourteen-in-header">
                  <h4>How to get started</h4>
                  <h1>Your path to accelerated application development starts here.</h1>
                </div>
                <div className="fourteen-in-one">

                  <div className="fourteen-in-one-box">
                    <div className="fourteen-in-one-box-in">
                      <div className="fourteen-in-one-box-in-one">
                        <FaLinkedin className='fourteen-in-one-box-in-one-icon' />  
                      </div>
                      <div className="fourteen-in-one-box-in-two">
                        <h3>Start Exploring Categories</h3>
                      </div>
                      <div className="fourteen-in-one-box-in-three">
                        <p>Learn how to install Docker for Mac, Windows, or Linux and explore our developer tools.</p>
                      </div>
                      <div className="fourteen-in-one-box-in-four">
                        <Link className='fourteen-in-one-box-in-four-link' href='/'>Get Started</Link>
                      </div>
                    </div>
                  </div>

                  <div className="fourteen-in-one-box">
                    <div className="fourteen-in-one-box-in">
                      <div className="fourteen-in-one-box-in-one">
                        <FaLinkedin className='fourteen-in-one-box-in-one-icon' />  
                      </div>
                      <div className="fourteen-in-one-box-in-two">
                        <h3>Start Exploring Categories</h3>
                      </div>
                      <div className="fourteen-in-one-box-in-three">
                        <p>Learn how to install Docker for Mac, Windows, or Linux and explore our developer tools.</p>
                      </div>
                      <div className="fourteen-in-one-box-in-four">
                        <Link className='fourteen-in-one-box-in-four-link' href='/'>Get Started</Link>
                      </div>
                    </div>
                  </div>

                  <div className="fourteen-in-one-box">
                    <div className="fourteen-in-one-box-in">
                      <div className="fourteen-in-one-box-in-one">
                        <FaLinkedin className='fourteen-in-one-box-in-one-icon' />  
                      </div>
                      <div className="fourteen-in-one-box-in-two">
                        <h3>Start Exploring Categories</h3>
                      </div>
                      <div className="fourteen-in-one-box-in-three">
                        <p>Learn how to install Docker for Mac, Windows, or Linux and explore our developer tools.</p>
                      </div>
                      <div className="fourteen-in-one-box-in-four">
                        <Link className='fourteen-in-one-box-in-four-link' href='/'>Get Started</Link>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          


{/* ------------------------------ section eleven ----------------------------------- */}

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
                


{/* ------------------------------ section twelve ----------------------------------- */}

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
                            {faqData?.map((faq, index) => (
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

{/* ------------------------------ section thirteen ----------------------------------- */}
          <div className="thirteen clubs-list">
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
                        <Link href='/clubs/tec/zeroonecodeclub' className="thirteen-box-in-one-in-link">ZeroOne Code Club</Link>
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


{/* ------------------------------ Footer section ----------------------------------- */}

            <div className="Footer">
                <Footer />
            </div>
                            
        </div>                                    
    </div>

  )
}

export default page