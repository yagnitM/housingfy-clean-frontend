import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import ResiDashboard from "./pages/ResiDashboard";
import About from "./components/About";
import Services from "./components/Services";
import CommunityNotices from "./components/CommunityNotices";
import ContactUs from "./components/ContactUs";
import AddApartmentForm from "./components/AddApartmentForm";
import AddSocietyForm from "./components/AddSocietyForm";
import GuestDash from "./pages/GuestDash";
import PersonalDashboardAdmin from "./components/PersonalDashboardAdmin";
import ManageResident from "./components/ManageResident";
import TrackComplaint from "./components/TrackComplaint";
import Financial from "./components/Financial";
import Community from "./components/Community";
import Maintain from "./components/Maintain";
import Announce from "./components/Announce";
import Search from "./components/Search";
import Report from "./components/Report";
import SocietyDash from "./components/SocietyDash";


function App() {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Header based on the route */}
      {location.pathname !== "/dashboard" && location.pathname !== "/residashboard" && <Header />}

      <div id="root">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/residashboard" element={<ResiDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/community-notices" element={<CommunityNotices />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/add-apartment" element={<AddApartmentForm />} />
            <Route path="/add-society" element={<AddSocietyForm />} />
            <Route path="/guest-dashboard" element={<GuestDash />} />
            <Route path="/personal-dashboard-admin" element={<PersonalDashboardAdmin />} />
            <Route path="/announcements" element={<Announce />} />
            <Route path="/search" element={<Search />} />
            <Route path="/finances" element={<Financial />} />
            <Route path="/events" element={<Community />} />
            <Route path="/complaints" element={<TrackComplaint />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/maintenance" element={<Maintain />} />
            <Route path="/residents" element={<ManageResident />} />
            <Route path="/society-dash" element={<SocietyDash.jsx />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
