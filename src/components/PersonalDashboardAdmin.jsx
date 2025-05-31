import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./PersonalDashboardAdmin.css";
import { 
  FaBuilding, FaPlus, FaEdit, FaTrash, FaSync 
} from "react-icons/fa";

const PersonalDashboardAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [societies, setSocieties] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSocieties();
    
    // Check for society added message from redirect
    if (location.state?.societyAdded) {
      setSuccessMessage(`Society "${location.state.societyName}" added successfully!`);
      // Clear the state to prevent duplicate messages
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchSocieties = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("No authentication token found. Please login again.");
        setLoading(false);
        return;
      }

      console.log("Making API call with token:", token ? "Present" : "Missing");
      
      const response = await axios.get("https://housingfy-clean-backend.onrender.com/api/societies/admin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Full API response:", response);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      console.log("Response data type:", typeof response.data);
      console.log("Is response.data an array?", Array.isArray(response.data));
      
      // Handle different possible response structures
      let societiesData = [];
      
      if (Array.isArray(response.data)) {
        societiesData = response.data;
      } else if (response.data && Array.isArray(response.data.societies)) {
        societiesData = response.data.societies;
      } else if (response.data && Array.isArray(response.data.data)) {
        societiesData = response.data.data;
      } else if (response.data && response.data.success && Array.isArray(response.data.societies)) {
        societiesData = response.data.societies;
      }
      
      console.log("Processed societies data:", societiesData);
      console.log("Number of societies:", societiesData.length);
      
      if (societiesData.length > 0) {
        console.log("First society structure:", societiesData[0]);
      }
      
      setSocieties(societiesData);
      
    } catch (error) {
      console.error("Error fetching societies:", error);
      console.error("Error response:", error.response);
      
      if (error.response?.status === 401) {
        setError("Authentication failed. Please login again.");
        // Optionally redirect to login
        // navigate("/login");
      } else if (error.response?.status === 403) {
        setError("Access denied. You don't have permission to view societies.");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        console.log("We are hitting this!", error);
        console.log(error);                  // Full error object
        console.log(error.message);         // e.g. "Network Error"
        console.log(error.code);            // e.g. "ERR_NETWORK", "ECONNABORTED"
        console.log(error.response);        // Response object (if server responded)
        console.log(error.response?.status); // e.g. 400, 401, 500 (optional chaining)
        console.log(error.response?.data);   // Error body sent by backend
        setError("Failed to load societies. Please try again.");
      }
      
      setSocieties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSociety = () => {
    navigate("/add-society");
  };

  const handleRefresh = () => {
    fetchSocieties();
  };

  const handleSocietyCardClick = (society) => {
    console.log("Clicked society:", society);
    
    // Safely handle rooms data
    const safeRooms = society.rooms || {};
    
    navigate("/add-apartment", { 
      state: { 
        societyId: society._id || society.id,
        name: society.name,
        rooms: {
          studio: { 
            count: safeRooms.studio?.count || 0, 
            price: safeRooms.studio?.price || 0 
          },
          '1BHK': { 
            count: safeRooms['1BHK']?.count || 0, 
            price: safeRooms['1BHK']?.price || 0 
          },
          '2BHK': { 
            count: safeRooms['2BHK']?.count || 0, 
            price: safeRooms['2BHK']?.price || 0 
          },
          '3BHK': { 
            count: safeRooms['3BHK']?.count || 0, 
            price: safeRooms['3BHK']?.price || 0 
          },
          penthouse: { 
            count: safeRooms.penthouse?.count || 0, 
            price: safeRooms.penthouse?.price || 0 
          }
        }
      } 
    });
  };

  const handleEditSociety = (societyId, e) => {
    e.stopPropagation();
    navigate(`/edit-society/${societyId}`);
  };

  const handleDeleteSociety = async (societyId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this society?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://housingfy-clean-backend.onrender.com/api/societies/${societyId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSuccessMessage("Society deleted successfully!");
        fetchSocieties(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting society:", error);
        setError("Failed to delete society. Please try again.");
      }
    }
  };

  // Helper function to safely calculate total apartments
  const getTotalApartments = (society) => {
    if (!society.rooms) return 0;
    
    return Object.values(society.rooms).reduce(
      (total, room) => {
        if (room && typeof room.count === 'number') {
          return total + room.count;
        }
        return total;
      }, 
      0
    );
  };

  return (
    <div className="personal-dashboard-container">
      <div className="dashboard-header">
        <h1><FaBuilding /> Your Societies</h1>
        <div className="header-actions">
          <button 
            className="refresh-button"
            onClick={handleRefresh}
            disabled={loading}
          >
            <FaSync /> {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button 
            className="add-society-button" 
            onClick={handleAddSociety}
          >
            <FaPlus /> Add New Society
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-message">
          Loading societies...
        </div>
      ) : (
        <>
          {(!societies || societies.length === 0) ? (
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
              {societies.map((society, index) => (
                <div 
                  key={society._id || society.id || index} 
                  className="society-card"
                  onClick={() => handleSocietyCardClick(society)}
                >
                  <div className="society-card-header">
                    <h3>{society.name || 'Unnamed Society'}</h3>
                  </div>
                  <div className="society-card-details">
                    <p><strong>Address:</strong> {society.address || 'No address provided'}</p>
                    <div className="society-card-stats">
                      <div className="stat">
                        <FaBuilding /> Apartments
                        <span>
                          {getTotalApartments(society)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="society-card-actions">
                    <button 
                      className="edit-button"
                      onClick={(e) => handleEditSociety(society._id || society.id, e)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={(e) => handleDeleteSociety(society._id || society.id, e)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalDashboardAdmin;