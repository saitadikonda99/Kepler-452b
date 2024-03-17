"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';

const page = () => {


	const [clubData, setClubData] = useState([])


	useEffect(() => {
		
		const getData = async () => {
	
			try {
				const response = await axios.get('/api/clubs',{ revalidate: 10 })
	
				setClubData(response.data)
			} catch (error) {
				toast.error(error.message)
			}  
		}
		
		getData()
	}, [])


  return (
       <div className="PresidentComponent">
			<div className="PresidentComponent-in">
				<h1>President Dashboard</h1>
				<div>
				{clubData?.map((club) => (
                <div key={club.id}>
					<h2>data id: {club.id}</h2>
					<h2>Club id: {club.club_id}</h2>
                    <h2>Club Name: {club.club_name}</h2>
                    <p>Description: {club.club_description}</p>
                    <img src={club.club_logo} alt="Club Logo" />
                </div>
            ))}
        </div>
			</div>
       </div>
  )
}

export default page