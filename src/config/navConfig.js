import {
  MdDashboard,
  MdShoppingCart,
  MdSupervisorAccount,
  MdHandshake,
  MdPeople,
  MdCategory,
  MdLayers,
  MdViewComfy,
  MdSource,
  MdAssignment,
  MdStorefront,
  MdLocalOffer,
  MdList,
  MdAddCircle,
  MdPendingActions,
  MdCheckCircle,
  MdSecurity,
  MdHistory,
  MdAdminPanelSettings, 
  MdPlaylistAdd, 
  MdVpnKey,
  MdShield
} from 'react-icons/md';



const navConfig = [
  {
    title: 'MAIN',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: MdDashboard,
      },
    ],
  },
  {
    title: 'Menu',
    items: [
   {
        label: 'Orders',
        icon: MdShoppingCart,
        children: [
          { 
            label: 'Order List', 
            path: '/orders', 
            icon: MdList 
          },
          { 
            label: 'Create Order', 
            path: '/orders/add', 
            icon: MdAddCircle 
          },
          { 
            label: 'Order History', 
            path: '/orders/history', 
            icon: MdHistory 
          },
          { 
            label: 'Track Progress', 
            path: '/orders/pending', 
            icon: MdPendingActions 
          },
        ],
      },

{
  label: 'Roles',
  icon: MdShield, 
  children: [
    { 
      label: 'All Roles', 
      path: '/roles', 
      icon: MdAdminPanelSettings 
    },
    { 
      label: 'Create Role', 
      path: '/roles/create', 
      icon: MdPlaylistAdd 
    }
  ],
},
      {
        label: 'Collaborations',
        path: '/collaborations',
        icon: MdHandshake,
      },
      {
        label: 'Clients',
        path: '/clients',
        icon: MdPeople,
      },
      {
        label: 'Custom Orthotic Type',
        icon: MdCategory,
        children: [
          { label: 'All Types', path: '/orthotic-types', icon: MdList },
          { label: 'Add New', path: '/orthotic-types/add', icon: MdAddCircle },
        ],
      },
      {
        label: 'Material',
        icon: MdLayers,
        children: [
          { label: 'All Materials', path: '/materials', icon: MdList },
          { label: 'Add Material', path: '/materials/add', icon: MdAddCircle },
        ],
      },
      {
        label: 'Top Cover',
        path: '/top-cover',
        icon: MdViewComfy,
      },
      {
        label: 'Source',
        icon: MdSource,
        children: [
          { label: 'All Sources', path: '/sources', icon: MdList },
          { label: 'Add Source', path: '/sources/add', icon: MdAddCircle },
        ],
      },
      {
        label: 'Warranty Orders',
        icon: MdAssignment,
        children: [
          { label: 'All Warranty Orders', path: '/warranty-orders', icon: MdHistory },
          { label: 'Pending', path: '/warranty-orders/pending', icon: MdPendingActions },
        ],
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        label: 'Kiosk',
        path: '/kiosk',
        icon: MdStorefront,
      },
      {
        label: 'Coupons',
        path: '/coupons',
        icon: MdLocalOffer,
      },
    ],
  },
];

export default navConfig;