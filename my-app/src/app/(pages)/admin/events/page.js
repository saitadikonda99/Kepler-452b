"use client"
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';


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
                    <input 
                        type="text"
                        placeholder="Event poster Link"
                        name='eventLink'
                        value={eventData.eventLink}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Event Name"
                        name='eventName'
                        value={eventData.eventName}
                        onChange={handleChange}
                    />
                    <input 
                        type="date"
                        placeholder="Event date"
                        name='eventDate'
                        value={eventData.eventDate}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Event Venue"
                        name='eventVenue'
                        value={eventData.eventVenue}
                        onChange={handleChange}
                    />
                     
                    <button onClick={handleSubmit}>Enter</button>
                </div>
            </div>
        </div>
  )
}

export default page