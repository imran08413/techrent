import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// Импортируем иконки по ТЗ
import { FaTools, FaLeaf, FaCamera, FaLaptop, FaCar, FaBolt } from 'react-icons/fa';
import HeroSlider from '../components/HeroSlider';
import { products } from '../data/products';

export default function Home() {
  const navigate = useNavigate();

  const advantages = ['Залог под тариф', 'Доставка курьером', 'Страхование техники', '24/7 поддержка'];
  
  const categories = [
    { name: 'Стройка', icon: <FaTools size={40} />, val: 'build' },
    { name: 'Сад', icon: <FaLeaf size={40} />, val: 'garden' },
    { name: 'Фото', icon: <FaCamera size={40} />, val: 'photo' },
    { name: 'IT', icon: <FaLaptop size={40} />, val: 'it' },
    { name: 'Транспорт', icon: <FaCar size={40} />, val: 'transport' },
    { name: 'Генераторы', icon: <FaBolt size={40} />, val: 'generators' },
  ];

  return (
    <div className="pb-5">
      {/* 3.1 Hero-секция */}
      <HeroSlider />
      
      <Container>
        {/* 3.2 Блок преимуществ */}
        <h2 className="mb-4 fw-bold">Наши преимущества</h2>
        <Row className="mb-5 g-4">
          {advantages.map((adv, i) => (
            <Col lg={3} sm={6} key={i}>
              <Card className="text-center h-100 shadow-sm border-0" style={{ backgroundColor: 'var(--light-bg)' }}>
                <Card.Body className="d-flex align-items-center justify-content-center py-4">
                  <Card.Title className="m-0" style={{ color: 'var(--primary)' }}>{adv}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 3.3 Популярные категории */}
        <h2 className="mb-4 fw-bold">Популярные категории</h2>
        <Row className="mb-5 g-4">
          {categories.map((cat, i) => (
            <Col md={2} sm={4} xs={6} key={i}>
              <Card 
                className="text-center h-100 shadow-sm border-0 category-card" 
                style={{ cursor: 'pointer', transition: '0.3s' }}
                onClick={() => navigate(`/catalog?category=${cat.val}`)}
              >
                <Card.Body className="py-4">
                  <div className="mb-3" style={{ color: 'var(--secondary)' }}>{cat.icon}</div>
                  <Card.Title className="fs-6 m-0">{cat.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 3.4 Горячие предложения */}
        <h2 className="mb-4 fw-bold">Горячие предложения</h2>
        <Row className="g-4">
          {products.map((product) => (
            <Col lg={3} md={6} sm={6} key={product.id}>
              <Card className="h-100 shadow-sm border-0 position-relative">
                <Badge bg="danger" className="position-absolute top-0 start-0 m-2 px-2 py-2 shadow">
                  Скидка 20%
                </Badge>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-5">{product.name}</Card.Title>
                  <Card.Text className="fw-bold mb-3 fs-5" style={{ color: 'var(--primary)' }}>
                    {product.price} ₽ / сутки
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    className="mt-auto w-100 fw-bold border-0" 
                    style={{ backgroundColor: 'var(--primary)' }}
                    onClick={() => navigate('/catalog')}
                  >
                    В каталог
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}