import React from 'react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/1920/600)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <span className="text-sm font-semibold uppercase tracking-wider">Summer 2024</span>
          <h1 className="mt-4 text-5xl font-bold">NEW COLLECTION</h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            We know how large objects will act, but things on a small scale just do not act that way.
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
  );
};

export default HeroSlider;
