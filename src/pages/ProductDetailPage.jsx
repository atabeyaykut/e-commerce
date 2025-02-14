import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogos from '../components/ui/BrandLogos';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Bu veriyi API'den alacağız, şimdilik statik
  const product = {
    name: 'Monitor stand',
    price: '$11.99.99',
    rating: 4,
    reviews: 12,
    availability: 'In Stock',
    description: 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM minim non desert Alamo est sit cliquey dolor do met sent.',
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4'
    ]
  };

  const handlePrevImage = () => {
    setDirection(-1);
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setDirection(1);
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="bg-white">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex justify-start mx-4 mb-8">
          <ol className="flex items-center space-x-2 text-md">
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-900 font-bold">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-400 mx-2">›</span>
            </li>
            <li>
              <span className="text-gray-400">Shop</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 400, damping: 30 },
                    opacity: { duration: 0.1 }
                  }}
                  custom={direction}
                />
              </AnimatePresence>
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 cursor-pointer h-6 text-gray-800" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 cursor-pointer h-6 text-gray-800" />
              </button>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > selectedImage ? 1 : -1);
                    setSelectedImage(index);
                  }}
                  className={`flex-shrink-0 w-24 h-24 bg-gray-100 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={`${index < product.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-blue-600">{product.price}</div>

            {/* Availability */}
            <div className="text-sm text-gray-600">
              Availability: <span className="text-blue-600">{product.availability}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 border-b-2 border-gray-300 py-4 pb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="flex pt-6 items-center space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 rounded-full focus:outline-none ${selectedColor === index ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(index)}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 max-w-sm pt-2">
              <button className="flex-1 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
                Select Options
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
                Description
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Additional Information
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Reviews (0)
              </button>
            </nav>
          </div>

          <div className="py-12">
            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Image */}
              <div>
                <div className="aspect-w-4 aspect-h-4 bg-gray-100">
                  <img 
                    src="https://picsum.photos/400/400?random=5" 
                    alt="Product Description" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Middle Column - Description */}
              <div>
                <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
                <p className="text-gray-600 mb-6">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>
                <p className="text-gray-600 mb-6">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>
                <p className="text-gray-600">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>
              </div>

              {/* Right Column - Lists */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-4 bg-gray-300"></div>
                      <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-4 bg-gray-300"></div>
                      <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-4 bg-gray-300"></div>
                      <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-4 bg-gray-300"></div>
                      <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-4 bg-gray-300"></div>
                      <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-4 bg-gray-300"></div>
                      <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-4 bg-gray-300"></div>
                      <p className="text-gray-600">the quick fox jumps over the lazy dog</p>
                    </div>
                  </div>
                </div>
              </div>
          
              
            </div>
                {/* Bestseller Products */}
        <div className="py-16">
          <h2 className="text-2xl font-bold mb-8">BESTSELLER PRODUCTS</h2>
          <div className="grid grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="group">
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <img
                    src={`https://picsum.photos/400/400?random=${item + 10}`}
                    alt={`Product ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Graphic Design</h3>
                  <p className="text-sm text-gray-500">English Department</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 line-through">$16.48</span>
                    <span className="text-green-500 font-medium">$6.48</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
           
          </div>
          <div>
                <BrandLogos />
              </div>
        </div>        
      </div>
    </div>
  );
};

export default ProductDetailPage;
