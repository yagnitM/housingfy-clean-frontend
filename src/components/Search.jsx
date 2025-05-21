import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const data = [
    { id: 1, name: "John Doe", category: "Resident" },
    { id: 2, name: "Monthly Expenses Report", category: "Finance" },
    { id: 3, name: "Lift Maintenance Task", category: "Maintenance" }
  ];

  const handleSearch = () => {
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div className="search">
      <h2>Search Records</h2>
      <input
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              {result.name} - <span>{result.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;

