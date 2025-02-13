import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroSlider from '../components/ui/HeroSlider';
import Categories from '../components/ui/Categories';
import CategoryFilter from '../components/ui/CategoryFilter';
import CategoryPick from '../components/ui/CategoryPick';
import ProductGrid from '../components/ecommerce/ProductGrid';
import BrandLogos from '../components/ui/BrandLogos';
import FeaturedPosts from '../components/ui/FeaturedPosts';
import BestsellerProducts from '../components/ui/BestsellerProducts';
import MostPopular from '../components/ui/MostPopular';
import FurnitureProducts from '../components/ui/FurnitureProducts';
import PopularProduct from '../components/ui/PopularProduct';

const HomePage = () => {
  const products = [
    {
      id: 1,
      name: 'Chicken Wings',
      price: 9.99,
      oldPrice: 12.99,
      category: 'Food',
      image: '/images/products/wings.png',
      rating: 4,
      sale: true
    },
    {
      id: 2,
      name: 'Fresh Lime',
      price: 4.99,
      category: 'Fruits',
      image: '/images/products/lime.png',
      rating: 5
    },
    {
      id: 3,
      name: 'Fresh Meat',
      price: 19.99,
      oldPrice: 24.99,
      category: 'Meat',
      image: '/images/products/meat.png',
      rating: 4,
      sale: true
    },
    {
      id: 4,
      name: 'Fresh Fish',
      price: 24.99,
      category: 'Seafood',
      image: '/images/products/fish.png',
      rating: 5
    }
  ];

  const featuredProducts = [
    {
      id: 5,
      name: 'Organic Banana',
      price: 3.99,
      category: 'Fruits',
      image: '/images/products/banana.png',
      rating: 4
    },
    {
      id: 6,
      name: 'Sweet Orange',
      price: 5.99,
      oldPrice: 7.99,
      category: 'Fruits',
      image: '/images/products/orange.png',
      rating: 5,
      sale: true
    },
    {
      id: 7,
      name: 'Fresh Vegetables',
      price: 7.99,
      category: 'Vegetables',
      image: '/images/products/vegetables.png',
      rating: 4
    },
    {
      id: 8,
      name: 'Fresh Bread',
      price: 2.99,
      category: 'Bakery',
      image: '/images/products/bread.png',
      rating: 5
    }
  ];

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
