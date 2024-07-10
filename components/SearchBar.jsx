import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <Form.Control
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchQuery}
        onChange={handleChange}
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;
