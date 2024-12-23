"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Dashboard from '../dashboard/dashboard'

import Loading from '../../../animation/Loading'

import './page.css'

const page = () => {

  const [points, setPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pointsRes, yearsRes] = await Promise.all([
          axios.get('/api/student/myPoints'),
          axios.get('/api/academicYears')
        ]);
        setPoints(pointsRes.data);
        setAcademicYears(yearsRes.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPoints = points.filter(point => {
    const yearMatch = !selectedYear || point.academic_year_id === parseInt(selectedYear);
    return yearMatch;
  });

  const calculateTotalPoints = () => {
    return filteredPoints.reduce((acc, point) => {
      const total = (point.attendance_points || 0) +
        (point.resource_person_points || 0) +
        (point.inCharge_points || 0) +
        (point.extra_points || 0);
      return acc + total;
    }, 0);
  };

  const calculateResourcePersonPoints = () => {
    return filteredPoints.reduce((acc, point) => {
      return acc + (point.resource_person_points || 0);
    }, 0);
  };

  const calculateInChargePoints = () => {
    return filteredPoints.reduce((acc, point) => {
      return acc + (point.inCharge_points || 0);
    }, 0);
  };

  const calculateGrandTotal = () => {
    return points.reduce((acc, point) => {
      const total = (point.attendance_points || 0) +
        (point.resource_person_points || 0) +
        (point.inCharge_points || 0) +
        (point.extra_points || 0);
      return acc + total;
    }, 0);
  };

  if (isLoading) {
    return (
      <Dashboard>
        <Loading />
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <div className="MyPointsComponents">
        <div className="MyPointsComponents-in">
          <div className="header-section">
            <h1 className="points-title">My Points Summary</h1>
          </div>

          <div className="filter-section">
            <select
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">All Academic Years</option>
              {academicYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.year_range} - {year.semester}
                </option>
              ))}
            </select>
          </div>

          <div className="points-summary">
            <div className="points-card grand-total">
              <h3>Grand Total Points</h3>
              <div className="points-value">{calculateGrandTotal()}</div>
            </div>
            <div className="points-card">
              <h3>Total Session Points</h3>
              <div className="points-value">{calculateTotalPoints()}</div>
            </div>
            <div className="points-card">
              <h3>Resource Person Points</h3>
              <div className="points-value">{calculateResourcePersonPoints()}</div>
            </div>
            <div className="points-card">
              <h3>In-Charge Points</h3>
              <div className="points-value">{calculateInChargePoints()}</div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default page