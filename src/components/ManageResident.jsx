import React from "react";
import "./ManageResident.css";

const ManageResident = () => {
  const residents = [
    { id: 1, name: "Rahul Sharma", apartment: "A-101", contact: "9876543210" },
    { id: 2, name: "Priya Mehta", apartment: "B-202", contact: "8765432109" },
    { id: 3, name: "Amit Verma", apartment: "C-303", contact: "7654321098" }
  ];

  return (
    <div className="manage-residents">
      <h2>Manage Residents</h2>
      <button className="add-btn">Add Resident</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Apartment</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident) => (
            <tr key={resident.id}>
              <td>{resident.id}</td>
              <td>{resident.name}</td>
              <td>{resident.apartment}</td>
              <td>{resident.contact}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageResident;
