import React, { useState, useRef, useCallback, memo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Search, ShoppingCart, Heart, Menu, X, Phone, Mail, User } from 'lucide-react';
import md5 from 'md5';
import ShopDropdown from './ShopDropdown';

const shopCategories = {
  women: ['Bags', 'Belts', 'Cosmetics', 'Bags', 'Hats'],
  men: ['Bags', 'Belts', 'Cosmetics', 'Bags', 'Hats']
};

const Header = memo(() => {
  const { isAuthenticated, user, logout } = useAuthStore();
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
    }, 200);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    history.push('/');
  }, [logout, history]);

  // Create Gravatar URL if user exists
  const gravatarUrl = user ? `https://www.gravatar.com/avatar/${md5(user.email.toLowerCase().trim())}?s=32&d=identicon` : '';

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Contact Info */}
            <div className="flex items-center space-x-4">
              <a href="tel:+1234567890" className="flex items-center text-gray-600 hover:text-gray-800">
                <Phone size={16} className="mr-1" />
                <span>+123 456 7890</span>
              </a>
              <a href="mailto:info@example.com" className="flex items-center text-gray-600 hover:text-gray-800">
                <Mail size={16} className="mr-1" />
                <span>info@example.com</span>
              </a>
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
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Ana Sayfa
              </Link>
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => history.push('/shop')}
                >
                  Kategoriler
                </button>
                {isShopDropdownOpen && (
                  <ShopDropdown
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                )}
              </div>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">
                Hakkımızda
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-800">
                İletişim
              </Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Auth Section */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => history.push('/account')}
                      className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                      <img
                        src={gravatarUrl}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2">{user.name}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Çıkış
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-600 hover:text-gray-800">
                      Giriş
                    </Link>
                    <Link to="/signup" className="text-gray-600 hover:text-gray-800">
                      Kayıt Ol
                    </Link>
                  </>
                )}
              </div>

              {/* Cart and Favorites */}
              <div className="flex items-center space-x-4">
                <Link to="/favorites" className="text-gray-600 hover:text-gray-800">
                  <Heart size={24} />
                </Link>
                <Link to="/cart" className="text-gray-600 hover:text-gray-800">
                  <ShoppingCart size={24} />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Ana Sayfa
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Kategoriler
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Hakkımızda
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              İletişim
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Giriş
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Kayıt Ol
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
