import React from "react";
import "./Services.css"; // You can style the Services page here

const Services = () => {
  return (
    <main className="services-main">
      <section className="services-header">
        <h1>Our Services</h1>
        <p>Explore the wide range of services we offer to ensure a comfortable and well-managed living environment.</p>
      </section>

      <section className="services-list">
        <div className="service-card">
          <h3>Resident Management</h3>
          <p>We offer seamless management of resident details, ensuring easy access to important information.</p>
        </div>
        <div className="service-card">
          <h3>Maintenance Requests</h3>
          <p>Efficiently handle maintenance issues with a simple and fast process for reporting and resolving problems.</p>
        </div>
        <div className="service-card">
          <h3>Event Planning</h3>
          <p>Organize and manage community events to foster engagement and enhance the living experience.</p>
        </div>
        <div className="service-card">
          <h3>Financial Overview</h3>
          <p>Access financial records and budgets to keep residents informed of the community’s financial health.</p>
        </div>
        {/* Add more services as needed */}
      </section>
    </main>
  );
};

export default Services;
