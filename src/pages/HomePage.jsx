import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroSlider from '../components/ui/HeroSlider';
import Categories from '../components/ui/Categories';
import ProductGrid from '../components/ecommerce/ProductGrid';
import BrandLogos from '../components/ui/BrandLogos';
import FeaturedPosts from '../components/ui/FeaturedPosts';
import BestsellerProducts from '../components/ui/BestsellerProducts';
import MostPopular from '../components/ui/MostPopular';
import FurnitureProducts from '../components/ui/FurnitureProducts';
import PopularProduct from '../components/ui/PopularProduct';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Slider */}
      <div className="mb-12">
        <HeroSlider />
      </div>

      {/* Categories */}
      <div className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <Categories />
        </div>
      </div>

      {/* Bestseller Products */}
      <div className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <BestsellerProducts />
        </div>
      </div>

      {/* Most Popular Products */}
      <div className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <MostPopular />
        </div>
      </div>

      {/* Furniture Products */}
      <div className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <FurnitureProducts />
        </div>
      </div>

      {/* Popular Products */}
      <div className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <PopularProduct />
        </div>
      </div>

      {/* Product Grid */}
      <div className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <ProductGrid />
        </div>
      </div>

      {/* Brand Logos */}
      <div className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <BrandLogos />
        </div>
      </div>

      {/* Featured Blog Posts */}
      <div className="mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <FeaturedPosts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
