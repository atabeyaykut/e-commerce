import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const FeaturedPosts = () => {
  const posts = [
    {
      id: 1,
      title: 'Discover New York',
      image: 'https://picsum.photos/800/500',
      date: 'Feb 12, 2024',
      category: 'Travel',
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    },
    {
      id: 2,
      title: 'Summer Collection',
      image: 'https://picsum.photos/800/500',
      date: 'Feb 11, 2024',
      category: 'Lifestyle',
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    },
    {
      id: 3,
      title: 'Food & Lifestyle',
      image: 'https://picsum.photos/800/500',
      date: 'Feb 10, 2024',
      category: 'Food',
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md group">
              <Link to={`/blog/${post.id}`} className="block">
                <div className="relative aspect-w-16 aspect-h-10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Read More
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
