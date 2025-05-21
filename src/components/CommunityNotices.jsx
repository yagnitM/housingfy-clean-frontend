import React from "react";
import "./CommunityNotices.css"; // You can style the Community Notices page here

const CommunityNotices = () => {
  return (
    <main className="notices-main">
      <section className="notices-header">
        <h1>Community Notices</h1>
        <p>Stay informed about the latest updates, events, and important announcements within the community.</p>
      </section>

      <section className="notices-list">
        <div className="notice-card">
          <h3>Scheduled Maintenance - Elevator Repairs</h3>
          <p>Our building’s elevators will undergo maintenance on 15th January from 9 AM to 12 PM. Please plan accordingly.</p>
        </div>
        <div className="notice-card">
          <h3>Community Event - Winter Fest</h3>
          <p>Join us for our annual Winter Fest on 20th January at the community center. Enjoy food, games, and more!</p>
        </div>
        <div className="notice-card">
          <h3>Noise Level Reminder</h3>
          <p>Residents are reminded to keep noise levels to a minimum during the hours of 10 PM to 7 AM. Thank you for your cooperation!</p>
        </div>
        {/* Add more notices as needed */}
      </section>
    </main>
  );
};

export default CommunityNotices;
