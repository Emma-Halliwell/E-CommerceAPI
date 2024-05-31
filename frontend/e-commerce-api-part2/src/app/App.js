import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from '../components/Header';
import SignUp from '../components/SignUp';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="register" element={<SignUp />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
