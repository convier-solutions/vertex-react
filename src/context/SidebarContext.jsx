import { useState, useCallback } from 'react';
import SidebarContext from './sidebarContext';

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const toggleMenu = useCallback((label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleSidebar, openMenus, toggleMenu }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

