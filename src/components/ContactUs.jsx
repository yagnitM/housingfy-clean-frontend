import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <main className="contact-us-container">
      <section className="contact-us-header">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
      </section>

      <section className="contact-us-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            required
          />
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default ContactUs;
