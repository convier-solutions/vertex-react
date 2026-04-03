import { useContext } from 'react';
import RolesContext from './rolesContext';

export default function useRoles() {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error('useRoles must be used within a RolesProvider');
  }
  return context;
}
