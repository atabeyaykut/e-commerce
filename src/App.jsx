import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuthStore from './store/authStore';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import ShopPage from './pages/ShopPage';
import MyAccountPage from './pages/MyAccountPage';

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
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/team" component={TeamPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/my-account" component={MyAccountPage} />
            <Route path="*" render={() => (
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600">Page not found</p>
              </div>
            )} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
