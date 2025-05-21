import React from "react";
import "./Announce.css";

const Announce = () => {
  const announcements = [
    { id: 1, title: "Maintenance Alert", date: "2025-03-05", message: "Water supply will be off from 10 AM to 2 PM." },
    { id: 2, title: "Community Event", date: "2025-03-10", message: "Join us for a fun evening in the clubhouse!" },
    { id: 3, title: "Security Notice", date: "2025-03-12", message: "All residents must update their visitor logs." }
  ];

  return (
    <div className="announce">
      <h2>Announcements</h2>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>
            <h3>{announcement.title}</h3>
            <p>{announcement.message}</p>
            <span className="date">{announcement.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announce;

