import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroSlider from '../components/ui/HeroSlider';
import Categories from '../components/ui/Categories';
import CategoryFilter from '../components/ui/CategoryFilter';
import CategoryPick from '../components/ui/CategoryPick';
import ProductGrid from '../components/ecommerce/ProductGrid';
import CallToAction from '../components/ui/CallToAction';
import FeaturedPosts from '../components/ui/FeaturedPosts';

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
      <HeroSlider />

      {/* Categories */}
      <Categories />

      {/* Best Selling Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gray-50 py-12">
          <CategoryFilter />
          <ProductGrid
            title="Best Selling Products"
            products={products}
          />
        </div>
      </section>

      {/* Featured Products with Yellow Banner */}
      <section className="bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-xl">Get your favorite products at the best prices</p>
            </div>
            <div className="md:w-1/2">
              <img src="/images/banners/featured.jpg" alt="Featured Products" className="rounded-lg shadow-lg" />
            </div>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />

      {/* Featured Blog Posts */}
      <FeaturedPosts />
    </div>
  );
};

export default HomePage;
