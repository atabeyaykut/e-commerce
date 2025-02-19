import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

import useAuthStore from './store/authStore';
import Header from './layout/Header';
import Footer from './layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

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

function App() {
  const { verifyToken } = useAuthStore();

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ToastContainer position="top-right" />
        <Header />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Switch>
              <Route exact path="/" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <HomePage />
                </Suspense>
              )} />
              <Route path="/login" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <LoginPage />
                </Suspense>
              )} />
              <Route path="/signup" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <SignupPage />
                </Suspense>
              )} />
              <Route exact path="/shop" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ShopPage />
                </Suspense>
              )} />
              <Route exact path="/shop/:category" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ShopPage />
                </Suspense>
              )} />
              <Route exact path="/shop/:gender/:category" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ShopPage />
                </Suspense>
              )} />
              <Route exact path="/product/:id" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductDetailPage />
                </Suspense>
              )} />
              <Route path="/about" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <AboutPage />
                </Suspense>
              )} />
              <Route path="/team" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <TeamPage />
                </Suspense>
              )} />
              <Route path="/contact" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ContactPage />
                </Suspense>
              )} />
              <Route path="/my-account" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <MyAccountPage />
                </Suspense>
              )} />
              <Route path="*" render={() => (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-xl text-gray-600">Page not found</p>
                </div>
              )} />
            </Switch>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
