import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./PersonalDashboardAdmin.css";
import { 
  FaBuilding, FaPlus, FaEdit, FaTrash 
} from "react-icons/fa";

const PersonalDashboardAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [societies, setSocieties] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Check for society added message from redirect
    if (location.state?.societyAdded) {
      setSuccessMessage(`Society "${location.state.societyName}" added successfully!`);
      
      // Clear the state to prevent duplicate messages
      window.history.replaceState({}, document.title);
    }

    // Fetch societies for the admin
    const fetchSocieties = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://housingfy-clean-backend.onrender.com/api/societies/admin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetched societies:", response.data); 
        setSocieties(response.data);
      } catch (error) {
        console.error("Error fetching societies:", error);
      }
    };

    fetchSocieties();
  }, [location.state]);

  const handleAddSociety = () => {
    navigate("/add-society");
  };

  const handleSocietyCardClick = (society) => {
    navigate("/add-apartment", { 
      state: { 
        societyId: society._id,
        name: society.name,
        rooms: {
          studio: { count: society.rooms.studio?.count || 0, price: society.rooms.studio?.price || 0 },
          '1BHK': { count: society.rooms['1BHK']?.count || 0, price: society.rooms['1BHK']?.price || 0 },
          '2BHK': { count: society.rooms['2BHK']?.count || 0, price: society.rooms['2BHK']?.price || 0 },
          '3BHK': { count: society.rooms['3BHK']?.count || 0, price: society.rooms['3BHK']?.price || 0 },
          penthouse: { count: society.rooms.penthouse?.count || 0, price: society.rooms.penthouse?.price || 0 }
        }
      } 
    });
  };

  return (
    <div className="personal-dashboard-container">
      <div className="dashboard-header">
        <h1><FaBuilding /> Your Societies</h1>
        <button 
          className="add-society-button" 
          onClick={handleAddSociety}
        >
          <FaPlus /> Add New Society
        </button>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {societies.length === 0 ? (
        <div className="no-societies-message">
          <p>You haven't added any societies yet.</p>
          <button 
            className="add-first-society-button"
            onClick={handleAddSociety}
          >
            Add Your First Society
          </button>
        </div>
      ) : (
        <div className="societies-grid">
          {societies.map((society) => (
            <div 
              key={society._id} 
              className="society-card"
              onClick={() => handleSocietyCardClick(society)}
            >
              <div className="society-card-header">
                <h3>{society.name}</h3>
              </div>
              <div className="society-card-details">
                <p><strong>Address:</strong> {society.address}</p>
                <div className="society-card-stats">
                  <div className="stat">
                    <FaBuilding /> Apartments
                    <span>
                      {Object.values(society.rooms).reduce((total, room) => total + (room.count || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="society-card-actions">
                <button className="edit-button">
                  <FaEdit /> Edit
                </button>
                <button className="delete-button">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalDashboardAdmin;