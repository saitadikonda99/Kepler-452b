import React, { useState, useEffect } from 'react';

const ClubDetails = () => {
  const [club, setClub] = useState(null);
  const [formData, setFormData] = useState({
    clubId: '',
    clubLogo: '',
    clubName: '',
    clubDesc: '',
    clubAbout: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch club details on component mount
    const fetchClubDetails = async () => {
      try {
        const response = await fetch('/api/clubDetails', { method: 'GET' });
        const data = await response.json();

        if (response.ok) {
          setClub(data);
          setFormData({
            clubId: data.id,
            clubLogo: data.club_logo,
            clubName: data.club_name,
            clubDesc: data.club_desc,
            clubAbout: data.club_about
          });
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('Error fetching club details');
      }
    };

    fetchClubDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clubDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Club details updated successfully');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Server error while updating');
    }
  };

  return (
    <div>
      <h1>Club Details</h1>
      {message && <p>{message}</p>}
      {club ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="clubLogo">Club Logo URL:</label>
            <input
              type="text"
              id="clubLogo"
              name="clubLogo"
              value={formData.clubLogo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="clubName">Club Name:</label>
            <input
              type="text"
              id="clubName"
              name="clubName"
              value={formData.clubName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="clubDesc">Club Description:</label>
            <textarea
              id="clubDesc"
              name="clubDesc"
              value={formData.clubDesc}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="clubAbout">About Club:</label>
            <textarea
              id="clubAbout"
              name="clubAbout"
              value={formData.clubAbout}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Club Details</button>
        </form>
      ) : (
        <p>Loading club details...</p>
      )}
    </div>
  );
};

export default ClubDetails;
