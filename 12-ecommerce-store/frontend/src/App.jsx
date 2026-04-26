import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Shipping from './pages/Shipping';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
		<Route path="/product/:id" element={<ProductDetails />} />
		<Route path="/wishlist" element={<Wishlist />} />
		<Route path="/shipping" element={<Shipping />} />
		<Route path="/checkout" element={<Checkout />} />
		<Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;