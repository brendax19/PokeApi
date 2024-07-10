import React from 'react';
import { Form } from 'react-bootstrap';

const TypeFilter = ({ types, selectedType, setSelectedType }) => {
  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="type-filter-container">
      <Form.Label className="type-filter-label">Filtrar por tipo:</Form.Label>
      <Form.Control
        as="select"
        value={selectedType}
        onChange={handleChange}
        className="type-filter-select"
      >
        <option value="">Todos</option>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </Form.Control>
    </div>
  );
};

export default TypeFilter;
