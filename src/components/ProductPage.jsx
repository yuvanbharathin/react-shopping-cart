import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartContext';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const toggleCart = (product) => {
    setCart(prevCart => {
      const productInCart = prevCart.find(item => item.id === product.id);
      return productInCart
        ? prevCart.filter(item => item.id !== product.id) 
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  if (loading) return <p className="text-center text-xl">Loading products...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-md shadow-md">
            <img src={product.image} alt={product.title} className="w-full h-56 object-contain mb-4"/>
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-lg font-semibold text-green-500 mb-4">${product.price}</p>
            <button 
              onClick={() => toggleCart(product)}
              className="w-full py-2 bg-blue-500 text-white rounded-md"
            >
              {cart.some(item => item.id === product.id) ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
