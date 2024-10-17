import React, { useEffect, useRef } from 'react';
import "../Style/cart.css";

function Cart({ onClose, cartItems }) {
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // Close the popup if clicked outside
      }
    };

    // Attach event listener to detect outside click
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener when component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="cart-overlay">
      <div className="cart-popup" ref={popupRef}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <button className="order-btn">Order</button>
      </div>
    </div>
  );
}

export default Cart;
