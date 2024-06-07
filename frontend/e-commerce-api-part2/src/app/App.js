import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from '../components/Header';
import Home from '../components/Home';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
