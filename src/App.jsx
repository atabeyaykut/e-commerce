import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
