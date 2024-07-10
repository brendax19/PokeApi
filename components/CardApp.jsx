import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import PokemonModal from './PokemonModal';

const CardApp = ({ pokemon }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'normal':
        return 'type-normal';
      case 'fire':
        return 'type-fire';
      case 'water':
        return 'type-water';
      case 'electric':
        return 'type-electric';
      case 'grass':
        return 'type-grass';
      case 'ice':
        return 'type-ice';
      case 'fighting':
        return 'type-fighting';
      case 'poison':
        return 'type-poison';
      case 'ground':
        return 'type-ground';
      case 'flying':
        return 'type-flying';
      case 'psychic':
        return 'type-psychic';
      case 'bug':
        return 'type-bug';
      case 'rock':
        return 'type-rock';
      case 'ghost':
        return 'type-ghost';
      case 'dragon':
        return 'type-dragon';
      case 'dark':
        return 'type-dark';
      case 'steel':
        return 'type-steel';
      case 'fairy':
        return 'type-fairy';
      default:
        return '';
    }
  };

  return (
    <>
      <Card
        style={{ width: '18rem', margin: '10px' }}
        className={`card ${getTypeClass(pokemon.types[0])}`} 
      >
        <Card.Img variant="top" src={pokemon.image} />
        <Card.Body className="card-body">
          <Card.Title>{pokemon.name}</Card.Title>
          <Card.Text>
            <strong>Types:</strong> {pokemon.types.join(', ')}
            <br />
            <strong>Height:</strong> {pokemon.height}
            <br />
            <strong>Weight:</strong> {pokemon.weight}
          </Card.Text>
          <Button variant="primary" onClick={handleShowModal}>
            Ver detalles
          </Button>
        </Card.Body>
      </Card>

      <PokemonModal
        show={modalShow}
        onHide={handleCloseModal}
        pokemon={pokemon}
      />
    </>
  );
};

export default CardApp;
