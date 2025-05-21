import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AddApartmentForm.css";
import { FaHome, FaRulerCombined, FaBed, FaMoneyBillWave, 
         FaMapMarkerAlt, FaBuilding, FaArrowLeft } from "react-icons/fa";

const AddApartmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [societyData, setSocietyData] = useState(null);
  const [apartmentForms, setApartmentForms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const societyFromRedirect = location.state;
    
    if (societyFromRedirect && societyFromRedirect.societyId) {
      setSocietyData(societyFromRedirect);

      const initialApartmentForms = [];
      const roomTypes = Object.entries(societyFromRedirect.rooms || {})
        .filter(([_, roomConfig]) => roomConfig.count > 0);

      roomTypes.forEach(([roomType, roomConfig]) => {
        for (let i = 1; i <= roomConfig.count; i++) {
          initialApartmentForms.push({
            societyId: societyFromRedirect.societyId,
            type: roomType,
            name: `${roomType} - ${i}`,
            size: '', 
            price: roomConfig.price,
            status: 'Vacant', 
            features: {
              Balcony: false,
              AirConditioned: false,
              Furnished: false,
              ModularKitchen: false
            },
            ownerDetails: {
              name: '',
              contact: '',
              email: ''
            }
          });
        }
      });

      setApartmentForms(initialApartmentForms);
    } else {
      navigate("/add-society");
    }
  }, [location.state, navigate]);

  const validateForm = () => {
    const errors = {};
    
    apartmentForms.forEach((apartment, index) => {
      if (!apartment.size || apartment.size <= 0) {
        errors[`size-${index}`] = "Valid size is required";
      }
      
      if (apartment.status === "Occupied") {
        if (!apartment.ownerDetails.name) {
          errors[`ownerName-${index}`] = "Owner name required";
        }
        if (!apartment.ownerDetails.contact) {
          errors[`ownerContact-${index}`] = "Contact required";
        }
        if (!apartment.ownerDetails.email || 
            !/\S+@\S+\.\S+/.test(apartment.ownerDetails.email)) {
          errors[`ownerEmail-${index}`] = "Valid email required";
        }
      }
    });
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      // Add apartments
      const responses = await Promise.all(
        apartmentForms.map(apartment => 
          axios.post("https://housingfy-clean-backend.onrender.com/api/apartments/add", apartment, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
        )
      );
      
      // Success notification
      const notification = document.createElement('div');
      notification.className = 'success-notification';
      notification.textContent = `${responses.length} Apartments Added Successfully!`;
      document.body.appendChild(notification);
      
      // Navigate after notification
      setTimeout(() => {
        document.body.removeChild(notification);
        navigate("/personal-dashboard-admin", { 
          state: { 
            apartmentsAdded: true,
            societyName: societyData.name 
          }
        });
      }, 2000);
    } catch (error) {
      console.error("Error adding apartments:", error);
      setFormErrors({ submit: "Failed to add apartments. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to update apartment form data
  const updateApartmentForm = (index, field, value) => {
    const updatedForms = [...apartmentForms];
    
    if (field.startsWith('ownerDetails.')) {
      const detailKey = field.split('.')[1];
      updatedForms[index].ownerDetails[detailKey] = value;
    } else if (field.startsWith('features.')) {
      const featureKey = field.split('.')[1];
      updatedForms[index].features[featureKey] = value;
    } else {
      updatedForms[index][field] = value;
    }
    
    setApartmentForms(updatedForms);
    
    // Clear specific error when field is updated
    if (formErrors[`${field}-${index}`]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[`${field}-${index}`];
        return newErrors;
      });
    }
  };

  if (!societyData) {
    return <div>Loading... or No society data found.</div>;
  }

  return (
    <div className="form-page-container">
      <div className="navigation-bar">
        <button 
          type="button" 
          className="back-nav-button"
          onClick={() => navigate("/add-society")}
        >
          <FaArrowLeft /> Back to Society
        </button>
        <button 
          type="button" 
          className="your-dashboard"
          onClick={() => navigate("/personal-dashboard-admin")}
        >
          Your Dashboard
        </button>
      </div>

      <div className="add-apartment-container">
        <div className="form-header">
          <h2><FaHome className="header-icon" /> Add Apartments for {societyData.name}</h2>
          <p>Fill in details for {apartmentForms.length} apartments</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Apartment Forms */}
          {apartmentForms.map((apartment, index) => (
            <div key={`${apartment.type}-${index}`} className="apartment-form-section">
              <h3>{apartment.name}</h3>
              
              {/* Apartment Basic Details */}
              <div className="form-group">
                <label><FaRulerCombined /> Size (sq. ft.)</label>
                <input 
                  type="number"
                  value={apartment.size}
                  onChange={(e) => updateApartmentForm(index, 'size', e.target.value)}
                  placeholder="Enter apartment size"
                  className={formErrors[`size-${index}`] ? "error" : ""}
                />
                {formErrors[`size-${index}`] && (
                  <div className="error-message">{formErrors[`size-${index}`]}</div>
                )}
              </div>

              <div className="form-group">
                <label><FaMoneyBillWave /> Price (₹)</label>
                <input 
                  type="number"
                  value={apartment.price}
                  onChange={(e) => updateApartmentForm(index, 'price', e.target.value)}
                  placeholder="Enter apartment price"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select 
                  value={apartment.status}
                  onChange={(e) => updateApartmentForm(index, 'status', e.target.value)}
                >
                  <option value="Vacant">Vacant</option>
                  <option value="Occupied">Occupied</option>
                </select>
              </div>

              {/* Features Checkboxes */}
              <div className="form-group features-group">
                <label>Features</label>
                {Object.keys(apartment.features).map((feature) => (
                  <div key={feature} className="checkbox-group">
                    <input 
                      type="checkbox"
                      id={`${apartment.name}-${feature}`}
                      checked={apartment.features[feature]}
                      onChange={(e) => updateApartmentForm(
                        index, 
                        `features.${feature}`, 
                        e.target.checked
                      )}
                    />
                    <label htmlFor={`${apartment.name}-${feature}`}>{feature}</label>
                  </div>
                ))}
              </div>

              {/* Owner Details (if status is Occupied) */}
              {apartment.status === "Occupied" && (
                <div className="owner-details-section">
                  <h4>Owner Details</h4>
                  <div className="form-group">
                    <label>Owner Name</label>
                    <input 
                      type="text"
                      value={apartment.ownerDetails.name}
                      onChange={(e) => updateApartmentForm(
                        index, 
                        'ownerDetails.name', 
                        e.target.value
                      )}
                      className={formErrors[`ownerName-${index}`] ? "error" : ""}
                    />
                    {formErrors[`ownerName-${index}`] && (
                      <div className="error-message">{formErrors[`ownerName-${index}`]}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Contact Number</label>
                    <input 
                      type="tel"
                      value={apartment.ownerDetails.contact}
                      onChange={(e) => updateApartmentForm(
                        index, 
                        'ownerDetails.contact', 
                        e.target.value
                      )}
                      className={formErrors[`ownerContact-${index}`] ? "error" : ""}
                    />
                    {formErrors[`ownerContact-${index}`] && (
                      <div className="error-message">{formErrors[`ownerContact-${index}`]}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email"
                      value={apartment.ownerDetails.email}
                      onChange={(e) => updateApartmentForm(
                        index, 
                        'ownerDetails.email', 
                        e.target.value
                      )}
                      className={formErrors[`ownerEmail-${index}`] ? "error" : ""}
                    />
                    {formErrors[`ownerEmail-${index}`] && (
                      <div className="error-message">{formErrors[`ownerEmail-${index}`]}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {formErrors.submit && <div className="error-message form-error">{formErrors.submit}</div>}

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => navigate("/add-society")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Apartments..." : "Add Apartments"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApartmentForm;