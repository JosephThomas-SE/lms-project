import React from 'react';
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi'; // Import icons as needed

import './Navbar.css';

const Navbar = ({ onToggleTheme, isDayMode, role, onLogout }) => {
  
  return (
    <div className="navbar">
      <div className="left-items">
        <div className="theme-toggle" onClick={onToggleTheme}>
          <span className={`icon ${isDayMode ? 'day' : 'night'}`}>
            {isDayMode ? <FiSun /> : <FiMoon />}
          </span>
          <span>{isDayMode ? 'Day Mode' : 'Night Mode'}</span>
        </div>
        <button>Add Book</button>
      </div>
      <div className="profile">
      <div className="right-items">
        <div className="profile-button">{role}</div> {/* Placeholder for profile image or initials */}
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
