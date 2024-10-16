import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Style/home.css";
import banner1 from "../images/masala.jpeg"; // Replace with actual image
import banner2 from "../images/grocery 2.jpeg"; // Replace with actual image

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const newProducts = [
      { id: 1, name: 'Paan Corner', description: 'Smoking accessories, mints & more', imgSrc: banner2 },
      { id: 2, name: 'Another Deal', description: 'Description of the deal', imgSrc: banner1 },
      { id: 3, name: 'Product 3', price: '8$', imgSrc: 'path-to-img3' },
      { id: 4, name: 'Product 4', price: '12$', imgSrc: 'path-to-img4' },
      { id: 5, name: 'Product 5', price: '20$', imgSrc: 'path-to-img5' },
    ];
    setProducts(newProducts);
  };

  const sliderProducts = products.slice(0, 2);  // Only first two products for the slider

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <Slider {...settings} className="custom-slider">
        {sliderProducts.map((product) => (
          <div key={product.id} className="slider-item">
            <img src={product.imgSrc} alt={product.name} className="slider-img" />
            <div className="slider-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button className="explore-btn">Explore Now</button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Static Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imgSrc} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            {product.price && <p>{product.price}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
