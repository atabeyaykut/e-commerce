import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Get In Touch */}
          <div>
            <h3 className="text-xl font-bold mb-3">Get In Touch</h3>
            <p className="text-gray-600 mb-3">
              the quick fox jumps over the lazy dog
            </p>
            <div className="flex gap-2">
              <a href="#" className="text-[#23A6F0] hover:text-blue-700">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-[#23A6F0] hover:text-blue-700">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-[#23A6F0] hover:text-blue-700">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-3">Company info</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Carrier</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">We are hiring</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold mb-3">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Business Marketing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">User Analytic</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Live Chat</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Unlimited Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">iOS & Android</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Watch a Demo</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Customers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">API</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 mt-10 pt-6 border-t">
          Made With Love By Figmaland All Right Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
