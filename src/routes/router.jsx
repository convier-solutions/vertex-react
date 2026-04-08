import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';

import Placeholder from '../pages/Placeholder';
import OrdersPage from '../pages/Orders/OrdersPage';
import OrderDetailPage from '../pages/Orders/OrderDetailPage';
import CreateOrderPage from '../pages/Orders/CreateOrderPage';
import RolesPage from '../pages/Roles/RolesPage';
import CreateRolePage from '../pages/Roles/CreateRolePage';
import LoginPage from '../pages/Auth/LoginPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/add', element: <CreateOrderPage /> },
      { path: 'orders/:id', element: <OrderDetailPage /> },
      { path: 'orders/:status', element: <Placeholder /> },
      { path: 'roles', element: <RolesPage /> },
      { path: 'roles/create', element: <CreateRolePage /> },
      { path: 'roles/edit/:id', element: <CreateRolePage /> },
      { path: 'roles/permissions', element: <Placeholder /> },
      { path: 'collaborations', element: <Placeholder /> },
      { path: 'clients', element: <Placeholder /> },
      { path: 'orthotic-types', element: <Placeholder /> },
      { path: 'orthotic-types/add', element: <Placeholder /> },
      { path: 'materials', element: <Placeholder /> },
      { path: 'materials/add', element: <Placeholder /> },
      { path: 'top-cover', element: <Placeholder /> },
      { path: 'sources', element: <Placeholder /> },
      { path: 'sources/add', element: <Placeholder /> },
      { path: 'warranty-orders', element: <Placeholder /> },
      { path: 'warranty-orders/pending', element: <Placeholder /> },
      { path: 'kiosk', element: <Placeholder /> },
      { path: 'coupons', element: <Placeholder /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});

export default router;
