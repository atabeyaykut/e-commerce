import React from 'react';

const PopularProduct = () => {
  const colors = ['bg-blue-500', 'bg-orange-500', 'bg-red-500', 'bg-black'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Product Info */}
        <div className="bg-white p-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-4">MOST POPULAR</h2>
          <p className="text-gray-600 text-center mb-8 max-w-md">
            We focus on ergonomics and meeting you where you work. It's only a keystroke away.
          </p>

          <div className="w-full max-w-md">
            <img
              src="https://picsum.photos/seed/snacks/400/400"
              alt="Favorite Day Snacks"
              className="w-full h-auto mb-6"
            />

            <h3 className="text-lg font-medium text-center mb-2">English Department</h3>
            <div className="flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-5h2v-4H9v4zm0-6h2V4H9v2z" />
              </svg>
              <span className="text-gray-600">15 Sales</span>
            </div>

            <div className="flex items-center justify-center mb-6">
              <span className="text-gray-400 line-through mr-2">$16.48</span>
              <span className="text-green-600 font-bold">$6.48</span>
            </div>

            <div className="flex justify-center space-x-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full ${color} hover:ring-2 hover:ring-offset-2 transition-all`}
                  aria-label={`Color option ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Featured Image */}
        <div className="bg-yellow-400 rounded-lg overflow-hidden">
          <img
            src="https://picsum.photos/seed/burger/800/800"
            alt="Featured Food"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
