import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdFullscreen, MdNotificationsNone, MdLogout, MdSettings, MdPersonOutline } from 'react-icons/md';
import { HiMenuAlt2 } from 'react-icons/hi';
import useSidebar from '../../context/useSidebar';
import './Header.css';

export default function Header() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <header className={`header${isCollapsed ? ' sidebar-collapsed' : ''}`}>
      <div className="header__left">
        <button className="header__icon-btn menu-toggle" onClick={toggleSidebar}>
          <HiMenuAlt2 />
        </button>
      </div>

      <div className="header__right">
      
        
        <button className="header__icon-btn">
          <MdFullscreen />
        </button>
        
        <div className="header__divider"></div>

        <div className="header__profile-container" ref={dropdownRef}>
          <button 
            className={`header__user-avatar ${isProfileOpen ? 'active' : ''}`}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {/* Displaying the first letter of name */}
            J
          </button>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <p className="user-name">John Doe</p>
                <p className="user-email">john.doe@example.com</p>
              </div>
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item">
                <MdPersonOutline className="dropdown-icon" /> 
                <span>My Profile</span>
              </button>
              
              <button className="dropdown-item">
                <MdSettings className="dropdown-icon" /> 
                <span>Account Settings</span>
              </button>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item logout" onClick={handleSignOut}>
                <MdLogout className="dropdown-icon" /> 
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}