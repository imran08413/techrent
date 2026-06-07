import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container className="text-center">
        <p>&copy; 2026 TechRent. Все права защищены.</p>
      </Container>
    </footer>
  );
}