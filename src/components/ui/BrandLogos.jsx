import React from 'react';

const BrandLogos = () => {
  const brands = [
    {
      name: 'Brand 1',
      logo: 'https://picsum.photos/100/50?random=1',
    },
    {
      name: 'Brand 2',
      logo: 'https://picsum.photos/100/50?random=2',
    },
    {
      name: 'Brand 3',
      logo: 'https://picsum.photos/100/50?random=3',
    },
    {
      name: 'Brand 4',
      logo: 'https://picsum.photos/100/50?random=4',
    },
    {
      name: 'Brand 5',
      logo: 'https://picsum.photos/100/50?random=5',
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center">
        {brands.map((brand, index) => (
          <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-40 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandLogos;
