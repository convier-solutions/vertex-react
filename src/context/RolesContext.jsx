import React, { useMemo, useState, useCallback } from 'react';
import RolesContext from './rolesContext';

const initialRoles = [
  { id: 1, title: 'Administrator', description: 'Full access to all system modules and settings.', status: 'Active' },
  { id: 2, title: 'Manager', description: 'Can manage orders, view reports and manage staff.', status: 'Active' },
  { id: 3, title: 'Editor', description: 'Can edit content and manage files.', status: 'Active' },
  { id: 4, title: 'Support', description: 'Can view customer data and handle support tickets.', status: 'Inactive' },
];

export function RolesProvider({ children }) {
  const [roles, setRoles] = useState(initialRoles);

  const addRole = useCallback((roleData) => {
    setRoles((prev) => {
      const maxId = prev.reduce((max, r) => (r.id > max ? r.id : max), 0);
      const nextId = maxId + 1;
      const newRole = { id: nextId, status: 'Active', ...roleData };
      return [...prev, newRole];
    });
  }, []);

  const updateRole = useCallback((id, updates) => {
    setRoles((prev) => prev.map((role) => (role.id === id ? { ...role, ...updates } : role)));
  }, []);

  const deleteRole = useCallback((id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  }, []);

  const value = useMemo(
    () => ({ roles, addRole, updateRole, deleteRole }),
    [roles, addRole, updateRole, deleteRole]
  );

  return <RolesContext.Provider value={value}>{children}</RolesContext.Provider>;
}
