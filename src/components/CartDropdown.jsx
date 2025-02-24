import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import {
  removeFromCart,
  updateItemCount,
} from '../store/slices/cartSlice';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => state.cart || { items: [] });
  
  const totalItems = items?.reduce((sum, item) => sum + (item?.count || 0), 0) || 0;
  const totalPrice = items?.reduce((sum, item) => sum + ((item?.product?.price || 0) * (item?.count || 0)), 0) || 0;

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCount = (productId, newCount) => {
    if (newCount >= 1) {
      dispatch(updateItemCount({ productId, count: newCount }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[400px] divide-y divide-gray-100">
      <div className="p-4">
        <h3 className="text-base font-medium">Sepetim ({totalItems} Ürün)</h3>
      </div>

      {!items?.length ? (
        <div className="p-4">
          <div className="text-center py-4 text-gray-500">
            Sepetiniz boş
          </div>
        </div>
      ) : (
        <>
          <div className="max-h-[400px] overflow-auto divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item?.product?.id} className="p-4 flex gap-4">
                <img
                  src={item?.product?.images?.[0]?.url}
                  alt={item?.product?.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <Link 
                        to={`/product/${item?.product?.id}`}
                        className="text-sm font-medium hover:text-blue-600 line-clamp-2"
                      >
                        {item?.product?.name}
                      </Link>
                      <div className="text-xs text-gray-500 mt-1">
                        Beden: {item?.product?.size || 'Tek Ebat'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item?.product?.id)}
                      className="text-gray-400 hover:text-red-500 text-xl leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded">
                      <button
                        className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        onClick={() => handleUpdateCount(item?.product?.id, (item?.count || 0) - 1)}
                        disabled={(item?.count || 0) <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 py-1 text-sm border-x">{item?.count || 0}</span>
                      <button
                        className="px-2 py-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleUpdateCount(item?.product?.id, (item?.count || 0) + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-sm font-medium">
                      {((item?.product?.price || 0) * (item?.count || 0)).toFixed(2)} TL
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4">
            <div className="flex justify-between text-sm mb-4">
              <span>Toplam ({totalItems} Ürün)</span>
              <span className="font-medium">{totalPrice.toFixed(2)} TL</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/shoppingcart">
                  Sepete Git
                </Link>
              </Button>
              <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                <Link to="/checkout">
                  Siparişi Tamamla
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
