import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SocietyDash() {
  const { id: societyId } = useParams();
  const [society, setSociety] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch society details
    fetch(`/api/societies/${societyId}`)
      .then(res => res.json())
      .then(data => setSociety(data))
      .catch(err => console.error("Error fetching society:", err));
  }, [societyId]);

  if (!society) return <div className="society-dash-loading">Loading society info...</div>;

  return (
    <div className="society-dash-container">
      <h1 className="society-title">{society.name}</h1>
      <p className="society-address">📍 {society.address}</p>
      <p className="society-id">Society ID: {societyId}</p>

      <div className="feature-grid">
        <FeatureCard 
          title="Add Apartment"
          description="Add a new apartment to this society"
          onClick={() => navigate(`/society/${societyId}/add-apartment`)}
        />

        <FeatureCard 
          title="View Apartments"
          description="Manage all apartments in this society"
          onClick={() => navigate(`/society/${societyId}/apartments`)}
        />

        <FeatureCard 
          title="View Residents"
          description="See all registered residents"
          onClick={() => navigate(`/society/${societyId}/residents`)}
        />

        <FeatureCard 
          title="Complaints"
          description="Monitor and resolve complaints"
          onClick={() => navigate(`/society/${societyId}/complaints`)}
        />

        <FeatureCard 
          title="Maintenance Requests"
          description="Handle maintenance issues efficiently"
          onClick={() => navigate(`/society/${societyId}/maintenance`)}
        />

        <FeatureCard 
          title="Announcements"
          description="Create and view society-wide announcements"
          onClick={() => navigate(`/society/${societyId}/announcements`)}
        />

        <FeatureCard 
          title="Community Events"
          description="Manage upcoming events and participation"
          onClick={() => navigate(`/society/${societyId}/events`)}
        />

        <FeatureCard 
          title="Financial Overview"
          description="View billing, payments, and budget details"
          onClick={() => navigate(`/society/${societyId}/finance`)}
        />

        <FeatureCard 
          title="Reports"
          description="Generate reports for this society"
          onClick={() => navigate(`/society/${societyId}/reports`)}
        />

        <FeatureCard 
          title="← Back to All Societies"
          description="Return to society selection"
          onClick={() => navigate("/admin/societies")}
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, onClick }) {
  return (
    <div className="feature-card" onClick={onClick}>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default SocietyDash;
