import React from 'react';

const BrandLogos = () => {
  const brands = [
    { id: 1, name: 'Hooli', logo: '/images/brands/hooli.png' },
    { id: 2, name: 'Lyft', logo: '/images/brands/lyft.png' },
    { id: 3, name: 'Pied Piper', logo: '/images/brands/piper.png' },
    { id: 4, name: 'Stripe', logo: '/images/brands/stripe.png' },
    { id: 5, name: 'AWS', logo: '/images/brands/aws.png' },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <img
              key={brand.id}
              src={brand.logo}
              alt={brand.name}
              className="h-8 object-contain grayscale hover:grayscale-0 transition-all"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
