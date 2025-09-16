import React, { useState, useEffect } from 'react'
import './team.css'
import Image from 'next/image';
import axios from 'axios';

import { MdKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';

const Team = () => {
    const [teamData, setTeamData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTeamData = async () => {
        try {
            const response = await axios.get("/api/admin/Team");
            // Filter only leadership category
            const leadershipMembers = response.data.filter(member => member.category === 'leadership');
            setTeamData(leadershipMembers);
        } catch (error) {
            console.error("Error fetching team data:", error);
            // Fallback to empty array if API fails
            setTeamData([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamData();
    }, []);

  return (
        <div className="TeamComponent" id="teamComponent">
            <div className="TeamComponent-in">
                <div className="team-one">
                    <span>Home / Team</span>
                </div>
                <div className="team-two">
                    <h1>Meet Our Leadership</h1>
                    <p>The leadership team behind every club,
                    building experiences that enrich student life.</p>
                </div>
                <div className="team-three">
                    <div className="team-three-in">
                        
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