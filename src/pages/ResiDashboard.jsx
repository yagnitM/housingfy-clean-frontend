import React from "react";
import { Link } from "react-router-dom";
import "./ResiDashboard.css";

const ResiDashboard = () => {
  return (
    <main className="resi-dashboard-main">
      <header className="resi-dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Manage your apartment and stay updated with community activities.</p>
      </header>

      <Link to="/" className="logout-button">
        <button>Logout</button>
      </Link>

      {/* Centered Apartment Details Card */}
      <div className="centered-card">
        <Link to="/my-apartment" className="feature-card my-apartment-card">
          <h3>My Apartment</h3>
          <p>View and manage your apartment details.</p>
        </Link>
      </div>

      {/* 2x4 Grid Layout */}
      <section className="feature-grid">
        <Link to="/complaints" className="feature-card">
          <h3>File a Complaint</h3>
          <p>Submit a complaint regarding any issues.</p>
        </Link>
        <Link to="/maintenance" className="feature-card">
          <h3>Maintenance Requests</h3>
          <p>Request repairs or maintenance services.</p>
        </Link>
        <Link to="/events" className="feature-card">
          <h3>Community Events</h3>
          <p>Stay informed about upcoming events.</p>
        </Link>
        <Link to="/announcements" className="feature-card">
          <h3>Announcements</h3>
          <p>Read important community updates.</p>
        </Link>
        <Link to="/payments" className="feature-card">
          <h3>Payments</h3>
          <p>View and pay your housing bills online.</p>
        </Link>
        <Link to="/search" className="feature-card">
          <h3>Search</h3>
          <p>Find specific information easily.</p>
        </Link>
        <Link to="/profile" className="feature-card">
          <h3>Profile Settings</h3>
          <p>Update your personal details and preferences.</p>
        </Link>
        <Link to="/feedback" className="feature-card">
          <h3>Feedback & Support</h3>
          <p>Share your feedback or seek assistance.</p>
        </Link>
      </section>
    </main>
  );
};

export default ResiDashboard;
