"use client"
import React, { useState, useEffect } from 'react';

import './page.css';

import { silArray } from '../../../data/silArray';
import Footer from '../../Components/Footer/page';

const Page = () => {
  const [weeks, setWeeks] = useState([]);

  const extractAndSortWeeks = () => {
    const uniqueWeeks = Array.from(new Set(silArray.map(activity => activity.Week)));
    const sortedWeeks = uniqueWeeks.sort((a, b) => a - b);
    setWeeks(sortedWeeks);
  };

  useEffect(() => {
    extractAndSortWeeks();
  }, []);

  const [selectedWeek, setSelectedWeek] = useState(1);

  const filteredActivities = silArray.filter(activity => activity.Week === selectedWeek);

  return (
    <div className='SILContainer'>

      <div className="sil-header">
        <div className="silactivities-in">
          <h1>List of Activities & Events for Week {selectedWeek}</h1>
          <div className="week-selector">
            {weeks.map(week => (
              <button key={week} onClick={() => setSelectedWeek(week)}>Week {week}</button>
            ))}
          </div>
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Name of the Club</th>
                <th>Event Title</th>
                <th>Date of the Event</th>
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
      </div>
        <Footer />
    </div>
  );
}

export default Page;
