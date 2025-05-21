import React from "react";
import "./Financial.css";

const Financial = () => {
  const transactions = [
    { id: 1, description: "Maintenance Fees", amount: 5000, date: "2025-03-01" },
    { id: 2, description: "Event Sponsorship", amount: 2000, date: "2025-03-05" },
    { id: 3, description: "Repair Costs", amount: -1500, date: "2025-03-10" }
  ];

  return (
    <div className="financial">
      <h2>Financial Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount (₹)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className={txn.amount < 0 ? "expense" : "income"}>
              <td>{txn.id}</td>
              <td>{txn.description}</td>
              <td>{txn.amount}</td>
              <td>{txn.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Financial;
