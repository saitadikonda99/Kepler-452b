"use client"
import React from 'react'
import { useState } from 'react'

// imports start here 
import { faqData } from '@/data/FaqArray'
import Footer from './Components/Footer/page'


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