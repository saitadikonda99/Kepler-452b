"use client"
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import Link from 'next/link'


import './page.css'


const page = () => {

    const [eventData, setEventData] = useState({
        eventLink: '',
        eventName: '',
        eventDate: '',
        eventVenue: '',
    })

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/events', eventData, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
            )

            // alert(response.data.message)

            if(response.data.status === 201) {
                toast.success(response.data.message)
            } 
            if(response.data.status === 400) {
                toast.error(response.data.message)
            }
            if(response.data.status === 500) {
                toast.error(response.data.message)
            }
            

        } catch (error) {
            toast.error(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEventData({
            ...eventData,
            [name]: value
        })
    }



  return (
        <div className="EventsComponent">
            <div className="EventsComponent-in">
                <div className="Events-one">
                    <h1>Events Upload</h1>
                    <p>Please carefully update the event links</p>
                </div>
                <div className="Events-two">
                    <div className="Events-two-in">
                        <div className="Events-in-one">
                            <input 
                                type="text"
                                placeholder="Event poster Link"
                                name='eventLink'
                                value={eventData.eventLink}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="Events-in-two">
                            <input 
                                type="text"
                                placeholder="Event Name"
                                name='eventName'
                                value={eventData.eventName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="Events-in-three">
                            <input 
                                type="date"
                                placeholder="Event date"
                                name='eventDate'
                                value={eventData.eventDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="Events-in-four">
                            <input 
                                type="text"
                                placeholder="Event Venue"
                                name='eventVenue'
                                value={eventData.eventVenue}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="Events-in-five">
                            <button onClick={handleSubmit}>Enter</button>
                        </div>
                        <div className="Events-in-six">
                            <Link href='/admin/dashboard'>Go Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default page