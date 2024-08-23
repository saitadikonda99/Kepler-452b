"use client"
import React, { useState, useEffect } from 'react';
import './page.css';

import { silArray } from '../../../data/silArray';
import Navbar from './Navbar';
import Footer from '../../Components/Footer/page';

const Page = () => {
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek , setSelectedWeek] = useState(1);
//   const [searchTerm , setSelectedTerm]  = useState('');
//   const [sortOption, setSortOption] = useState('date');

  const extractAndSortWeeks = () => {
    const uniqueWeeks = Array.from(new Set(silArray.map(activity => activity.Week)));
    const sortedWeeks = uniqueWeeks.sort((a, b) => a - b);
    setWeeks(sortedWeeks);
  };

  useEffect(() => {
    extractAndSortWeeks();
  }, []);

  const filteredActivities = silArray.filter(activity => activity.Week === selectedWeek);

  return (
    <div className='SilComponent'>
    	<div className="SilComponent-in">
			<div className="SilNavbar">
				<Navbar />
			</div>
	
			<div className="Sil-one">
				<div className="Sil-one-in">
					<div className="week-selector">
						{weeks.map(week => (
						<button key={week} onClick={() => setSelectedWeek(week)} className='sil-button' >Week {week}</button>
						))}
					</div>
				</div>
			</div>
			<div className="Sil-two">
				<div className="sil-two-in">
					<p>List of Activities & Events for Week {selectedWeek}</p>
					<div className="Sil-two-search">
						<label htmlFor="">Search</label>
						<input type="text" name="" id="" />
					</div>
					<div className="sil-two-fliter">
						<select name="" id="">
							<option value=""></option>
							<option value=""></option>
						</select>
					</div>
				</div>
			</div>
			<div className="Sil-three">
				<table>
					<thead>
						<tr>
							<th>Sno</th>
							<th>Name of the Club</th>
							<th>Event Title</th>
							<th>Event Date</th>
							<th>Venue</th>
						</tr>
					</thead>
					<tbody>
						{filteredActivities.map(activity => (
							<tr key={activity.Sno}>
							<td>{activity.Sno}</td>
							<td>{activity["Name of the Club "]}</td>
							<td>{activity["Event Title"]}</td>
							<td>{activity["Date of the Event"]}</td>
							<td>{activity.Venue}</td>
							</tr>
						))}
					</tbody>
				</table>
	  		</div>
			<Footer />
		</div>
    </div>
  );
}

export default Page;
