import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import { FaShoppingCart } from "react-icons/fa";
import { CartProvider, CartContext } from "./components/CartContext";
import { useContext } from "react";

function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white font-semibold">
      <Link to="/" className="text-xl">🛒 MyStore</Link>
      <Link to="/cart" className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">
        <FaShoppingCart />
        <span>Cart ({totalItems})</span>
      </Link>
    </nav>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
