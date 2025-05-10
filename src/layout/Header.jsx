import React, { useState, useCallback, memo, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Search, ShoppingCart, Heart, Menu, X, Phone, Mail, User } from 'lucide-react';
import md5 from 'md5';
import api from '../services/api';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import CartDropdown from "../components/CartDropdown";

const Header = memo(() => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      const transformedCategories = response.data.map(category => ({
        ...category,
        displayTitle: getCategoryDisplayTitle(category.title)
      }));
      setCategories(transformedCategories);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  // Function to convert Turkish category titles to English
  const getCategoryDisplayTitle = (title) => {
    const titleMap = {
      'Tişört': 'T-Shirt',
      'Ayakkabı': 'Shoes',
      'Ceket': 'Jacket',
      'Elbise': 'Dress',
      'Etek': 'Skirt',
      'Gömlek': 'Shirt',
      'Kazak': 'Sweater',
      'Pantalon': 'Pants'
    };
    return titleMap[title] || title;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    let timer;
    const avatarContainer = document.querySelector('.avatar-container');
    const profileMenu = document.querySelector('.profile-menu');

    if (avatarContainer && profileMenu) {
      avatarContainer.addEventListener('mouseleave', () => {
        timer = setTimeout(() => {
          profileMenu.style.display = 'none';
        }, 100);
      });
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const gravatarUrl = user ? `https://www.gravatar.com/avatar/${md5(user.email.toLowerCase().trim())}?s=32&d=identicon` : '';

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
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0 hover:bg-transparent cursor-pointer">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0 hover:bg-transparent cursor-pointer">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0 hover:bg-transparent cursor-pointer">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0 hover:bg-transparent cursor-pointer">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0 hover:bg-transparent cursor-pointer">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </Button>
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
            <Link to="/" className="text-2xl font-bold cursor-pointer">
              E-Commerce
            </Link>

            {/* Main Navigation */}
            <nav className="hidden md:flex">
              <ul className="flex items-center gap-8">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2 cursor-pointer"
                  >
                    Home
                  </Link>
                </li>
                <li className="relative group">
                  <button
                    onClick={() => history.push('/shop')}
                    className="text-gray-600 cursor-pointer hover:text-gray-800 px-3 py-2"
                  >
                    Shop
                  </button>
                  <div className="invisible group-hover:visible absolute top-full left-1/4 -translate-x-1/3 w-[520px] bg-white pr-3 rounded-lg shadow-lg border border-gray-100 py-5 z-50">
                    <div className="flex justify-between px-20  gap-2">
                      {/* Women Categories */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Women</h3>
                        <div className="space-y-1">
                          {loading ? (
                            <div className="text-center py-4">Loading categories...</div>
                          ) : error ? (
                            <div className="text-center text-red-500 py-4">{error}</div>
                          ) : (
                            <>
                              {categories
                                .filter(cat => cat.gender === 'k')
                                .map((category) => (
                                  <div
                                    key={category.id}
                                    className="flex items-center justify-between hover:bg-gray-50 p-1 rounded-lg cursor-pointer"
                                    onClick={() => {
                                      const slug = category.title
                                        .toLowerCase()
                                        .replace(/[ı]/g, 'i')
                                        .replace(/[ğ]/g, 'g')
                                        .replace(/[ü]/g, 'u')
                                        .replace(/[ş]/g, 's')
                                        .replace(/[ö]/g, 'o')
                                        .replace(/[ç]/g, 'c')
                                        .replace(/[^a-z0-9-]/g, '');
                                      history.push(`/shop/kadin/${slug}/${category.id}`);
                                    }}
                                  >
                                    <div className="flex items-center">
                                      <img
                                        src={category.img}
                                        alt={`${category.displayTitle} category`}
                                        className="w-10 h-10 object-cover rounded-lg"
                                        onError={(e) => {
                                          e.target.src = `${API_URL}/assets/default-category.jpg`;
                                        }}
                                      />
                                      <span className="ml-3 text-gray-700">{category.displayTitle}</span>
                                    </div>
                                  </div>
                                ))}
                              <div
                                className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer mt-4 font-medium"
                                onClick={() => history.push('/shop/kadin')}
                              >
                                View All →
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Men Categories */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Men</h3>
                        <div className="space-y-1">
                          {loading ? (
                            <div className="text-center py-4">Loading categories...</div>
                          ) : error ? (
                            <div className="text-center text-red-500 py-4">{error}</div>
                          ) : (
                            <>
                              {categories
                                .filter(cat => cat.gender === 'e')
                                .map((category) => (
                                  <div
                                    key={category.id}
                                    className="flex items-center justify-between hover:bg-gray-50 p-1 rounded-lg cursor-pointer"
                                    onClick={() => {
                                      const slug = category.title
                                        .toLowerCase()
                                        .replace(/[ı]/g, 'i')
                                        .replace(/[ğ]/g, 'g')
                                        .replace(/[ü]/g, 'u')
                                        .replace(/[ş]/g, 's')
                                        .replace(/[ö]/g, 'o')
                                        .replace(/[ç]/g, 'c')
                                        .replace(/[^a-z0-9-]/g, '');
                                      history.push(`/shop/erkek/${slug}/${category.id}`);
                                    }}
                                  >
                                    <div className="flex items-center">
                                      <img
                                        src={category.img}
                                        alt={`${category.displayTitle} category`}
                                        className="w-10 h-10 object-cover rounded-lg"
                                        onError={(e) => {
                                          e.target.src = `${API_URL}/assets/default-category.jpg`;
                                        }}
                                      />
                                      <span className="ml-3 text-gray-700">{category.displayTitle}</span>
                                    </div>
                                  </div>
                                ))}
                              <div
                                className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer mt-4 font-medium"
                                onClick={() => history.push('/shop/erkek')}
                              >
                                View All →
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2 cursor-pointer"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2 cursor-pointer"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2 cursor-pointer"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="relative avatar-container">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative h-8 w-8">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={gravatarUrl} alt={user?.name} />
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link to="/my-account" className="w-full cursor-pointer">
                          My Account
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-800" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-800" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800 hover:bg-transparent p-0 cursor-pointer" asChild>
                  <Link to="/favorites">
                    <Heart className="h-6 w-6" />
                  </Link>
                </Button>
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-800 hover:bg-transparent p-0 relative group-hover:text-orange-500 cursor-pointer"
                    asChild
                  >
                    <Link to="/cart">
                      <ShoppingCart className="h-6 w-6" />
                      <span className="sr-only">Sepetim</span>
                    </Link>
                  </Button>
                  <div className="absolute right-0 top-full invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pt-2">
                    <CartDropdown />
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-600 hover:text-gray-800 hover:bg-transparent p-0 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-3 space-y-1">
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3 cursor-pointer" asChild>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3 cursor-pointer" asChild>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3 cursor-pointer" asChild>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3 cursor-pointer" asChild>
              <Link to="/team" onClick={() => setIsMenuOpen(false)}>
                Team
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3 cursor-pointer" asChild>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </Button>
            {!isAuthenticated && (
              <>
                <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3 cursor-pointer" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3 cursor-pointer" asChild>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
});

export default Header;
