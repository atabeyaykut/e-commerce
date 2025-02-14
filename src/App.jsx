import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

import Header from './layout/Header';
import Footer from './layout/Footer';
import AnimatedPage from './components/ui/AnimatedPage';
import useAuthStore from './store/authStore';

// Lazy loaded components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const TeamPage = React.lazy(() => import('./pages/TeamPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <AnimatedPage>
            <HomePage />
          </AnimatedPage>
        </Route>
        <Route exact path="/shop">
          <AnimatedPage>
            <ShopPage />
          </AnimatedPage>
        </Route>
        <Route exact path="/shop/:category">
          <AnimatedPage>
            <ShopPage />
          </AnimatedPage>
        </Route>
        <Route exact path="/shop/:gender/:category">
          <AnimatedPage>
            <ShopPage />
          </AnimatedPage>
        </Route>
        <Route exact path="/contact">
          <AnimatedPage>
            <ContactPage />
          </AnimatedPage>
        </Route>
        <Route exact path="/team">
          <AnimatedPage>
            <TeamPage />
          </AnimatedPage>
        </Route>
        <Route exact path="/about">
          <AnimatedPage>
            <AboutPage />
          </AnimatedPage>
        </Route>
        <Route exact path="/product/:id">
          <AnimatedPage>
            <ProductDetailPage />
          </AnimatedPage>
        </Route>
        <Route exact path="/signup">
          <AnimatedPage>
            <SignupPage />
          </AnimatedPage>
        </Route>
        <Route exact path="/login">
          <AnimatedPage>
            <LoginPage />
          </AnimatedPage>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <React.Suspense fallback={<LoadingSpinner />}>
            <AnimatedRoutes />
          </React.Suspense>
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
        />
      </div>
    </Router>
  );
}

export default App;
