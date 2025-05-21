import React from "react";
import "./About.css"; 

const About = () => {
  return (
    <main className="about-main">
      <section className="about-header">
        <h1>About Us</h1>
        <p>Welcome to Housingfy, where we strive to create a better living experience for all residents.</p>
      </section>

      <section className="about-content">
        <h2>Our Mission</h2>
        <p>
          At Housingfy, we are dedicated to managing and maintaining residential communities, ensuring a safe, comfortable, and well-managed environment. Our goal is to enhance the living experience for every resident.
        </p>

        <h2>Our Vision</h2>
        <p>
          We aim to be a leader in property management, setting standards for excellence, innovation, and sustainability. We focus on fostering strong communities and providing exceptional services that make residents feel at home.
        </p>
      </section>

      <section className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <h3>Abhay Singh</h3>
          <p>CEO - Leading our vision and ensuring the highest quality of service.</p>
        </div>
        <div className="team-member">
          <h3>Manas Joshi</h3>
          <p>Property Manager - Overseeing day-to-day operations and ensuring resident satisfaction.</p>
        </div>
        <div className="team-member">
          <h3>Yagnit Mahajan</h3>
          <p>CTO - Driving the technological innovation and development of Housingfy.</p>
        </div>
      </section>
    </main>
  );
};

export default About;
