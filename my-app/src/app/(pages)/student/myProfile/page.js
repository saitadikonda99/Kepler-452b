"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './page.css'

import Loading from '../../../animation/Loading'
import Dashboard from '../dashboard/dashboard'

const page = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/student/myProfile');
            setProfile(response.data[0]);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading || !profile) {
        return <Loading />;
    }

    const renderContent = () => {
        switch(activeTab) {
            case 'personal':
                return (
                    <div className='student-profile fade-in'>
                        <div className='section-header'>
                            <h1 className='section-title'>Personal Information</h1>
                        </div>
                        <div className='content-card'>
                            <div className='field-group'>
                                <p className='field-label'>Name</p>
                                <p className='field-value'>{profile.user_detail_name}</p>
                            </div>
                            <div className='field-group'>
                                <p className='field-label'>ID Number</p>
                                <p className='field-value'>{profile.id_number}</p>
                            </div>
                            <div className='field-group'>
                                <p className='field-label'>Gender</p>
                                <p className='field-value'>{profile.gender}</p>
                            </div>
                            <div className='field-group'>
                                <p className='field-label'>Branch</p>
                                <p className='field-value'>{profile.branch}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className='student-profile fade-in'>
                        <div className='section-header'>
                            <h1 className='section-title'>Contact Information</h1>
                        </div>
                        <div className='content-card'>
                            <div className='field-group'>
                                <p className='field-label'>Email</p>
                                <p className='field-value contact-item'>
                                    <svg className='contact-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {profile.user_detail_email}
                                </p>
                            </div>
                            <div className='field-group'>
                                <p className='field-label'>Phone</p>
                                <p className='field-value contact-item'>
                                    <svg className='contact-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {profile.country_code} {profile.phone_number}
                                </p>
                            </div>
                            <div className='field-group'>
                                <p className='field-label'>Address</p>
                                <p className='field-value contact-item'>
                                    <svg className='contact-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {profile.district || ''} {profile.state ? `, ${profile.state}` : ''} {profile.country ? `, ${profile.country}` : ''} {profile.pincode ? `- ${profile.pincode}` : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 'academic':
                return (
                    <div className='student-profile fade-in'>
                        <div className='section-header'>
                            <h1 className='section-title'>Academic Information</h1>
                        </div>
                        <div className='content-card'>
                            <div className='field-group'>
                                <p className='field-label'>ERP Reference Number</p>
                                <p className='field-value'>{profile.erp_reference_number}</p>
                            </div>
                            <div className='field-group'>
                                <p className='field-label'>Registration Date</p>
                                <p className='field-value'>{new Date(profile.user_detail_registration_date).toLocaleDateString()}</p>
                            </div>
                            <div className='field-group'>
                                <p className='field-label'>Payment Status</p>
                                <p className={`status-badge ${profile.payment_status.toLowerCase() === 'paid' ? 'status-badge--paid' : 'status-badge--pending'}`}>
                                    {profile.payment_status}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 'accommodation':
                return (
                    <div className='student-profile fade-in'>
                        <div className='section-header'>
                            <h1 className='section-title'>Accommodation Details</h1>
                        </div>
                        <div className='content-card'>
                            <div className='field-group'>
                                <p className='field-label'>Residency Type</p>
                                <p className='field-value'>{profile.residency}</p>
                            </div>
                            {profile.hostel_name && (
                                <div className='field-group'>
                                    <p className='field-label'>Hostel Name</p>
                                    <p className='field-value'>{profile.hostel_name}</p>
                                </div>
                            )}
                            {profile.bus_route && (
                                <div className='field-group'>
                                    <p className='field-label'>Bus Route</p>
                                    <p className='field-value'>{profile.bus_route}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'club':
                return (
                    <div className='student-profile fade-in'>
                        <div className='section-header'>
                            <h1 className='section-title'>Club Information</h1>
                        </div>
                        <div className='content-card club-card'>
                            {profile.club_logo && (
                                <img src={profile.club_logo} alt={profile.club_name} className="club-logo" />
                            )}
                            <div className='field-group'>
                                <p className='field-label'>Club Name</p>
                                <p className='field-value'>{profile.club_name}</p>
                            </div>
                            <div className='field-group'>
                                <p className='field-label'>Domain</p>
                                <p className='field-value'>{profile.club_domain}</p>
                            </div>
                            {profile.club_description && (
                                <div className='field-group'>
                                    <p className='field-label'>Description</p>
                                    <p className='field-value'>{profile.club_description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dashboard>
            <div className='profile-navigation'>
                <ul className='navigation-list'>
                    <li className={`navigation-item nav-personal ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}>
                        <svg className='navigation-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal Information
                    </li>
                    <li className={`navigation-item nav-contact ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contact')}>
                        <svg className='navigation-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Contact Information
                    </li>
                    <li className={`navigation-item nav-academic ${activeTab === 'academic' ? 'active' : ''}`}
                        onClick={() => setActiveTab('academic')}>
                        <svg className='navigation-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Academic Information
                    </li>
                    <li className={`navigation-item nav-accommodation ${activeTab === 'accommodation' ? 'active' : ''}`}
                        onClick={() => setActiveTab('accommodation')}>
                        <svg className='navigation-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Accommodation Details
                    </li>
                    <li className={`navigation-item nav-club ${activeTab === 'club' ? 'active' : ''}`}
                        onClick={() => setActiveTab('club')}>
                        <svg className='navigation-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Club Information
                    </li>
                </ul>
            </div>
            {renderContent()}
        </Dashboard>
    )
}

export default page