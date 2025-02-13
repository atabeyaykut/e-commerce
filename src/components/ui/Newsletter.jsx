import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Get daily news on upcoming offers from many suppliers all over the world</p>
          <form className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0">
            <input
              type="email"
              placeholder="Your Email"
              className="px-6 py-3 rounded-full md:rounded-r-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 md:w-80"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-3 rounded-full md:rounded-l-none hover:bg-blue-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
