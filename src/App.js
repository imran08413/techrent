import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Navigation from './components/Navbar';
import Footer from './components/Footer'; // 1. Импортируем
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navigation /> {/* Шапка всегда сверху */}
        
        <div style={{ minHeight: '80vh' }}> {/* Обертка, чтобы футер не прилипал к верху */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        
        <Footer /> {/* 2. Футер всегда снизу */}
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;