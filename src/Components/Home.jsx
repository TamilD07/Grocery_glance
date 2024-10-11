import React, { useState, useEffect } from 'react';
import "../Style/home.css"; // Import your CSS file

export default function Home() {
  const [products, setProducts] = useState([]);

  // Fetch the products when the component loads
  useEffect(() => {
    // You would fetch this data from an API or your backend
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    // Simulating API fetch, replace with actual API call
    const newProducts = [
      {id: 1, name: 'Product 1', price: '10$', imgSrc: 'path-to-img1'},
      { id: 2, name: 'Product 2', price: '15$', imgSrc: 'path-to-img2'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3'},
    ];
    setProducts(newProducts);
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imgSrc} alt={product.name} className="product-img" />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
