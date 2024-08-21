import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
 
import Header from '../components/Header';
import Home from '../components/Home';
import ProductList from '../components/ProductList';
import ProductDetails from '../components/ProductDetails';
import Checkout from '../components/Checkout';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Profile from '../components/Profile';
import Logout from '../components/Logout';
import Footer from '../components/Footer';

const stripePromise = loadStripe("pk_test_51PngqOCPNXIMmAUuNkpBwj0uv0izmnKylBxrBnXx0NkjO1ecXhN8NvE7qzqaWHBKPQuhLzfG5puaJtKRGpikAhdu00se4WOWnf");

function App() {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/stripe/paymentIntent')
    .then((res) => res.json())
    .then((data) => setClientSecret(data))
    .catch((err => console.log(err)))
  });

  const options = {
    clientSecret: {clientSecret},
  }
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product-details" element={<ProductDetails />} />
          { stripePromise && (
            <Route path="checkout" element={(
              <Elements stripe={stripePromise} options={options}>
                <Checkout />
              </Elements>
            )} />
          )}
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
