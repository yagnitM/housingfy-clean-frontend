import React from "react";
import "./Community.css";

const Community = () => {
  const events = [
    { id: 1, name: "Yoga Session", date: "2025-04-01", location: "Clubhouse", description: "Morning yoga session for all residents." },
    { id: 2, name: "Festival Celebration", date: "2025-04-10", location: "Central Park", description: "Join us for a community festival celebration." },
    { id: 3, name: "Blood Donation Camp", date: "2025-04-15", location: "Community Hall", description: "Donate blood and help save lives." }
  ];

  return (
    <div className="community">
      <h2>Community Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;

