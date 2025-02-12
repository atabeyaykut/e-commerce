import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter */}
        <div className="py-12 border-b">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Bandage</h2>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 mb-4">Company Info</h3>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">About Us</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Carrier</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">We are hiring</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Blog</Link>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">About Us</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Carrier</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">We are hiring</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Blog</Link>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 mb-4">Features</h3>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Business Marketing</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">User Analytic</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Live Chat</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Unlimited Support</Link>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">IOS & Android</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Watch a Demo</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">Customers</Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900">API</Link>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 mb-4">Get In Touch</h3>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Subscribe
              </button>
            </div>
            <p className="text-gray-600 text-sm">
              Lore imp sum dolor Amit
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t">
          <p className="text-gray-600 text-center">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
