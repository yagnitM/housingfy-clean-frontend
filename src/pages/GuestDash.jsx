import React, { useState } from 'react';
import './GuestDash.css';
import { FaHome, FaSearch, FaFilter, FaCar, FaDumbbell, FaShieldAlt, FaSwimmer } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const GuestDash = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const societies = [
    {
      id: 1,
      name: 'Prestige Lakeview Residency',
      address: 'Whitefield, Bangalore, Karnataka',
      image: 'https://oss-brigade.s3.ap-southeast-1.amazonaws.com/property/prestige-lakeside-habitat/banner__92541fd2-93bc-4019-80c3-f99b00939f28.jpeg',
      rooms: { '1 BHK': { count: 5, price: 15000 }, '2 BHK': { count: 3, price: 25000 } },
      facilities: { Parking: true, Gymnasium: true, Security: true, Pool: true }
    },
    {
      id: 2,
      name: 'Gaur City Apartments',
      address: 'Noida Extension, Uttar Pradesh',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZrzsyr8Dmrn7J2k2Dw4fmVzuTnSbW8SBQiQ&s',
      rooms: { '2 BHK': { count: 6, price: 18000 }, '3 BHK': { count: 4, price: 28000 } },
      facilities: { Parking: true, Gymnasium: true, Security: true, Pool: false }
    },
    {
      id: 3,
      name: 'Lodha Palava City',
      address: 'Dombivli, Mumbai, Maharashtra',
      image: 'https://www.gharjunction.com/server/php/files/property/64/lodha-palava-1.jpg',
      rooms: { '1 BHK': { count: 7, price: 12000 }, '2 BHK': { count: 5, price: 22000 } },
      facilities: { Parking: true, Gymnasium: false, Security: true, Pool: true }
    },
    {
      id: 4,
      name: 'Brigade Panorama',
      address: 'Mysore Road, Bangalore, Karnataka',
      image: 'https://is1-3.housingcdn.com/4f2250e8/5aace6269c8c00e1febeebeb5cd0a1d9/v0/fs/brigade_panorama-mysore_road_kethiganahalli-bengaluru-brigade_enterprises_ltd.jpeg',
      rooms: { '3 BHK': { count: 2, price: 32000 }, '4 BHK': { count: 1, price: 45000 } },
      facilities: { Parking: true, Gymnasium: true, Security: false, Pool: true }
    }
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const filteredSocieties = societies.filter(society =>
    society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    society.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="guest-dashboard">
      <header className="guest-header">
        <div className="guest-logo">
          <FaHome className="guest-logo-icon" />
          <h1>PropertyFinder</h1>
        </div>
        <div className="guest-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by society name or address"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="filter-button" onClick={toggleFilter}>
            <FaFilter /> Filter
          </button>
        </div>
        <div className="guest-auth-buttons">
          <button className="login-button" onClick={handleLoginClick}>Login</button>
          <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
        </div>
      </header>

      <main className="guest-content">
        <div className="society-grid">
          {filteredSocieties.map(society => (
            <div className="society-card" key={society.id}>
              <img src={society.image} alt={society.name} className="society-image" />
              <div className="society-details">
                <h3>{society.name}</h3>
                <div className="society-location">
                  <MdLocationOn /> {society.address}
                </div>
                <div className="society-rooms">
                  {Object.entries(society.rooms).map(([roomType, roomData]) => (
                    <div key={roomType}>
                      {roomType}: {roomData.count} units, ₹{roomData.price}/month
                    </div>
                  ))}
                </div>
                <div className="society-facilities">
                  <h4>Facilities:</h4>
                  <div className="facilities-icons">
                    {society.facilities.Parking && <FaCar title="Parking" />}
                    {society.facilities.Gymnasium && <FaDumbbell title="Gymnasium" />}
                    {society.facilities.Security && <FaShieldAlt title="Security" />}
                    {society.facilities.Pool && <FaSwimmer title="Pool" />}
                  </div>
                </div>
                <button className="view-details-button" onClick={() => alert("Sign up to view more details!")}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GuestDash;
