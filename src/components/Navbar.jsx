import React, { useContext } from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

export default function Navigation() {
  const { cart } = useContext(CartContext);

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">TechRent</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/catalog">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/contacts">Контакты</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
              <FaShoppingCart size={20} />
              <Badge bg="secondary" className="ms-2">
                {cart.length}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}