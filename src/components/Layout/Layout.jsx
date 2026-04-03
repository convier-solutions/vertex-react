import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import useSidebar from '../../context/useSidebar';
import './Layout.css';

export default function Layout() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="layout">
      <Sidebar />
      <div className={`layout__main${isCollapsed ? ' sidebar-collapsed' : ''}`}>
        <Header />
        <div className="layout__content">
          <Outlet />
        </div>
        <footer className="layout-footer">
          <div className="layout-footer__inner">
            <span className="layout-footer__brand">
              Copyright 
              <span className="layout-footer__dot">©</span> 2026
              <span className="layout-footer__divider">·</span>
              Developed by <span className="layout-footer__highlight">Convier Solutions</span>
            </span>
            <div className="layout-footer__links">
              <button type="button" className="layout-footer__link">Contact Us</button>
              <span className="layout-footer__separator" />
              <button type="button" className="layout-footer__link">Privacy Policy</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
