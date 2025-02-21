import React from 'react';
import { useHistory } from 'react-router-dom';

const API_URL = 'https://workintech-fe-ecommerce.onrender.com';

const mockCategories = [
  {
    "id": 1,
    "code": "k:tisort",
    "title": "Tişört",
    "img": `${API_URL}/assets/category-img/category_kadın_tişört.jpg`,
    "rating": 4.2,
    "gender": "k"
  },
  {
    "id": 2,
    "code": "k:ayakkabi",
    "title": "Ayakkabı",
    "img": `${API_URL}/assets/category-img/category_kadın_ayakkabı.jpg`,
    "rating": 4.9,
    "gender": "k"
  },
  {
    "id": 3,
    "code": "k:ceket",
    "title": "Ceket",
    "img": `${API_URL}/assets/category-img/category_kadın_ceket.jpg`,
    "rating": 3.8,
    "gender": "k"
  },
  {
    "id": 4,
    "code": "k:elbise",
    "title": "Elbise",
    "img": `${API_URL}/assets/category-img/category_kadın_elbise.jpg`,
    "rating": 4.1,
    "gender": "k"
  },
  {
    "id": 5,
    "code": "k:etek",
    "title": "Etek",
    "img": `${API_URL}/assets/category-img/category_kadın_etek.jpg`,
    "rating": 3.9,
    "gender": "k"
  },
  {
    "id": 6,
    "code": "k:gomlek",
    "title": "Gömlek",
    "img": `${API_URL}/assets/category-img/category_kadın_gömlek.jpg`,
    "rating": 3.1,
    "gender": "k"
  },
  {
    "id": 7,
    "code": "k:kazak",
    "title": "Kazak",
    "img": `${API_URL}/assets/category-img/category_kadın_kazak.jpg`,
    "rating": 2.9,
    "gender": "k"
  },
  {
    "id": 8,
    "code": "k:pantalon",
    "title": "Pantalon",
    "img": `${API_URL}/assets/category-img/category_kadın_pantalon.jpg`,
    "rating": 3.8,
    "gender": "k"
  },
  {
    "id": 9,
    "code": "e:ayakkabı",
    "title": "Ayakkabı",
    "img": `${API_URL}/assets/category-img/category_erkek_ayakkabı.jpg`,
    "rating": 4.6,
    "gender": "e"
  },
  {
    "id": 10,
    "code": "e:ceket",
    "title": "Ceket",
    "img": `${API_URL}/assets/category-img/category_erkek_ceket.jpg`,
    "rating": 4.1,
    "gender": "e"
  },
  {
    "id": 11,
    "code": "e:gomlek",
    "title": "Gömlek",
    "img": `${API_URL}/assets/category-img/category_erkek_gömlek.jpg`,
    "rating": 3.9,
    "gender": "e"
  },
  {
    "id": 12,
    "code": "e:kazak",
    "title": "Kazak",
    "img": `${API_URL}/assets/category-img/category_erkek_kazak.jpg`,
    "rating": 3.2,
    "gender": "e"
  },
  {
    "id": 13,
    "code": "e:pantalon",
    "title": "Pantalon",
    "img": `${API_URL}/assets/category-img/category_erkek_pantalon.jpg`,
    "rating": 3.5,
    "gender": "e"
  },
  {
    "id": 14,
    "code": "e:tisort",
    "title": "Tişört",
    "img": `${API_URL}/assets/category-img/category_erkek_tişört.jpg`,
    "rating": 4.3,
    "gender": "e"
  }
];

const ShopDropdown = ({ onMouseEnter, onMouseLeave }) => {
  const history = useHistory();

  const handleCategoryClick = (category, gender) => {
    const slug = category.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[ğ]/g, 'g')
      .replace(/[ü]/g, 'u')
      .replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9-]/g, '');

    const genderPath = gender === 'k' ? 'kadin' : 'erkek';
    history.push(`/shop/${genderPath}/${slug}/${category.id}`);
  };

  const renderCategoryList = (categories, gender, title) => (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <div
            key={category.id}
            className="py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
            onClick={() => handleCategoryClick(category, gender)}
          >
            <div className="flex items-center">
              <img
                src={category.img}
                alt={category.title}
                className="w-8 h-8 object-cover rounded mr-3"
                onError={(e) => {
                  e.target.src = `${API_URL}/assets/category-img/default.jpg`;
                }}
              />
              <span className="text-gray-700">{category.title}</span>
            </div>
          </div>
        ))}
        <div
          className="py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-blue-600"
          onClick={() => history.push(`/shop/${gender === 'k' ? 'kadin' : 'erkek'}`)}
        >
          Tümünü Gör →
        </div>
      </div>
    </div>
  );

  const womenCategories = mockCategories.filter(cat => cat.gender === 'k');
  const menCategories = mockCategories.filter(cat => cat.gender === 'e');

  return (
    <div
      className="absolute top-full left-0 mt-1 w-[800px] -ml-[200px] bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="px-6">
        <div className="grid grid-cols-2 gap-8">
          {renderCategoryList(womenCategories, 'k', 'Kadın')}
          {renderCategoryList(menCategories, 'e', 'Erkek')}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => history.push('/shop')}
            className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Tüm Ürünleri Gör
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDropdown;
