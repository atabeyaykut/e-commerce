import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://picsum.photos/1920/600?random=1',
      season: 'Summer 2024',
      title: 'NEW COLLECTION',
      description: 'We know how large objects will act, but things on a small scale just do not act that way.',
    },
    {
      id: 2,
      image: 'https://picsum.photos/1920/600?random=2',
      season: 'Winter 2024',
      title: 'SEASONAL DEALS',
      description: 'Discover our latest winter collection with amazing discounts on selected items.',
    },
    {
      id: 3,
      image: 'https://picsum.photos/1920/600?random=3',
      season: 'Spring 2024',
      title: 'FRESH ARRIVALS',
      description: 'Explore our new spring collection featuring vibrant colors and modern designs.',
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <div 
            className="relative h-[600px] bg-cover bg-center" 
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <span className="text-sm font-semibold uppercase tracking-wider">{slide.season}</span>
                <h1 className="mt-4 text-5xl font-bold">{slide.title}</h1>
                <p className="mt-4 text-lg max-w-xl mx-auto">
                  {slide.description}
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
