import React from 'react';
import { cn } from '../../lib/utils';

export const Price = ({ 
  amount, 
  oldAmount, 
  currency = 'TL',
  className,
  oldPriceClassName 
}) => {
  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : price;
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-lg font-bold text-blue-600">
        {formatPrice(amount)} {currency}
      </span>
      {oldAmount && (
        <span className={cn("text-sm text-gray-500 line-through", oldPriceClassName)}>
          {formatPrice(oldAmount)} {currency}
        </span>
      )}
    </div>
  );
};
