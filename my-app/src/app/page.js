"use client"
import React from 'react'
import { useState } from 'react'

// imports start here 
import { faqData } from '@/data/FaqArray'
import Footer from './Components/Footer/page'
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


            {/* Section Twelve starts here */}

            <div className="Twelve">
                <div className="Twelve-in">
                    <div className="Twelve-in-head">
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

            {/* Section Footer starts here */}

            <div className="Footer">
                <Footer />
            </div>
                            
        </div>                                    
    </div>

  )
}

export default page