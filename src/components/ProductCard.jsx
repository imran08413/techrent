import React, { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);

  // Генерируем звездочки для рейтинга
  const renderStars = (rating) => {
    return [...Array(5)].map((star, index) => (
      <FaStar key={index} color={index < Math.round(rating) ? '#FFC107' : '#e4e5e9'} />
    ));
  };

  return (
    <Card 
      className="h-100 shadow-sm border-0 position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'hidden' }}
    >
      <Card.Img variant="top" src={product.image} />
      
      {/* Характеристики при наведении */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-50 d-flex align-items-center justify-content-center text-white"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.8)', 
          opacity: isHovered ? 1 : 0, 
          transition: 'opacity 0.3s',
          padding: '10px',
          textAlign: 'center'
        }}
      >
        <p className="m-0 fw-bold">{product.specs}</p>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-5">{product.name}</Card.Title>
        <div className="mb-2">{renderStars(product.rating)} <span className="text-muted ms-1">({product.rating})</span></div>
        <Card.Text className="fw-bold mb-3 fs-5" style={{ color: 'var(--primary)' }}>
          {product.price} ₽ / сутки
        </Card.Text>
        <Button 
          variant="success" 
          className="mt-auto w-100 fw-bold border-0"
          onClick={() => addToCart(product)}
        >
          В корзину
        </Button>
      </Card.Body>
    </Card>
  );
}