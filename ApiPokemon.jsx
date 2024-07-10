import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import CardApp from './components/CardApp'; 
import NavBarApp from './components/NavBarApp'; 
import SearchBar from './components/SearchBar'; 
import TypeFilter from './components/TypeFilter';
import './styles.css'; 

const url = 'https://pokeapi.co/api/v2/pokemon';
const typesUrl = 'https://pokeapi.co/api/v2/type';

export const ApiPokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetchTypes();
    fetchPokemons();
  }, [page, selectedType]);

  const fetchTypes = () => {
    axios.get(typesUrl)
      .then(response => {
        const results = response.data.results;
        const typeNames = results.map(type => type.name);
        setTypes(typeNames);
      })
      .catch(error => {
        console.log('Error al obtener los tipos de Pokémon:', error);
      });
  };

  const fetchPokemons = () => {
    axios.get(`${url}?limit=1000`)
      .then(response => {
        const results = response.data.results;
        const pokemonPromises = results.map(result =>
          axios.get(result.url).then(res => res.data)
        );
        
        Promise.all(pokemonPromises)
          .then(detailedResults => {
            const formattedPokemons = detailedResults.map(pokemon => ({
              id: pokemon.id,
              name: pokemon.name,
              height: pokemon.height,
              weight: pokemon.weight,
              image: pokemon.sprites.other['official-artwork'].front_default,
              types: pokemon.types.map(type => type.type.name),
            }));
            
            setPokemons(formattedPokemons);
            setTotalPages(Math.ceil(formattedPokemons.length / 20)); // Recalcular total de páginas
          })
          .catch(error => {
            console.log('Error al obtener detalles de los Pokémon:', error);
          });
      })
      .catch(error => {
        console.log('Error al obtener la lista de Pokémon:', error);
      });
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === '' || pokemon.types.includes(selectedType))
  );

  // Filtrar los Pokémon de acuerdo a la página actual
  const startIndex = (page - 1) * 20;
  const visiblePokemons = filteredPokemons.slice(startIndex, startIndex + 20);

  return (
    <>
      <NavBarApp
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        isFirstPage={page === 1}
        isLastPage={page === totalPages || totalPages === 0} // Manejar caso donde no hay páginas
      />
      <Container fluid>
        <h1>PokeBrendi</h1>
        <Row>
          <Col>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </Col>
          <Col>
            <TypeFilter types={types} selectedType={selectedType} setSelectedType={setSelectedType} />
          </Col>
        </Row>
        <Row className="card-container">
          {visiblePokemons.map(pokemon => (
            <Col key={pokemon.id} className="d-flex justify-content-center">
              <CardApp pokemon={pokemon} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
