import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import Header from '../components/Header';
import Home from '../components/Home';
import ProductList from '../components/ProductList'
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Profile from '../components/Profile';
import Footer from '../components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
