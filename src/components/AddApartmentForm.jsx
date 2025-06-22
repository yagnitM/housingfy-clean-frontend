import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AddApartmentForm.css";
import { FaHome, FaRulerCombined, FaBed, FaMoneyBillWave, 
         FaMapMarkerAlt, FaBuilding, FaArrowLeft, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

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
        if (!apartment.ownerDetails.name.trim()) {
          errors[`ownerName-${index}`] = "Owner name is required";
        }
        if (!apartment.ownerDetails.contact.trim()) {
          errors[`ownerContact-${index}`] = "Contact number is required";
        } else if (!/^\d{10}$/.test(apartment.ownerDetails.contact.replace(/\D/g, ''))) {
          errors[`ownerContact-${index}`] = "Please enter a valid 10-digit contact number";
        }
        if (!apartment.ownerDetails.email.trim()) {
          errors[`ownerEmail-${index}`] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(apartment.ownerDetails.email)) {
          errors[`ownerEmail-${index}`] = "Please enter a valid email address";
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
      // Scroll to first error
      const firstErrorElement = document.querySelector('.error');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({});
    
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
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
        navigate("/personal-dashboard-admin", { 
          state: { 
            apartmentsAdded: true,
            societyName: societyData.name 
          }
        });
      }, 2000);
    } catch (error) {
      console.error("Error adding apartments:", error);
      const errorMessage = error.response?.data?.message || "Failed to add apartments. Please try again.";
      setFormErrors({ submit: errorMessage });
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
    
    // Clear owner details when status changes to Vacant
    if (field === 'status' && value === 'Vacant') {
      updatedForms[index].ownerDetails = {
        name: '',
        contact: '',
        email: ''
      };
    }
    
    setApartmentForms(updatedForms);
    
    // Clear related errors when field is updated
    const errorKeysToRemove = Object.keys(formErrors).filter(key => 
      key.includes(`-${index}`) && (
        key.startsWith(field.split('.')[0]) || 
        (field === 'status' && key.includes('owner'))
      )
    );
    
    if (errorKeysToRemove.length > 0) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        errorKeysToRemove.forEach(key => delete newErrors[key]);
        return newErrors;
      });
    }
  };

  // Get summary statistics
  const getFormSummary = () => {
    const vacant = apartmentForms.filter(apt => apt.status === 'Vacant').length;
    const occupied = apartmentForms.filter(apt => apt.status === 'Occupied').length;
    return { vacant, occupied, total: apartmentForms.length };
  };

  if (!societyData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading apartment forms...</p>
      </div>
    );
  }

  const summary = getFormSummary();

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
          <div className="form-summary">
            <p>Total Apartments: <strong>{summary.total}</strong></p>
            <p>Vacant: <span className="status-vacant">{summary.vacant}</span> | 
               Occupied: <span className="status-occupied">{summary.occupied}</span></p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Apartment Forms */}
          {apartmentForms.map((apartment, index) => (
            <div key={`${apartment.type}-${index}`} className="apartment-form-section">
              <div className="apartment-header">
                <h3><FaBuilding /> {apartment.name}</h3>
                <span className={`status-badge ${apartment.status.toLowerCase()}`}>
                  {apartment.status}
                </span>
              </div>
              
              {/* Apartment Basic Details */}
              <div className="form-row">
                <div className="form-group">
                  <label><FaRulerCombined /> Size (sq. ft.) *</label>
                  <input 
                    type="number"
                    min="1"
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
                    min="0"
                    value={apartment.price}
                    onChange={(e) => updateApartmentForm(index, 'price', e.target.value)}
                    placeholder="Enter apartment price"
                    className="price-input"
                  />
                </div>
              </div>

              {/* Status Radio Buttons */}
              <div className="form-group status-group">
                <label className="main-label">Apartment Status *</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input 
                      type="radio"
                      id={`vacant-${index}`}
                      name={`status-${index}`}
                      value="Vacant"
                      checked={apartment.status === 'Vacant'}
                      onChange={(e) => updateApartmentForm(index, 'status', e.target.value)}
                    />
                    <label htmlFor={`vacant-${index}`} className="radio-label">
                      <span className="radio-text">Vacant</span>
                      <span className="radio-description">Available for rent/sale</span>
                    </label>
                  </div>
                  
                  <div className="radio-option">
                    <input 
                      type="radio"
                      id={`occupied-${index}`}
                      name={`status-${index}`}
                      value="Occupied"
                      checked={apartment.status === 'Occupied'}
                      onChange={(e) => updateApartmentForm(index, 'status', e.target.value)}
                    />
                    <label htmlFor={`occupied-${index}`} className="radio-label">
                      <span className="radio-text">Occupied</span>
                      <span className="radio-description">Currently has residents</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Features Checkboxes */}
              <div className="form-group features-group">
                <label className="main-label">Features & Amenities</label>
                <div className="checkbox-grid">
                  {Object.keys(apartment.features).map((feature) => (
                    <div key={feature} className="checkbox-option">
                      <input 
                        type="checkbox"
                        id={`${apartment.name}-${feature}-${index}`}
                        checked={apartment.features[feature]}
                        onChange={(e) => updateApartmentForm(
                          index, 
                          `features.${feature}`, 
                          e.target.checked
                        )}
                      />
                      <label htmlFor={`${apartment.name}-${feature}-${index}`} className="checkbox-label">
                        {feature.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Details (if status is Occupied) */}
              {apartment.status === "Occupied" && (
                <div className="owner-details-section">
                  <h4><FaUser /> Owner Details</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label><FaUser /> Owner Name *</label>
                      <input 
                        type="text"
                        value={apartment.ownerDetails.name}
                        onChange={(e) => updateApartmentForm(
                          index, 
                          'ownerDetails.name', 
                          e.target.value
                        )}
                        placeholder="Enter owner's full name"
                        className={formErrors[`ownerName-${index}`] ? "error" : ""}
                      />
                      {formErrors[`ownerName-${index}`] && (
                        <div className="error-message">{formErrors[`ownerName-${index}`]}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label><FaPhone /> Contact Number *</label>
                      <input 
                        type="tel"
                        value={apartment.ownerDetails.contact}
                        onChange={(e) => updateApartmentForm(
                          index, 
                          'ownerDetails.contact', 
                          e.target.value
                        )}
                        placeholder="Enter 10-digit mobile number"
                        className={formErrors[`ownerContact-${index}`] ? "error" : ""}
                      />
                      {formErrors[`ownerContact-${index}`] && (
                        <div className="error-message">{formErrors[`ownerContact-${index}`]}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label><FaEnvelope /> Email Address *</label>
                    <input 
                      type="email"
                      value={apartment.ownerDetails.email}
                      onChange={(e) => updateApartmentForm(
                        index, 
                        'ownerDetails.email', 
                        e.target.value
                      )}
                      placeholder="Enter owner's email address"
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

          {formErrors.submit && (
            <div className="error-message form-error">
              <strong>Submission Error:</strong> {formErrors.submit}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => navigate("/add-society")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner small"></span>
                  Adding Apartments...
                </>
              ) : (
                `Add ${apartmentForms.length} Apartments`
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default AddApartmentForm;