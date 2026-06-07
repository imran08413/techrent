import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import QRCode from 'react-qr-code';
import L from 'leaflet';

// Исправление иконки для Leaflet (стандартный баг)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const schema = Yup.object().shape({
  name: Yup.string().required('Введите имя'),
  email: Yup.string().email('Неверный email').required('Введите email'),
  message: Yup.string().required('Напишите что-нибудь'),
});

export default function Contacts() {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Контакты и Оформление</h2>
      <Row>
        <Col md={6}>
          <Formik
            validationSchema={schema}
            initialValues={{ name: '', email: '', message: '' }}
            onSubmit={(values) => alert('Заявка отправлена: ' + JSON.stringify(values))}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control type="text" name="name" onChange={handleChange} isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Отправить заявку</Button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col md={6}>
          <h5>Наш офис</h5>
          <div style={{ height: '300px', width: '100%' }}>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[51.505, -0.09]}>
                <Popup>TechRent HQ</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="mt-4">
            <h5>Скачать прайс-лист:</h5>
            <QRCode value="https://techrent.example/price.pdf" size={128} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}