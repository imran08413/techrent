import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Подключение стилей Bootstrap и Slick-слайдера
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Глобальные стили для переменных цветов
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);