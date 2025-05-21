  import React, { useState, useRef, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import "./AddSocietyForm.css";
  import { 
    FaBuilding, FaMapMarkerAlt, FaLink, FaBed, FaSwimmingPool, 
    FaParking, FaDumbbell, FaShieldAlt, FaArrowLeft, FaMap, FaArrowRight
  } from "react-icons/fa";

  // Leaflet Imports
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import "leaflet-control-geocoder";

  const AddSocietyForm = () => {
    const navigate = useNavigate();
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);

    const [showMap, setShowMap] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      address: "",
      location: "",
      coordinates: null,
      rooms: {
        "1BHK": { count: 0, price: 0 },
        "2BHK": { count: 0, price: 0 },
        "3BHK": { count: 0, price: 0 },
      },
      facilities: {
        Parking: false,
        Gymnasium: false,
        Security: false,
        Pool: false,
      },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Map Initialization Effect
    useEffect(() => {
      if (showMap && mapRef.current && !mapInstanceRef.current) {
        // Initialize map
        mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);

        // Add geocoder control
        const geocoder = L.Control.geocoder({
          defaultMarkGeocode: false
        }).addTo(mapInstanceRef.current);

        geocoder.on('markgeocode', (e) => {
          const { center, name } = e.geocode;
          updateLocationFromGeocoder(center, name);
        });

        // Handle map click to set location
        mapInstanceRef.current.on('click', (e) => {
          const { lat, lng } = e.latlng;
          
          // Remove existing marker if any
          if (markerRef.current) {
            mapInstanceRef.current.removeLayer(markerRef.current);
          }

          // Add new marker
          markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current);

          // Reverse geocode to get address
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then(response => response.json())
            .then(data => {
              const address = data.display_name || `Latitude: ${lat}, Longitude: ${lng}`;
              updateLocationFromGeocoder({ lat, lng }, address);
            })
            .catch(error => {
              console.error('Reverse geocoding error:', error);
              updateLocationFromGeocoder({ lat, lng }, `Latitude: ${lat}, Longitude: ${lng}`);
            });
        });
      }
    }, [showMap]);

    // Location Update Handler
    const updateLocationFromGeocoder = (center, address) => {
      setFormData(prev => ({
        ...prev,
        address: address,
        location: `https://www.openstreetmap.org/?mlat=${center.lat}&mlon=${center.lng}#map=15/${center.lat}/${center.lng}`,
        coordinates: {
          latitude: center.lat,
          longitude: center.lng
        }
      }));
      setShowMap(false);
    };

    // Form Validation
    const validateForm = () => {
      const errors = {};
      if (!formData.name.trim()) errors.name = "Society name is required";
      if (!formData.address.trim()) errors.address = "Address is required";
      
      // Check if at least one room type has a count
      const hasRooms = Object.values(formData.rooms).some(room => room.count > 0);
      if (!hasRooms) errors.rooms = "Please add at least one room type";
      
      return errors;
    };

    // Change Handlers
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (name in formData.rooms) {
        setFormData((prev) => ({
          ...prev,
          rooms: {
            ...prev.rooms,
            [name]: { ...prev.rooms[name], price: Number(value) },
          },
        }));
      } else if (type === "checkbox") {
        setFormData((prev) => ({
          ...prev,
          facilities: { ...prev.facilities, [name]: checked },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      
      // Clear error when field is updated
      if (formErrors[name]) {
        setFormErrors(prev => ({...prev, [name]: null}));
      }
    };

    // Room Count Change Handler
    const handleRoomCountChange = (roomType, value) => {
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomType]: { ...prev.rooms[roomType], count: Number(value) },
        },
      }));
      
      // Clear room error when any room is updated
      if (formErrors.rooms) {
        setFormErrors(prev => ({...prev, rooms: null}));
      }
    };

    // Form Submission Handler
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      
      setIsSubmitting(true);
      try {
        const token = localStorage.getItem("token")
        const response = await axios.post("https://housingfy-clean-backend.onrender.com/api/societies/add", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = 'Society Added Successfully!';
        document.body.appendChild(notification);
        
        // Navigate to Personal Dashboard with success message
        setTimeout(() => {
          document.body.removeChild(notification);
          navigate("/personal-dashboard-admin", { 
            state: { 
              societyAdded: true,
              societyName: formData.name 
            }
          });
        }, 2000);
        
      } catch (error) {
        console.error("Error adding society:", error);
        setFormErrors({submit: "Failed to add society. Please try again."});
      } finally {
        setIsSubmitting(false);
      }
    };

    const renderLocationInput = () => {
      return (
        <div className="form-group location-input">
          <label htmlFor="location">
            <FaLink className="input-icon" /> Location (OpenStreetMap URL)
          </label>
          <div className="location-input-container">
            <input 
              type="text" 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="Location URL or Select on Map"
            />
            <button 
              type="button" 
              className="map-selector-button" 
              onClick={() => setShowMap(true)}
            >
              <FaMap /> Pick Location
            </button>
          </div>
          {showMap && (
            <div ref={mapRef} className="location-picker-map"></div>
          )}
        </div>
      );
    };

    return (
      <div className="form-page-container">
        <div className="navigation-bar">
          <button 
            type="button" 
            className="back-nav-button"
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <button 
            type="button" 
            className="your-dashboard"
            onClick={() => navigate("/personal-dashboard-admin")}
          >
            Your Dashboard <FaArrowRight />
          </button>
        </div>
        
        <div className="add-society-container">
          <div className="form-header">
            <h2><FaBuilding className="header-icon" /> Add New Society</h2>
            <p>Create a new residential society to manage apartments within it</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-group">
                <label htmlFor="name">
                  <FaBuilding className="input-icon" /> Society Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Enter society name"
                  className={formErrors.name ? "error" : ""}
                />
                {formErrors.name && <div className="error-message">{formErrors.name}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="address">
                  <FaMapMarkerAlt className="input-icon" /> Address
                </label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Enter complete address"
                  className={formErrors.address ? "error" : ""}
                />
                {formErrors.address && <div className="error-message">{formErrors.address}</div>}
              </div>
              
              {renderLocationInput()}
            </div>

            <div className="form-section">
              <h3><FaBed className="section-icon" /> Room Details</h3>
              {formErrors.rooms && <div className="error-message section-error">{formErrors.rooms}</div>}
              
              <div className="room-entries">
                {Object.keys(formData.rooms).map((roomType) => (
                  <div key={roomType} className="room-card">
                    <h4>{roomType}</h4>
                    <div className="room-inputs">
                      <div className="input-group">
                        <label htmlFor={`${roomType}-count`}>Count</label>
                        <input
                          id={`${roomType}-count`}
                          type="text" 
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={formData.rooms[roomType].count}
                          onChange={(e) => handleRoomCountChange(roomType, e.target.value)}
                        />
                      </div>
                      
                      <div className="input-group">
                        <label htmlFor={`${roomType}-price`}>Price (₹)</label>
                        <input 
                          id={`${roomType}-price`}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          name={roomType} 
                          value={formData.rooms[roomType].price} 
                          onChange={handleChange} 
                          
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>Facilities</h3>
              <div className="facilities-container">
                {Object.keys(formData.facilities).map((facility) => (
                  <div key={facility} className="facility-card">
                    <input 
                      type="checkbox" 
                      id={facility} 
                      name={facility} 
                      checked={formData.facilities[facility]} 
                      onChange={handleChange} 
                    />
                    <label htmlFor={facility}>
                      <div className="facility-icon-container">
                        {facility === "Parking" && <FaParking className="facility-icon" />}
                        {facility === "Gymnasium" && <FaDumbbell className="facility-icon" />}
                        {facility === "Security" && <FaShieldAlt className="facility-icon" />}
                        {facility === "Pool" && <FaSwimmingPool className="facility-icon" />}
                      </div>
                      <span>{facility === "Pool" ? "Swimming Pool" : facility}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {formErrors.submit && <div className="error-message form-error">{formErrors.submit}</div>}
            
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Society"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default AddSocietyForm;