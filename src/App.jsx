import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from './components/ui/toast';

import useAuthStore from './store/authStore';
import Header from './layout/Header';
import Footer from './layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const MyAccountPage = lazy(() => import('./pages/MyAccountPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CreateOrderPage = lazy(() => import('./pages/CreateOrderPage'));

const App = () => {
  const verifyToken = useAuthStore(state => state.verifyToken);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <Router>
      <ToastProvider>
        <div className="flex flex-col min-h-screen">
          <ToastContainer position="top-right" />
          <Header />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Switch>
                <Route exact path="/">
                  <Suspense fallback={<LoadingSpinner />}>
                    <HomePage />
                  </Suspense>
                </Route>
                <Route exact path="/login">
                  <Suspense fallback={<LoadingSpinner />}>
                    <LoginPage />
                  </Suspense>
                </Route>
                <Route exact path="/signup">
                  <Suspense fallback={<LoadingSpinner />}>
                    <SignupPage />
                  </Suspense>
                </Route>
                <Route exact path="/about">
                  <Suspense fallback={<LoadingSpinner />}>
                    <AboutPage />
                  </Suspense>
                </Route>
                <Route exact path="/contact">
                  <Suspense fallback={<LoadingSpinner />}>
                    <ContactPage />
                  </Suspense>
                </Route>
                <Route exact path="/team">
                  <Suspense fallback={<LoadingSpinner />}>
                    <TeamPage />
                  </Suspense>
                </Route>
                <Route exact path="/shop">
                  <Suspense fallback={<LoadingSpinner />}>
                    <ShopPage />
                  </Suspense>
                </Route>
                <Route exact path="/shop/:gender" render={({ match }) => (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ShopPage match={match} />
                  </Suspense>
                )} />
                <Route exact path={[
                  "/shop/kadin/:categoryName/:categoryId",
                  "/shop/erkek/:categoryName/:categoryId",
                  "/shop/men/:categoryName/:categoryId",
                  "/shop/women/:categoryName/:categoryId",
                  "/shop/unisex/:categoryName/:categoryId"
                ]} render={({ match }) => (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ShopPage match={match} />
                  </Suspense>
                )} />
                <Route
                  exact
                  path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
                  render={({ match }) => (
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProductDetailPage match={match} />
                    </Suspense>
                  )}
                />
                <ProtectedRoute exact path="/my-account">
                  <Suspense fallback={<LoadingSpinner />}>
                    <MyAccountPage />
                  </Suspense>
                </ProtectedRoute>
                <ProtectedRoute exact path="/cart">
                  <Suspense fallback={<LoadingSpinner />}>
                    <CartPage />
                  </Suspense>
                </ProtectedRoute>
                <ProtectedRoute exact path="/order">
                  <Suspense fallback={<LoadingSpinner />}>
                    <CreateOrderPage />
                  </Suspense>
                </ProtectedRoute>
                <Route path="*">
                  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600">Page not found</p>
                  </div>
                </Route>
              </Switch>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;
