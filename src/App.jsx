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
              <Route exact path="/login" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <LoginPage />
                </Suspense>
              )} />
              <Route exact path="/signup" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <SignupPage />
                </Suspense>
              )} />
              <Route exact path="/shop" component={() => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ShopPage />
                </Suspense>
              )} />
              <Route exact path="/shop/:gender" render={({ match }) => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ShopPage match={match} />
                </Suspense>
              )} />
              <Route exact path={[
                "/shop/kadin/:categoryName/:categoryId",
                "/shop/erkek/:categoryName/:categoryId",
                "/shop/men/:categoryName/:categoryId",
                "/shop/women/:categoryName/:categoryId"
              ]} render={({ match }) => (
                <Suspense fallback={<LoadingSpinner />}>
                  <ShopPage match={match} />
                </Suspense>
              )} />
              {/* Product Detail Route - Ensure all parameters are required */}
              <Route 
                exact 
                path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" 
                render={({ match }) => (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProductDetailPage match={match} />
                  </Suspense>
                )} 
              />
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
