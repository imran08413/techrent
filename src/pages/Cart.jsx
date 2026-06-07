import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, ListGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Состояния для дат аренды
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Расчет количества дней
  const calculateDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays === 0 ? 1 : diffDays; // Минимум 1 день аренды
    }
    return 0;
  };

  const days = calculateDays();
  
  // Динамический расчет стоимости
  const totalItemsPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const finalPrice = totalItemsPrice * days;

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2 className="mb-4">Ваша корзина пуста</h2>
        <Button variant="primary" onClick={() => navigate('/catalog')}>Перейти в каталог</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-bold">Корзина</h2>
      <Row>
        {/* Список товаров */}
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm border-0">
            <ListGroup variant="flush">
              {cart.map(item => (
                <ListGroup.Item key={item.id} className="d-flex align-items-center py-3">
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} className="me-3" />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <div className="fw-bold" style={{ color: 'var(--primary)' }}>{item.price} ₽ / сутки</div>
                  </div>
                  <Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>
                    <FaTrash /> Удалить
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Панель расчета и оформления */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-3">Сроки аренды</h4>
            
            <div className="mb-3">
              <label className="d-block mb-1 text-muted">Дата начала:</label>
              <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                selectsStart 
                startDate={startDate} 
                endDate={endDate} 
                minDate={new Date()} 
                className="form-control"
                placeholderText="Выберите дату"
              />
            </div>
            
            <div className="mb-4">
              <label className="d-block mb-1 text-muted">Дата окончания:</label>
              <DatePicker 
                selected={endDate} 
                onChange={(date) => setEndDate(date)} 
                selectsEnd 
                startDate={startDate} 
                endDate={endDate} 
                minDate={startDate || new Date()} 
                className="form-control"
                placeholderText="Выберите дату"
              />
            </div>

            {days === 0 ? (
              <Alert variant="warning" className="text-center">
                Выберите сроки аренды для расчета итоговой суммы
              </Alert>
            ) : (
              <>
                <div className="d-flex justify-content-between mb-2">
                  <span>Количество дней:</span>
                  <span className="fw-bold">{days}</span>
                </div>
                <div className="d-flex justify-content-between mb-4 fs-5">
                  <span>Итого:</span>
                  <span className="fw-bold" style={{ color: 'var(--secondary)' }}>{finalPrice} ₽</span>
                </div>
                <Button 
                  variant="success" 
                  size="lg" 
                  className="w-100 fw-bold border-0"
                  onClick={() => navigate('/contacts')}
                >
                  Оформить заказ
                </Button>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}