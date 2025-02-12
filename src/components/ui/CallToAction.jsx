import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-purple-600">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4">Fast Delivery</h2>
            <p className="text-xl text-white mb-6">
              Get your food delivered to your doorstep within 30 minutes
            </p>
            <Link
              to="/shop"
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Order Now
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/delivery/scooter-guy.jpg"
              alt="Delivery"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
