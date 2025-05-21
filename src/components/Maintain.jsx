import React from "react";
import "./Maintain.css";

const Maintain = () => {
  const maintenanceTasks = [
    { id: 1, task: "Lift Maintenance", status: "Completed", date: "2025-03-05" },
    { id: 2, task: "Water Pipeline Repair", status: "Pending", date: "2025-03-10" },
    { id: 3, task: "Garden Cleaning", status: "In Progress", date: "2025-03-12" }
  ];

  return (
    <div className="maintain">
      <h2>Maintenance Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceTasks.map((task) => (
            <tr key={task.id} className={task.status.toLowerCase().replace(" ", "-")}>
              <td>{task.id}</td>
              <td>{task.task}</td>
              <td>{task.status}</td>
              <td>{task.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintain;

