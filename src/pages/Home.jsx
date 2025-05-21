import React from "react";
import { Link } from "react-router-dom";
import residentImage from "../assets/resident-management.jpg";
import complaintImage from "../assets/complaint-tracking.jpg";
import financialImage from "../assets/financial-report.jpg";
import paymentImage from "../assets/payment-reminder.jpg";
import communityImage from "../assets/community-notices.jpg";
import eventImage from "../assets/event-scheduling.jpg";
import secureImage from "../assets/secure-login.jpg";
import customizeImage from "../assets/customizable-setting.jpg";
import supportImage from "../assets/support.jpg";

const Home = () => {
  const features = [
    {
      id: 1,
      title: "Resident Management",
      description: "Keep track of all residents efficiently.",
      image: residentImage,
    },
    {
      id: 2,
      title: "Complaint Tracking",
      description: "Log and monitor complaints easily.",
      image: complaintImage,
    },
    {
      id: 3,
      title: "Financial Reports",
      description: "Stay updated on finances with detailed reports.",
      image: financialImage,
    },
    {
      id: 4,
      title: "Payment Reminders",
      description: "Automatic reminders for maintenance dues.",
      image: paymentImage,
    },
    {
      id: 5,
      title: "Community Notices",
      description: "Broadcast important updates to all residents.",
      image: communityImage,
    },
    {
      id: 6,
      title: "Event Scheduling",
      description: "Plan and manage community events effortlessly.",
      image: eventImage,
    },
    {
      id: 7,
      title: "Secure Access",
      description: "Only authorized users can log in.",
      image: secureImage,
    },
    {
      id: 8,
      title: "Customizable Settings",
      description: "Personalize the platform to suit your needs.",
      image: customizeImage,
    },
    {
      id: 9,
      title: "24/7 Support",
      description: "Get help anytime with our dedicated support team.",
      image: supportImage,
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">WELCOME TO HOUSINGFY</h1>
          <p className="hero-subtitle">
            Manage residents, complaints, and finances with ease.
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-button login-btn">
              Login
            </Link>
            <Link to="/signup" className="cta-button signup-btn">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Our Key Features</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-image-container">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="feature-image"
                />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial-card">
            <p className="testimonial-text">
              "Housingfy revolutionized how we manage our community. The resident 
              management and payment reminder features have saved us countless hours."
            </p>
            <p className="testimonial-author">- Jane Smith, Property Manager</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "The complaint tracking system has improved our response time and 
              resident satisfaction significantly."
            </p>
            <p className="testimonial-author">- Robert Johnson, HOA President</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bottom-cta-section">
        <h2 className="cta-title">Ready to transform your community management?</h2>
        <p className="cta-description">
          Join thousands of satisfied housing managers today.
        </p>
        <Link to="/signup" className="cta-button large-cta-btn">
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default Home;