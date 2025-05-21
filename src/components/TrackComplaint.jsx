import React from "react";
import "./TrackComplaint.css";

const TrackComplaint = () => {
  const complaints = [
    { id: 1, resident: "Rahul Sharma", issue: "Water leakage", status: "Pending" },
    { id: 2, resident: "Priya Mehta", issue: "Power outage", status: "Resolved" },
    { id: 3, resident: "Amit Verma", issue: "Elevator issue", status: "In Progress" }
  ];

  return (
    <div className="track-complaint">
      <h2>Track Complaints</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Resident</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.resident}</td>
              <td>{complaint.issue}</td>
              <td className={complaint.status.toLowerCase().replace(" ", "-")}>
                {complaint.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackComplaint;
