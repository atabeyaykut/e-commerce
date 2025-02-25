import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  removeFromCart,
  updateItemCount,
  toggleItemCheck,
  toggleAllItems
} from '../store/slices/cartSlice';

function ShoppingCartPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { items = [] } = useSelector((state) => state.cart || { items: [] });
  
  const allChecked = items.length > 0 && items.every(item => item.checked);
  const selectedItems = items.filter(item => item.checked);
  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const totalItems = selectedItems.reduce((sum, item) => sum + item.count, 0);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCount = (productId, newCount) => {
    if (newCount >= 1) {
      dispatch(updateItemCount({ productId, count: newCount }));
    }
  };

  const handleToggleCheck = (productId) => {
    dispatch(toggleItemCheck(productId));
  };

  const handleToggleAll = () => {
    dispatch(toggleAllItems(!allChecked));
  };

  if (!items.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Sepetiniz boş</h2>
          <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünleri keşfedin.</p>
          <Button onClick={() => history.push('/shop')}>
            Alışverişe Başla
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Alışveriş Sepeti</h1>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleToggleAll}
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead>Ürün</TableHead>
              <TableHead className="w-32 text-right">Fiyat</TableHead>
              <TableHead className="w-32 text-center">Adet</TableHead>
              <TableHead className="w-32 text-right">Toplam</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item?.product?.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleCheck(item.product.id)}
                    className="rounded border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={item?.product?.images?.[0]?.url}
                      alt={item?.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <Link 
                        to={`/product/${item?.product?.id}`}
                        className="font-medium hover:text-blue-600"
                      >
                        {item?.product?.name}
                      </Link>
                      {item?.product?.size && (
                        <div className="text-sm text-gray-500 mt-1">
                          Beden: {item.product.size}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {item?.product?.price?.toFixed(2)} TL
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <button
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      onClick={() => handleUpdateCount(item.product.id, item.count - 1)}
                      disabled={item.count <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">{item.count}</span>
                    <button
                      className="p-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {(item?.product?.price * item.count).toFixed(2)} TL
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">Sipariş Özeti</h3>
            <p className="text-sm text-gray-500 mt-1">
              Seçili {totalItems} ürün
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {totalAmount.toFixed(2)} TL
            </div>
            <Button 
              className="mt-4 bg-orange-500 hover:bg-orange-600" 
              disabled={selectedItems.length === 0}
              onClick={() => history.push('/order')}
            >
              Seçilen Ürünleri Satın Al
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartPage;
