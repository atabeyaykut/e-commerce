import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1C1F2C] text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Consulting Agency For Your Business</h2>
          <p className="text-gray-400">the quick fox jumps over the lazy dog</p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold mb-4">Company Info</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Carrier</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">We are hiring</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Carrier</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">We are hiring</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-bold mb-4">Features</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">Business Marketing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">User Analytic</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Live Chat</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Unlimited Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">iOS & Android</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Watch a Demo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Customers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-t border-gray-700">
          <div className="flex flex-col space-y-2 mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">(480) 555-0103</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">4517 Washington Ave.</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400">debra.holt@example.com</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8">
          Made With Love By Finland All Right Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
