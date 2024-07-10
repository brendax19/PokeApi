import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const PokemonModal = ({ show, onHide, pokemon }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={pokemon.image} alt={pokemon.name} className="img-fluid mb-3" />
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Height:</strong> {pokemon.height}</ListGroup.Item>
          <ListGroup.Item><strong>Weight:</strong> {pokemon.weight}</ListGroup.Item>
          <ListGroup.Item><strong>Types:</strong> {pokemon.types.join(', ')}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonModal;
