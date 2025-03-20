import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, setCart } = useContext(CartContext);

  const increaseQuantity = (productId) => {
    const newCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(newCart);
  };

  const decreaseQuantity = (productId) => {
    const newCart = cart.map(item => 
      item.id === productId && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    );
    setCart(newCart);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total - (total * 0.1);  // 10% discount
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h2 className="text-lg">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">+</button>
                <button onClick={() => removeFromCart(item.id)} className="ml-4 bg-red-500 text-white py-1 px-3 rounded-md">Remove</button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h2>
            <Link to="/">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Back to Products</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
