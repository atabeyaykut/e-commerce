import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import Header from './layout/Header';
import Footer from './layout/Footer';
import AnimatedPage from './components/ui/AnimatedPage';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

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
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
