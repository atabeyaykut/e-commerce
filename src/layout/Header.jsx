import React, { useState, useRef, useCallback, memo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Search, ShoppingCart, Heart, Menu, X, Phone, Mail, User } from 'lucide-react';

const shopCategories = {
  women: ['Bags', 'Belts', 'Cosmetics', 'Bags', 'Hats'],
  men: ['Bags', 'Belts', 'Cosmetics', 'Bags', 'Hats']
};

const Header = memo(() => {
  const { isAuthenticated, logout } = useAuthStore();
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsShopDropdownOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 100);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    history.push('/');
  }, [logout, history]);

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Follow Us and get a chance to win 80% off</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow Us :</span>
              <div className="flex items-center space-x-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">
              E-Commerce
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <div className="relative">
                <Link to="/shop"
                  className="text-gray-600 cursor-pointer hover:text-blue-600"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Shop
                </Link>
                {isShopDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-96 bg-white shadow-lg rounded-md py-2 pl-4 z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-2 gap-8 p-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Kadın</h3>
                        <ul className="space-y-2">
                          {shopCategories.women.map((category, index) => (
                            <li key={index}>
                              <Link
                                to={`/shop/women/${category.toLowerCase()}`}
                                className="text-gray-600 hover:text-blue-600 block"
                              >
                                {category}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Erkek</h3>
                        <ul className="space-y-2">
                          {shopCategories.men.map((category, index) => (
                            <li key={index}>
                              <Link
                                to={`/shop/men/${category.toLowerCase()}`}
                                className="text-gray-600 hover:text-blue-600 block"
                              >
                                {category}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link to="/team" className="text-gray-600 hover:text-blue-600">
                Team
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Auth Section */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">My Account</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-blue-600 hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login" className="text-blue-600 hover:text-blue-700">
                      Login
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700">
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Icons */}
              <button className="text-gray-600 hover:text-blue-600">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/cart" className="text-gray-600 hover:text-blue-600 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link to="/wishlist" className="text-gray-600 hover:text-blue-600 relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <button
                className="md:hidden text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-base font-medium text-gray-700">
                  My Account
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
