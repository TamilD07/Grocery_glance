import React, { useEffect, useState } from 'react';
import "../Style/navigation.css";

function Navigation() {
  const [location, setLocation] = useState("Fetching location...");

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
          const { road, city, town, village, country } = data.address;
          const placeName = road || "Unnamed Road";
          const locationInfo = `${placeName}, ${city || town || village}, ${country}`;
          setLocation(locationInfo);
        } else {
          setLocation("Location not found.");
        }
      })
      .catch(() => {
        setLocation("Error retrieving location.");
      });
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
      <button className="login-btn">Login</button>

      {/* Google Translate Language Dropdown */}
      <div id="google_translate_element" className="translate-dropdown"></div>
    </div>
  );
}

export default Navigation;
