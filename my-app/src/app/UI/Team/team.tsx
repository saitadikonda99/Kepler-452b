import React from 'react'
import './team.css'

import { MdKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';

const Team = () => {

    const teamData = [
        {
            name: "Kunal kushwaha",
            title: "President",
            image: "https://i.imghippo.com/files/KHQV5981JOM.png",
            linkedin: "https://www.linkedin.com/in/tadikondasaimanikanta/",
            email: "kunal@gmail.com"
        },
        {
            name: "Kunal kushwaha",
            title: "President",
            image: "https://i.imghippo.com/files/KHQV5981JOM.png",
            linkedin: "https://www.linkedin.com/in/tadikondasaimanikanta/",
            email: "kunal@gmail.com"
        },
        {
            name: "Kunal kushwaha",
            title: "President",
            image: "https://i.imghippo.com/files/KHQV5981JOM.png",
            linkedin: "https://www.linkedin.com/in/tadikondasaimanikanta/",
            email: "kunal@gmail.com"
        },
        {
            name: "Kunal kushwaha",
            title: "President",
            image: "https://i.imghippo.com/files/KHQV5981JOM.png",
            linkedin: "https://www.linkedin.com/in/tadikondasaimanikanta/",
            email: "kunal@gmail.com"
        },
        {
            name: "Kunal kushwaha",
            title: "President",
            image: "https://i.imghippo.com/files/KHQV5981JOM.png",
            linkedin: "https://www.linkedin.com/in/tadikondasaimanikanta/",
            email: "kunal@gmail.com"
        }
    ]

  return (
        <div className="TeamComponent">
            <div className="TeamComponent-in">
                <div className="team-one">
                    <span>Home / Team</span>
                </div>
                <div className="team-two">
                    <h1>Meet Our People</h1>
                    <p>The team behind every club,
                    building experiences that enrich student life.</p>
                </div>
                <div className="team-three">
                    <div className="team-three-in">
                        
                        {teamData.map((team, index) => (
                            <div className="team-card">
                                <div className="team-card-in" style={{backgroundImage: `url(${team.image})`}}>

                                    <div className="team-card-in-one">
                                        <div className="team-card-in-one-one">
                                            <p>{team.name}</p>
                                            <p>{team.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="team-four">
                    <Link href="/team">View All Team</Link>
                    <MdKeyboardArrowRight />
                </div>   
            </div>
        </div>
  )
}

export default Team