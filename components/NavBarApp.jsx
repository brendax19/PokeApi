import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavBarApp = ({ onNextPage, onPrevPage, isFirstPage, isLastPage }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Pokémon API</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#pokemons">Pokémons</Nav.Link>
     
        </Nav>
        <Button variant="outline-light" onClick={onPrevPage} disabled={isFirstPage}>
          Previous Page
        </Button>
        <Button variant="outline-light" className="ms-2" onClick={onNextPage} disabled={isLastPage}>
          Next Page
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBarApp;
