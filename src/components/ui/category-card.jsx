import React from 'react';
import { cn } from '../../lib/utils';
import { Image } from './image';
import { createSlug } from '../../utils/stringUtils';

export const CategoryCard = ({ 
  category,
  gender,
  onNavigate,
  className,
  ...props
}) => {
  const handleClick = () => {
    const slug = createSlug(category.title);
    onNavigate(`/shop/${gender}/${slug}/${category.id}`);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between hover:bg-gray-50 p-1 rounded-lg cursor-pointer",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div className="flex items-center">
        <Image
          src={category.img}
          alt={category.displayTitle}
          className="w-10 h-10 rounded-lg"
          fallbackSrc={`${process.env.REACT_APP_API_URL}/assets/default-category.jpg`}
        />
        <span className="ml-3 text-gray-700">{category.displayTitle}</span>
      </div>
    </div>
  );
};
