"use client"
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast';

const page = () => {

    const[newsData, setNewsData] = useState({
        newsLink: '',
        clubName: '',
        newsContent: '',
    })


    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/news/landscape', newsData, {
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
        setNewsData({
            ...newsData,
            [e.target.name]: e.target.value
        })
    }


  return (
        <div className="NewsLandScapeComponent">
            <div className="NewsLandScapeComponent-in">
                <div className="NewsLandScape-one">
                    <h1>News LandScape</h1>
                    <input 
                        type="text" 
                        placeholder="NewsLink"
                        name='newsLink'
                        value={newsData.newsLink}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder="ClubName"
                        name='clubName'
                        value={newsData.clubName}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder="NewsContent"
                        name='newsContent'
                        value={newsData.newsContent}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
  )
}

export default page