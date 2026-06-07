import React from 'react';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function HeroSlider() {
  const navigate = useNavigate();

  // Настройки для автопрокрутки по ТЗ
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const slides = [
    { title: 'Аренда дронов', img: 'https://via.placeholder.com/1200x400/1E1E2F/FFFFFF?text=Аренда+дронов', cat: 'photo' },
    { title: 'Строительный инструмент', img: 'https://via.placeholder.com/1200x400/0052CC/FFFFFF?text=Строительный+инструмент', cat: 'build' },
    { title: 'Фото и видео', img: 'https://via.placeholder.com/1200x400/FF6B00/FFFFFF?text=Фото+и+видео', cat: 'photo' },
  ];

  return (
    <div className="mb-5 overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div style={{
              backgroundImage: `url(${slide.img})`,
              height: '400px', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
              <h1 className="bg-dark text-white p-3 rounded opacity-75">{slide.title}</h1>
              <Button 
                variant="warning" 
                size="lg" 
                className="mt-3 fw-bold" 
                onClick={() => navigate(`/catalog?category=${slide.cat}`)}
              >
                Смотреть каталог
              </Button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}