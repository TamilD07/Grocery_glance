 // AuthPopup.js
import React, { useState } from 'react';
import "../Style/reglog.css"; // Make sure to style your popup

function AuthPopup({ onClose }) {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and registration

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and registration
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {isLogin ? ( // Conditional rendering based on isLogin state
          <div className='Login'>
            <h2>Login</h2>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Enter your mail id' />
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Enter Your Password' />
              <div className="lbtn">
                <button type="button">Login</button>
              </div>
              <div className="toggle-form">
                <p>Don't have an account? <span onClick={toggleForm} style={{ color: 'blue', cursor: 'pointer' }}>Register</span></p>
              </div>
            </div>
          </div>
        ) : (
          <div className='registration'>
            <h2>Registration</h2>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" placeholder='Enter Your Name' />
              <label htmlFor="password">Create Password</label>
              <input type="password" placeholder='Enter Your Password' />
              <label htmlFor="repassword">Re-enter Password</label>
              <input type="password" placeholder='Re-enter Password' />
              <label htmlFor="mobno">Mobile No</label>
              <input type="text" placeholder='Enter the mobile no' />
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Enter your mail id' />
              <div className='rgbtn'>
                <button type="button">Register</button>
              </div>
              <div className="toggle-form">
                <p>Already have an account? <span onClick={toggleForm} style={{ color: 'blue', cursor: 'pointer' }}>Login</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPopup;
