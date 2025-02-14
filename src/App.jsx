import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

// Components that are part of the main layout should not be lazy loaded
import Header from './layout/Header';
import Footer from './layout/Footer';
import useAuthStore from './store/authStore';

// Loading component with reduced motion
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Lazy load components with descriptive chunk names
const HomePage = React.lazy(() => import(/* webpackChunkName: "home" */ './pages/HomePage'));
const ShopPage = React.lazy(() => import(/* webpackChunkName: "shop" */ './pages/ShopPage'));
const ContactPage = React.lazy(() => import(/* webpackChunkName: "contact" */ './pages/ContactPage'));
const TeamPage = React.lazy(() => import(/* webpackChunkName: "team" */ './pages/TeamPage'));
const AboutPage = React.lazy(() => import(/* webpackChunkName: "about" */ './pages/AboutPage'));
const ProductDetailPage = React.lazy(() => import(/* webpackChunkName: "product" */ './pages/ProductDetailPage'));
const SignupPage = React.lazy(() => import(/* webpackChunkName: "auth" */ './pages/SignupPage'));
const LoginPage = React.lazy(() => import(/* webpackChunkName: "auth" */ './pages/LoginPage'));

// Separate route component for better code organization
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={() => (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
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
        <Route exact path="/contact" component={() => (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactPage />
          </Suspense>
        )} />
        <Route exact path="/team" component={() => (
          <Suspense fallback={<LoadingSpinner />}>
            <TeamPage />
          </Suspense>
        )} />
        <Route exact path="/about" component={() => (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutPage />
          </Suspense>
        )} />
        <Route exact path="/product/:id" component={() => (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetailPage />
          </Suspense>
        )} />
        <Route exact path="/signup" component={() => (
          <Suspense fallback={<LoadingSpinner />}>
            <SignupPage />
          </Suspense>
        )} />
        <Route exact path="/login" component={() => (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        )} />
      </Switch>
    </AnimatePresence>
  );
};

const App = () => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
        />
      </div>
    </Router>
  );
};

export default App;
