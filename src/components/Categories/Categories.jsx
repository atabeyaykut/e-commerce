import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../actions/categoryActions';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, featuredCategories, isLoading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getCategorySlug = (category) => {
    if (category.slug) return category.slug;
    return category.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[ğ]/g, 'g')
      .replace(/[ü]/g, 'u')
      .replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9-]/g, '');
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${getCategorySlug(category)}/${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={category.img || `https://picsum.photos/seed/${category.id}/200/200`}
                alt={category.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = `https://picsum.photos/seed/${category.id}/200/200`;
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{category.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${getCategorySlug(category)}/${category.id}`}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="aspect-square mb-2 overflow-hidden rounded">
                <img
                  src={category.img || `https://picsum.photos/seed/${category.id}/200/200`}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${category.id}/200/200`;
                  }}
                />
              </div>
              <h3 className="text-center font-medium">{category.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
