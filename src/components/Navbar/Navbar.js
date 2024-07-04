import React from 'react';
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi'; // Import icons as needed

import './Navbar.css';

const Navbar = ({ onToggleTheme, isDayMode, username, onLogout }) => {
  
  // Function to get the initials from the username
  const getInitials = (name) => {
    if (name) {
      return name.slice(0, 2).toUpperCase(); // Slice the first two characters and convert to uppercase
    }
    return ''; // Return empty string or handle accordingly if userName is undefined
  };

  return (
    <div className="navbar">
      <div className="left-items">
        <div className="theme-toggle" onClick={onToggleTheme}>
          <span className={`icon ${isDayMode ? 'day' : 'night'}`}>
            {isDayMode ? <FiSun /> : <FiMoon />}
          </span>
          <span>{isDayMode ? 'Day Mode' : 'Night Mode'}</span>
        </div>
      </div>
      <div className="profile">
      <div className="right-items">
        <div className="profile-button">{getInitials(username)}</div> {/* Placeholder for profile image or initials */}
          {/* <p>{username}</p> {Replace with actual username} */}
          <div className="logout" onClick={onLogout}>
            <FiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
