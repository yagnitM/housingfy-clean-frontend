import React, { useState } from 'react';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Complaint submitted: ${complaint}`);
    setComplaint('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Complaint</h2>
      <div>
        <label htmlFor="complaint">Complaint Description</label>
        <textarea
          id="complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Describe your issue here"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
