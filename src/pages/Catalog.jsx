import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Accordion } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  // Состояния фильтров
  const [category, setCategory] = useState(categoryFromUrl || 'all');
  const [brand, setBrand] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('popular'); // popular, cheap, exp

  const [filteredProducts, setFilteredProducts] = useState(products);

  // Логика фильтрации и сортировки
  useEffect(() => {
    let result = [...products];

    // Фильтр по категории
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    // Фильтр по бренду
    if (brand !== 'all') {
      result = result.filter(p => p.brand === brand);
    }
    // Фильтр по цене
    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    // Сортировка
    if (sortOrder === 'popular') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === 'cheap') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'exp') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [category, brand, minPrice, maxPrice, sortOrder]);

  return (
    <Container className="py-5">
      <Row>
        {/* Боковая панель фильтров (Sidebar) */}
        <Col lg={3} className="mb-4">
          <Accordion defaultActiveKey="0" className="d-lg-none mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Фильтры</Accordion.Header>
              <Accordion.Body>
                {/* Здесь можно продублировать фильтры для мобилок, но мы скроем блок через CSS по ТЗ */}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="d-none d-lg-block p-4 bg-white rounded shadow-sm border">
            <h5 className="mb-3 fw-bold">Категория</h5>
            <Form.Select className="mb-4" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">Все категории</option>
              <option value="build">Стройинструмент</option>
              <option value="garden">Сад</option>
              <option value="photo">Фото / Видео</option>
              <option value="it">IT Оборудование</option>
              <option value="generators">Генераторы</option>
            </Form.Select>

            <h5 className="mb-3 fw-bold">Бренд</h5>
            <Form.Select className="mb-4" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="all">Все бренды</option>
              <option value="Bosch">Bosch</option>
              <option value="Makita">Makita</option>
              <option value="DJI">DJI</option>
              <option value="Sony">Sony</option>
              <option value="Apple">Apple</option>
              <option value="Honda">Honda</option>
            </Form.Select>

            <h5 className="mb-3 fw-bold">Цена за сутки</h5>
            <div className="d-flex gap-2 mb-4">
              <Form.Control type="number" placeholder="От" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <Form.Control type="number" placeholder="До" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
          </div>
        </Col>

        {/* Основная сетка товаров */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0 fw-bold">Каталог техники</h2>
            <Form.Select style={{ width: '250px' }} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="popular">По популярности</option>
              <option value="cheap">Сначала дешевые</option>
              <option value="exp">Сначала дорогие</option>
            </Form.Select>
          </div>

          <Row className="g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Col md={6} lg={4} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <h5 className="text-muted mt-5 text-center">Товары не найдены. Измените параметры фильтра.</h5>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}