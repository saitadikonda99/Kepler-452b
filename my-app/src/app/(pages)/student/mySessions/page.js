"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../dashboard/dashboard';
import Loading from '../../../animation/Loading';
import './page.css';

const Page = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [academicYears, setAcademicYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const sessionTypes = [...new Set(sessions.map(session => session.session_type))];
    const statusTypes = ['Present', 'Absent', 'Pending'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sessionsRes, yearsRes] = await Promise.all([
                    axios.get('/api/student/mySessions'),
                    axios.get('/api/academicYears')
                ]);
                setSessions(sessionsRes.data);
                setAcademicYears(yearsRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getAttendanceStatus = (points) => {
        if (points === 0) return 'Pending';
        if (points > 0) return 'Present';
        return 'Absent';
    };

    const filteredSessions = sessions
        .filter(session => {
            const yearMatch = !selectedYear || session.academic_year_id === parseInt(selectedYear);
            const typeMatch = !selectedType || session.session_type === selectedType;
            const points = session.attendance_points || 0;
            const currentStatus = getAttendanceStatus(points);
            const statusMatch = !selectedStatus || currentStatus.toLowerCase() === selectedStatus.toLowerCase();
            return yearMatch && typeMatch && statusMatch;
        });

    if (loading) {
        return (
            <Dashboard>
                <Loading />
            </Dashboard>
        );
    }

    return (
        <Dashboard>
            <div className="SortDataComponent">
                <div className="SortDataComponent-in">
                    <div className="header-section">
                        <h1 className="sessions-title">My Sessions</h1>
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

                        <select
                            className="filter-select"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">All Session Types</option>
                            {sessionTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <select
                            className="filter-select"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            {statusTypes.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Session Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Venue</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Points</th>
                                    <th>Resource Person</th>
                                    <th>In-Charge</th>
                                    <th>Extra Points</th>
                                    <th>Total Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSessions.map((session) => (
                                    <tr key={session.session_id}>
                                        <td>{session.session_name}</td>
                                        <td>{formatDate(session.session_date)}</td>
                                        <td>{`${formatTime(session.session_sTime)} - ${formatTime(session.session_eTime)}`}</td>
                                        <td>{session.session_venue}</td>
                                        <td>{session.session_type}</td>
                                        <td>
                                            <span className={`status ${getAttendanceStatus(session.attendance_points || 0).toLowerCase()}`}>
                                                {getAttendanceStatus(session.attendance_points || 0)}
                                            </span>
                                        </td>
                                        <td>{session.attendance_points || 0}</td>
                                        <td>{session.resource_person_points || 0}</td>
                                        <td>{session.inCharge_points || 0}</td>
                                        <td>{session.extra_points || 0}</td>
                                        <td>
                                            <div className="points-container">
                                                <span className="total-points">
                                                    {(session.attendance_points || 0) + 
                                                     (session.resource_person_points || 0) + 
                                                     (session.inCharge_points || 0) + 
                                                     (session.extra_points || 0)}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Page;