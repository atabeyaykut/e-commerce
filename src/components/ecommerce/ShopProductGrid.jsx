import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopProductCard from './ShopProductCard';
import { fetchProducts, setLimit, setOffset } from '../../actions/productActions';

const ShopProductGrid = ({ className = "" }) => {
  const dispatch = useDispatch();
  const { products, limit, offset, total } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, limit, offset]);

  const handleLoadMore = () => {
    dispatch(setOffset(offset + limit));
  };

  const showLoadMore = products.length < total;

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
      {showLoadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopProductGrid;
