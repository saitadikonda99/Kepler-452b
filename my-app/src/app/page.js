"use client"
import React from 'react'
import { useState } from 'react'

// imports start here 
import { faqData } from '@/data/FaqArray'
import Footer from './Components/Footer/page'
import Link from 'next/link'
import Event from '@/app/Components/cards/Event'
import { eventData } from '@/data/EventArray'


// package imports start here
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';



const page = () => {

    const [expandedQuestions, setExpandedQuestions] = useState([])
    
    const toggleAnswer = (index) => {
        if (expandedQuestions.includes(index)) {
            setExpandedQuestions(expandedQuestions.filter((i) => i !== index))
        } else {
            setExpandedQuestions([...expandedQuestions, index])
        }
    }


  return (

     <div className="HomeComponent">
        <div className="HomeComponent-in">

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


            {/* Section eight starts here */}

            <div className="eight">
                <div className="eight-in">
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
                        <button>Join the Community</button>
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
                        <Link href='/' className="thirteen-box-in-one-in-link">Film Making Club</Link>
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