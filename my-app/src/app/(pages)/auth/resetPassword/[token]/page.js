"use client"
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast";
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import './page.css'

import Loading from '../../../../animation/Loading'

function ResetPassword() {
    const [formData, setFormData] = useState({ 
        password: '',
        confirmPassword: ''
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const token = useParams().token;


    const router = useRouter();

    const handleReset = async (e) => {
        setLoading(true)
        try {
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }

            const response = await axios.post(`/api/auth/resetPassword/${token}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setLoading(false)
           if(response.status === 200) {
            toast.success('Password reset successfully')
            router.push('/auth/login')
           } else {
            toast.error('Password reset failed')
           }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'An error occurred')
            setLoading(false)
        }
    }

    if(loading) {
        return <Loading />
    }

  return (
        <div className="ResetComponent">
            <div className="ResetComponent-in">
                <div className="Reset-one">
                    <h2>Reset Password</h2>
                    <p>Enter your new password</p>
                </div>
                <div className="Reset-two">
                    <input 
                        type="password" 
                        name='password'
                        placeholder='Enter new password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="Reset-two">
                    <input 
                        type="password" 
                        name='confirmPassword'
                        placeholder='Confirm new password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="Reset-three">
                     <button onClick={handleReset}>Reset Password</button>
                </div>
            </div>
        </div>
  )
}

export default ResetPassword