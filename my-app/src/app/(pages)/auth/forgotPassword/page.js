"use client"
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast";
import Link from 'next/link';

import Loading from '../../../animation/Loading'

import './page.css'

function Forgot() {
    const [formData, setFormData] = useState({ email: '' })
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePassword = async (e) => {

        try {
            const response = await axios.post('/api/auth/forgotPassword',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response.status)
            setLoading(false)
           if(response.status === 200) {
            toast.success('Email sent successfully')
           }
           else {
            toast.error('Use a valid email address')
           }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    const handleBack = () => {
        router.push('/auth/login')
    }

    if(loading) {
        return <Loading />
    }

  return (
        <div className="ForgotComponent">
            <div className="ForgotComponent-in">
                <div className="Forgot-one">
                    <h2>Find your account</h2>
                    <p>Enter your email address linked to your account</p>
                </div>
                <div className="Forgot-two">
                    <input type="email" 
                        name='email'
                        placeholder='Enter your registered email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="Forgot-three">
                     <button onClick={handlePassword} id={formData.email? 'forgot-btn' : ''} >Next</button>
                </div>
                <div className="Forgot-four">
                    <Link href="/auth/login">Back to login</Link>
                </div>
            </div>
        </div>
  )
}

export default Forgot