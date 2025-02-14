import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Memoized Components
const ProductCard = memo(({ product }) => (
  <div className="group relative">
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
      <img
        loading="lazy"
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        width="400"
        height="400"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">
          <Link to={`/products/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.department}</p>
      </div>
      <p className="text-sm font-medium text-gray-900">
        <span className="text-gray-400 text-sm line-through mr-2">${product.price}</span>
        <span className="text-green-600 text-sm font-semibold">${product.salePrice}</span>
      </p>
    </div>
  </div>
));

const ProductGrid = ({ products }) => {
  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">BESTSELLER PRODUCTS</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default memo(ProductGrid);
