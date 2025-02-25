import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/slices/categorySlice';
import { Card, CardContent } from './ui/card';
import { Image } from './ui/image';
import { createSlug } from '../lib/utils';
import LoadingSpinner from './ui/loading-spinner';

/**
 * Categories component displays a grid of product categories
 * @returns {JSX.Element} Categories component
 */
const Categories = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { items: categories = [], status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleCategoryClick = (category) => {
    const categorySlug = createSlug(category.name);
    const genderPath = category.gender === 'k' ? 'women' : 'men';
    history.push(`/shop/${genderPath}/${categorySlug}/${category.id}`);
  };

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(null).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-0">
              <div className="relative aspect-[3/2] bg-gray-200" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-500 p-4">
        Failed to load categories. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="group cursor-pointer overflow-hidden"
          onClick={() => handleCategoryClick(category)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-[3/2]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white text-center px-4">
                  {category.name}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Categories;
