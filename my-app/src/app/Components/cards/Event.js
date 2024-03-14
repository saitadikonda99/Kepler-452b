import React from 'react'
import Image from 'next/image'

import './Event.css'

const Event = ({eventLink, eventName, eventDate, eventVenue}) => {
  return (
        <div className="EventComponent">
            <div className="EventComponent-in">
                <div className="Event-one">
                    <img 
                        src={eventLink}
                        alt="Event Image" 
                        width={300} 
                        height={300} 
                    />
                </div>
                <div className="Event-two">
                    <h2>{eventName}</h2>
                    <p>{eventDate}</p>
                    <p>{eventVenue}</p>
                </div>
            </div>
        </div>
  )
}

export default Event