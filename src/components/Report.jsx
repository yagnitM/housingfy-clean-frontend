import React from "react";
import "./Report.css";

const Report = () => {
  const reports = [
    { id: 1, title: "Monthly Expenses", type: "Finance", date: "2025-03-01" },
    { id: 2, title: "Maintenance Summary", type: "Maintenance", date: "2025-03-05" },
    { id: 3, title: "Resident Complaints", type: "Community", date: "2025-03-10" }
  ];

  return (
    <div className="report">
      <h2>Generated Reports</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className={report.type.toLowerCase()}>
              <td>{report.id}</td>
              <td>{report.title}</td>
              <td>{report.type}</td>
              <td>{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;

