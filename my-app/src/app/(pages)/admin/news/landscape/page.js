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
                    <h1>News Upload</h1>
                    <p>Please carefully update the News links</p>
                </div>
                <div className="NewsLandScape-two">
                    <div className="NewsLandScape-two-in">
                        <div className="NewsLandScape-in-one">
                            <input 
                                type="text" 
                                placeholder="NewsLink"
                                name='newsLink'
                                value={newsData.newsLink}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="NewsLandScape-in-two">
                            <input 
                                type="text" 
                                placeholder="ClubName"
                                name='clubName'
                                value={newsData.clubName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="NewsLandScape-in-three">
                            <input 
                                type="text" 
                                placeholder="NewsContent"
                                name='newsContent'
                                value={newsData.newsContent}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="NewsLandScape-in-four">
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className="NewsLandScape-in-five">
                            <Link href='/admin/dashboard'>Go Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default page