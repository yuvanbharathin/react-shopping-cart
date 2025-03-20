import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartContext';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const toggleCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id);
    let updatedCart;

    if (productInCart) {
      updatedCart = cart.filter(item => item.id !== product.id);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded-md shadow-md flex flex-col justify-between h-full">
    <img src={product.image} alt={product.title} className="w-full h-56 object-contain mb-4"/>
    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
    <p className="text-sm text-gray-600 flex-grow mb-2">{product.description.slice(0, 100)}...</p>
    <p className="text-lg font-semibold text-green-500 mb-4">${product.price}</p>

    <button
      className={`w-full py-2 rounded-md ${
        cart.some(item => item.id === product.id)
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        onClick={() => toggleCart(product)}
    >
      {cart.some(item => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  </div>
))}

      </div>
    </div>

    
  );
}

export default ProductPage;
