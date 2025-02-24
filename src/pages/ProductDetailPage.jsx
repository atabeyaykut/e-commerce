import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogos from '../components/ui/BrandLogos';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { fetchProduct } from '../store/actions/productActions';
import { clearSelectedProduct } from '../store/slices/productSlice';
import { Button } from '../components/ui/button';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetailPage = ({ match }) => {
  const { productId } = match.params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const history = useHistory();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.selectedProduct);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  const handleBack = () => {
    history.goBack();
  };

  const handlePrevImage = () => {
    if (!selectedProduct?.images?.length) return;
    setDirection(-1);
    setSelectedImage((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedProduct?.images?.length) return;
    setDirection(1);
    setSelectedImage((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    setSelectedImage(0);
  }, [selectedProduct?.id]);

  const handleAddToCart = () => {
    if (!selectedSize && selectedProduct.sizes?.length > 0) {
      alert("Lütfen bir beden seçin");
      return;
    }

    const productToAdd = {
      ...selectedProduct,
      size: selectedSize
    };

    dispatch(addToCart(productToAdd));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Button onClick={handleBack} className="mb-4 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back
        </Button>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="container mx-auto p-8">
        <Button onClick={handleBack} className="mb-4 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back
        </Button>
        <div>Product not found</div>
      </div>
    );
  }

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
        <Button onClick={handleBack} className="mb-8 flex items-center gap-2 hover:bg-gray-100">
          <ArrowLeft size={20} />
          Back to Shopping
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  {selectedProduct?.images?.length > 0 ? (
                    <motion.img
                      key={selectedImage}
                      src={selectedProduct.images[selectedImage]?.url}
                      alt={`${selectedProduct.name} - Image ${selectedImage + 1}`}
                      className="w-full h-full object-contain"
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={direction}
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      No image available
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Arrows - Only show if there are multiple images */}
              {selectedProduct?.images?.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={handlePrevImage}
                    className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Images - Only show if there are multiple images */}
            {selectedProduct?.images?.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > selectedImage ? 1 : -1);
                      setSelectedImage(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${selectedProduct.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={`${index < selectedProduct.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{selectedProduct.reviews} Reviews</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-blue-600">{selectedProduct.price}</div>

            {/* Availability */}
            <div className="text-sm text-gray-600">
              Availability: <span className="text-blue-600">{selectedProduct.availability}</span>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>

            {/* Size Selection */}
            {selectedProduct.sizes?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Beden</h3>
                <div className="grid grid-cols-4 gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-sm font-medium rounded-md border ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 hover:border-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Adet</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border rounded-md hover:border-gray-900"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border rounded-md hover:border-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
              disabled={selectedProduct.stock === 0}
              onClick={handleAddToCart}
            >
              {selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
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
