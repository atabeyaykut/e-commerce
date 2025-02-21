import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'Unique Life',
      subtitle: 'Your Space',
      image: 'https://picsum.photos/400/300?random=1',
      link: '/',
      buttonText: 'Explore Items'
    },
    {
      id: 2,
      title: 'Elements Style',
      subtitle: 'Ends Today',
      image: 'https://picsum.photos/400/300?random=2',
      link: '/',
      buttonText: 'Explore Items'
    },
    {
      id: 3,
      title: 'Elements Style',
      subtitle: 'Ends Today',
      image: 'https://picsum.photos/400/300?random=3',
      link: '/',
      buttonText: 'Explore Items'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="group overflow-hidden border-none shadow-none">
            <CardContent className="p-0">
              <AspectRatio ratio={4/3} className="relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-white text-sm mb-2">{category.subtitle}</span>
                  <h3 className="text-white text-2xl font-bold mb-4">{category.title}</h3>
                  <Link
                    to={category.link}
                    className="text-white text-sm hover:underline"
                  >
                    {category.buttonText}
                  </Link>
                </div>
              </AspectRatio>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
