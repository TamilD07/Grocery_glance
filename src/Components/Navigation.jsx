import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "../Style/navigation.css";
import Login from "../Components/registration_&_login";
import Cart from "../Components/cart"; // Import Cart component

function Navigation() {
  const [location, setLocation] = useState("Fetching location...");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false); // State to show/hide cart popup
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const toggleCart = () => {
    setCartVisible(!isCartVisible); // Toggle cart visibility
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setLocation("Geolocation not supported.");
    }
  }, []);

  const reverseGeocode = (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.address) {
          const { road, neighbourhood, village, town, state_district, city, state, postcode, country } = data.address;
          const placeName = road || "Unnamed Road";
          const area = neighbourhood || village || town || "Unknown Area";
          const cityName = city || getCityByPincode(postcode) || "Unknown City";
          const district = state_district;
          const stateName = state || "Unknown State";
          const countryName = country || "Unknown Country";
          const fullLocation = `${placeName}, ${area}, ${cityName},${district}, ${stateName}, ${countryName}`;
          setLocation(fullLocation);
        } else {
          setLocation("Location not found.");
        }
      })
      .catch(() => {
        setLocation("Error retrieving location.");
      });
  };

  const getCityByPincode = (pincode) => {
    const pincodeToCityMap = {
      "600001": "Chennai",
      "600042": "Velachery",
      "110001": "New Delhi",
      "400001": "Mumbai",
      "600017": "T.Nagar",
    };
    return pincodeToCityMap[pincode] || "Unknown City";
  };

  const showPosition = (position) => {
    const { latitude, longitude } = position.coords;
    reverseGeocode(latitude, longitude);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setLocation("Permission denied.");
        break;
      case error.POSITION_UNAVAILABLE:
        setLocation("Location unavailable.");
        break;
      case error.TIMEOUT:
        setLocation("Location request timed out.");
        break;
      default:
        setLocation("Unknown error.");
    }
  };

  return (
    <div className="nav-container">
      <div className="logo">Grocery Glance</div>

      <div className="search-bar">
        <input type="text" placeholder='Search for "cheese slices" or "chocolate box"' className="search-input" />
        <button className="search-btn">Search</button>
        <button className='menu'>Menu</button>
      </div>

      <div className="location">
        Delivery <br />
        {location}
      </div>

      <div className="nav-buttons">
        <button className="login-btn" onClick={openPopup}>Login</button>
        <button className="cart-btn" onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          Cart
        </button>
      </div>

      <div id="google_translate_element" className="translate-dropdown"></div>
      {isPopupVisible && <Login onClose={closePopup} />}
      {isCartVisible && <Cart onClose={toggleCart} cartItems={cartItems} />} {/* Display Cart Popup */}
    </div>
  );
}

export default Navigation;
