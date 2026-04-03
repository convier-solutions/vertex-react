import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdChevronRight, 
  MdLogout, 
  MdSearch, 
  MdWbSunny, 
  MdOutlineNightlight 
} from 'react-icons/md';
import useSidebar from '../../context/useSidebar';
import navConfig from '../../config/navConfig';
import './Sidebar.css';
import logoV from '../../assets/mini-logo-1.png';
import logoErtex from '../../assets/mini-logo-2.png';

export default function Sidebar() {
  const { isCollapsed, openMenus, toggleMenu } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('sidebar-theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('sidebar-theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('sidebar-theme', 'light');
    }
  }, [isDarkMode]);

  // Animation variants for the submenu
  const submenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* ── Brand Section ── */}
      <div className="sidebar__brand">
        
        <AnimatePresence>
     <div className="sidebar__brand-container">
  {/* The 'V' is always visible */}
  <div className="sidebar__logo-v">
    <img src={logoV} alt="V" />
  </div>

  {/* The 'ertex' only shows when expanded */}
  <AnimatePresence>
    {!isCollapsed && (
      <motion.span 
        className="sidebar__brand-name"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -5 }}
        transition={{ duration: 0.2 }}
      >
        <img src={logoErtex} alt="ertex" />
      </motion.span>
    )}
  </AnimatePresence>
</div>
        </AnimatePresence>
      </div>

   

      {/* ── Scrollable Menu ── */}
      <nav className="sidebar__menu">
        {navConfig.map((section, sIdx) => (
          <div className="sidebar__group" key={sIdx}>
            {!isCollapsed && section.title && (
              <motion.span 
                className="sidebar__group-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {section.title}
              </motion.span>
            )}
            
            {section.items.map((item) => {
              const hasChildren = item.children?.length > 0;
              const isOpen = !!openMenus[item.label];
              const isChildActive = hasChildren && item.children.some(c => location.pathname === c.path);

              return (
                <div className="sidebar__item-container" key={item.label}>
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className={`sidebar__link ${isChildActive ? 'active-parent' : ''}`} 
                        onClick={() => toggleMenu(item.label)}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <item.icon className="sidebar__icon" />
                        {!isCollapsed && (
                          <motion.span 
                            className="sidebar__label"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                        {!isCollapsed && (
                          <MdChevronRight className={`chevron ${isOpen ? 'open' : ''}`} />
                        )}
                      </button>
                      
                      {/* Submenu Expansion with Framer Motion */}
                      <AnimatePresence initial={false}>
                        {isOpen && !isCollapsed && (
                          <motion.div 
                            className="sidebar__sub"
                            variants={submenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            {item.children.map(child => (
                              <NavLink 
                                key={child.path} 
                                to={child.path} 
                                className={({ isActive }) => `sidebar__sub-link ${isActive ? 'active' : ''}`}
                              >
                                <child.icon className="sidebar__sub-icon" size={18} />
                                <span>{child.label}</span>
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="sidebar__icon" />
                      {!isCollapsed && (
                        <motion.span 
                          className="sidebar__label"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </NavLink>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Fixed Footer ── */}
      <div className="sidebar__footer">
        {!isCollapsed && (
          <motion.div 
            className="sidebar__theme-wrapper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button 
              className={`theme-btn ${!isDarkMode ? 'active' : ''}`}
              onClick={() => setIsDarkMode(false)}
              type="button"
            >
              <MdWbSunny size={16} />
              <span>Light</span>
            </button>
            <button 
              className={`theme-btn ${isDarkMode ? 'active' : ''}`}
              onClick={() => setIsDarkMode(true)}
              type="button"
            >
              <MdOutlineNightlight size={16} />
              <span>Dark</span>
            </button>
          </motion.div>
        )}

        <div className="sidebar__user-card">
          <img 
            src="https://ui-avatars.com/api/?name=Omar+Dev&background=10b981&color=fff&bold=true" 
            alt="User" 
            className="user-avatar" 
          />
          {!isCollapsed && (
            <motion.div 
              className="user-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="user-name">Omar Dev</span>
              <span className="user-email">omar.dev@doclines.com</span>
            </motion.div>
          )}
        </div>

        <button
          className="sidebar__logout-btn"
          type="button"
          onClick={() => navigate('/login')}
        >
          <MdLogout size={18} />
          {!isCollapsed && (
            <motion.span 
              className="sidebar__logout-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Sign Out
            </motion.span>
          )}
        </button>
      </div>
    </aside>
  );
}