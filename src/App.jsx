import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/shop" component={ShopPage} />
              <Route exact path="/shop/:category" component={ShopPage} />
              <Route exact path="/shop/:gender/:category" component={ShopPage} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/team" component={TeamPage} />
              <Route exact path="/about" component={AboutPage} />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
