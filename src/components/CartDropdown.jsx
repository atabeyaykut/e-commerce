import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { removeFromCart } from '../store/slices/cartSlice';
import { API_URL } from '../config/api';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { items, total } = useSelector((state) => state.cart);

  const handleRemoveItem = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart(productId));
  };

  const handleViewCart = () => {
    history.push('/shoppingcart');
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Sepetim ({items.length} ürün)</h3>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Sepetiniz boş</p>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 py-2">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.product.images?.[0]?.url || `${API_URL}/assets/default-product.jpg`}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.target.src = `${API_URL}/assets/default-product.jpg`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.count} x {item.product.price.toFixed(2)} TL
                    </p>
                    <button
                      onClick={(e) => handleRemoveItem(e, item.product.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Kaldır
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Toplam:</span>
                <span className="font-medium">{total.toFixed(2)} TL</span>
              </div>
              
              <Button
                onClick={handleViewCart}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
              >
                Sepete Git
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
