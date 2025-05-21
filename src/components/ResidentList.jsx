import React, { useState } from 'react';

const ResidentList = () => {
  const [residents, setResidents] = useState([
    { id: 1, name: 'John Doe', apartment: 'A-101' },
    { id: 2, name: 'Jane Smith', apartment: 'B-202' },
  ]);

  return (
    <div>
      <h2>Residents</h2>
      <ul>
        {residents.map(resident => (
          <li key={resident.id}>
            {resident.name} - {resident.apartment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResidentList;
