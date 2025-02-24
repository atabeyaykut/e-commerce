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
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartDropdown from '../components/CartDropdown';

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
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0 hover:bg-transparent">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0 hover:bg-transparent">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
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
            <Link to="/" className="text-2xl font-bold">
              E-Commerce
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              <ul className="flex items-center gap-8">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2"
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
                  <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-lg shadow-lg border border-gray-100 p-6 z-50">
                    <div className="grid grid-cols-2 gap-12">
                      {/* Women Categories */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Women</h3>
                        <div className="space-y-3">
                          {loading ? (
                            <div className="text-center py-4">Loading categories...</div>
                          ) : error ? (
                            <div className="text-center text-red-500 py-4">{error}</div>
                          ) : (
                            categories.filter(cat => cat.gender === 'k').map((category) => (
                              <div
                                key={category.id}
                                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
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
                                    alt={category.displayTitle}
                                    className="w-12 h-12 object-cover rounded-lg"
                                    onError={(e) => {
                                      e.target.src = `${api.defaults.baseURL}/assets/default-category.jpg`;
                                    }}
                                  />
                                  <span className="ml-3 text-gray-700">{category.displayTitle}</span>
                                </div>
                                
                              </div>
                            ))
                          )}
                          <div
                            className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer mt-4 font-medium"
                            onClick={() => history.push('/shop/kadin')}
                          >
                            View All →
                          </div>
                        </div>
                      </div>

                      {/* Men Categories */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Men</h3>
                        <div className="space-y-3">
                          {loading ? (
                            <div className="text-center py-4">Loading categories...</div>
                          ) : error ? (
                            <div className="text-center text-red-500 py-4">{error}</div>
                          ) : (
                            categories.filter(cat => cat.gender === 'e').map((category) => (
                              <div
                                key={category.id}
                                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
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
                                    alt={category.displayTitle}
                                    className="w-12 h-12 object-cover rounded-lg"
                                    onError={(e) => {
                                      e.target.src = `${api.defaults.baseURL}/assets/default-category.jpg`;
                                    }}
                                  />
                                  <span className="ml-3 text-gray-700">{category.displayTitle}</span>
                                </div>
                                
                              </div>
                            ))
                          )}
                          <div
                            className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer mt-4 font-medium"
                            onClick={() => history.push('/shop/erkek')}
                          >
                            View All →
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => history.push('/shop')}
                        className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View All Products
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-gray-800 px-3 py-2"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Auth Section */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={gravatarUrl} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-600">{user.name}</span>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link to="/account" className="w-full">
                            Account
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <>
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-transparent" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-transparent" asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Cart and Favorites */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800 hover:bg-transparent p-0" asChild>
                  <Link to="/favorites">
                    <Heart className="h-6 w-6" />
                  </Link>
                </Button>
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-600 hover:text-gray-800 hover:bg-transparent p-0 relative group-hover:text-orange-500"
                    asChild
                  >
                    <Link to="/shoppingcart">
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
                className="md:hidden text-gray-600 hover:text-gray-800 hover:bg-transparent p-0"
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
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3" asChild>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3" asChild>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3" asChild>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3" asChild>
              <Link to="/team" onClick={() => setIsMenuOpen(false)}>
                Team
              </Link>
            </Button>
            <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3" asChild>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </Button>
            {!isAuthenticated && (
              <>
                <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 justify-start p-3" asChild>
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
