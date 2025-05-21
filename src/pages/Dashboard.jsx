import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { FaSignOutAlt, FaBuilding, FaUsers, FaClipboardList, FaChartLine, 
         FaCalendarAlt, FaTools, FaBullhorn, FaSearch, FaFileAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <main className="dashboard-main">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome to Your Dashboard</h1>
            <p>Your central hub for managing the housing complex efficiently.</p>
          </div>
          <Link to="/" className="logout-button">
            <button><FaSignOutAlt /> Logout</button>
          </Link>
        </header>
        
        {/* Centered Add Your Society Card */}
        <div className="centered-card">
          <Link to="/add-society" className="feature-card add-society-card">
            <div className="card-icon society-icon">
              <FaBuilding />
            </div>
            <div className="card-content">
              <h3>Add Your Society</h3>
              <p>Add a new residential society to manage apartments within it.</p>
            </div>
          </Link>
        </div>

        {/* Feature Grid Layout */}
        <section className="feature-grid">
          <Link to="/residents" className="feature-card residents-card">
            <div className="card-icon">
              <FaUsers />
            </div>
            <div className="card-content">
              <h3>Manage Residents</h3>
              <p>View and manage resident details with ease.</p>
            </div>
          </Link>
          
          <Link to="/complaints" className="feature-card">
            <div className="card-icon">
              <FaClipboardList />
            </div>
            <div className="card-content">
              <h3>Track Complaints</h3>
              <p>Monitor and resolve resident complaints quickly.</p>
            </div>
          </Link>
          
          <Link to="/finances" className="feature-card finance-card">
            <div className="card-icon">
              <FaChartLine />
            </div>
            <div className="card-content">
              <h3>Financial Overview</h3>
              <p>Access financial records and budgets.</p>
            </div>
          </Link>
          
          <Link to="/events" className="feature-card events-card">
            <div className="card-icon">
              <FaCalendarAlt />
            </div>
            <div className="card-content">
              <h3>Community Events</h3>
              <p>Plan and manage events in the complex.</p>
            </div>
          </Link>
          
          <Link to="/maintenance" className="feature-card">
            <div className="card-icon">
              <FaTools />
            </div>
            <div className="card-content">
              <h3>Maintenance Requests</h3>
              <p>Handle maintenance tasks efficiently.</p>
            </div>
          </Link>
          
          <Link to="/announcements" className="feature-card">
            <div className="card-icon">
              <FaBullhorn />
            </div>
            <div className="card-content">
              <h3>Announcements</h3>
              <p>Post and view community updates.</p>
            </div>
          </Link>
          
          <Link to="/search" className="feature-card">
            <div className="card-icon">
              <FaSearch />
            </div>
            <div className="card-content">
              <h3>Search</h3>
              <p>Find information quickly with advanced search.</p>
            </div>
          </Link>
          
          <Link to="/reports" className="feature-card">
            <div className="card-icon">
              <FaFileAlt />
            </div>
            <div className="card-content">
              <h3>Reports</h3>
              <p>Generate detailed reports on activities.</p>
            </div>
          </Link>
        </section>
        
        {/* This empty div creates space at the bottom to prevent overlap with footer */}
        <div className="page-footer-space"></div>
      </div>
    </main>
  );
};

export default Dashboard;