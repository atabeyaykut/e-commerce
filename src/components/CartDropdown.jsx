import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Trash2, Plus, Minus, Check } from 'lucide-react';
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { removeFromCart, updateItemCount, toggleItemCheck } from '../store/slices/cartSlice';
import { API_URL } from '../config/api';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { items, total } = useSelector((state) => state.cart);

  // Constants for calculation
  const SHIPPING_COST = 29.99;
  const DISCOUNT_PERCENTAGE = 10;

  const handleRemoveItem = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCount = (e, productId, newCount) => {
    e.preventDefault();
    e.stopPropagation();
    if (newCount >= 1) {
      dispatch(updateItemCount({ productId, count: newCount }));
    }
  };

  const handleToggleCheck = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleItemCheck(productId));
  };

  const handleViewCart = () => {
    history.push('/shoppingcart');
  };

  const handleCreateOrder = () => {
    // To be implemented in the next phase
    console.log('Creating order...');
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    if (item.checked) {
      return sum + (item.product.price * item.count);
    }
    return sum;
  }, 0);

  const discount = (subtotal * DISCOUNT_PERCENTAGE) / 100;
  const grandTotal = subtotal + SHIPPING_COST - discount;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Sepetim ({items.length} ürün)</h3>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Sepetiniz boş</p>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(checked) => handleToggleCheck({ preventDefault: () => {}, stopPropagation: () => {} }, item.product.id)}
                      aria-label="Select item"
                    />
                  </div>
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
                      {item.product.price.toFixed(2)} TL
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => handleUpdateCount(e, item.product.id, item.count - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">{item.count}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => handleUpdateCount(e, item.product.id, item.count + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-auto text-red-500 hover:text-red-600"
                        onClick={(e) => handleRemoveItem(e, item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ürünler Toplamı:</span>
                  <span className="font-medium">{subtotal.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kargo:</span>
                  <span className="font-medium">{SHIPPING_COST.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>İndirim ({DISCOUNT_PERCENTAGE}%):</span>
                  <span className="font-medium">-{discount.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Toplam:</span>
                  <span>{grandTotal.toFixed(2)} TL</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Button
                  className="w-full"
                  onClick={handleCreateOrder}
                  disabled={items.length === 0 || !items.some(item => item.checked)}
                >
                  Sipariş Oluştur
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleViewCart}
                >
                  Sepete Git
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
