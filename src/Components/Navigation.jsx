import React, { useEffect, useState } from 'react';
import "../Style/navigation.css";
import Login from "../Components/registration_&_login";

function Navigation() {
  const [location, setLocation] = useState("Fetching location...");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const openPopup = () => {
    setPopupVisible(true);
  };

  // Function to handle closing the popup
  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    // Geolocation API to get the user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setLocation("Geolocation not supported.");
    }
  }, []);

  // Reverse Geocoding using Nominatim API
  const reverseGeocode = (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.address) {
          const { road, neighbourhood, village, town, state_district, city, state, postcode, country } = data.address;
          
          // Check for all possible address fields that could represent the nagar/town/city names.
          const placeName = road || "Unnamed Road";
          const area =  neighbourhood || village || town ||  "Unknown Area";
          const cityName = city || getCityByPincode(postcode) || "Unknown City";  // Use pincode to find city
          const district =  state_district ;
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

  // Function to get city by pincode (example with static mapping)
  const getCityByPincode = (pincode) => {
    const pincodeToCityMap = {
      "600001":"Chennai",
      "600042": "Velachery",  // Example pin codes
      "110001": "New Delhi",
      "400001": "Mumbai",
      "600017":"T.Nagar",
      // Add more pincode mappings here
    };

    return pincodeToCityMap[pincode] || "Unknown City";
  };

  // Success callback for geolocation
  const showPosition = (position) => {
    const { latitude, longitude } = position.coords;
    reverseGeocode(latitude, longitude);
  };

  // Error handling for geolocation
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
      {/* Logo */}
      <div className="logo">Grocery Glance</div>

      {/* Search bar */}
      <div className="search-bar">
        <input type="text" placeholder='Search for "cheese slices" or "chocolate box"' className="search-input" />
        <button className="search-btn">Search</button>
        <button className='menu'>Menu</button>
      </div>

      {/* Location Display */}
      <div className="location">
        Delivery <br />
        {location}
      </div>

      {/* Dropdown Nearby Shops Button */}
      <button className="dropdown-btn">Nearby Shops</button>
      <button className="login-btn" onClick={openPopup}>Login</button>

      {/* Google Translate Language Dropdown */}
      <div id="google_translate_element" className="translate-dropdown"></div>
      {isPopupVisible && <Login onClose={closePopup} />} {/* Render AuthPopup if visible */}
    </div>
  );
}

export default Navigation;
