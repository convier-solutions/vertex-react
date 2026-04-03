import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { 
  MdOutlineAnalytics, MdReportProblem, MdCheckCircle,
  MdSecurity, MdGroups, MdInventory, MdLayers,
  MdCategory, MdDevices, MdLocalShipping, MdHistory,
  MdArrowForward
} from 'react-icons/md';
import './KPISnapshot.css';

export default function KPISnapshot({ kpis }) {
  const navigate = useNavigate();

  // Combined core KPIs and Sidebar status entries
  const stats = [
    { id: 'orders', name: 'Total Orders', value: '1,860', status: '+12% Today', icon: <MdOutlineAnalytics />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.05)', path: '/orders' },
    { id: 'alerts', name: 'Warranty Issues', value: '40', status: 'Needs Review', icon: <MdReportProblem />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.05)', path: '/warranty-orders' },
    { id: 'shipped', name: 'Shipped Today', value: '124', status: 'On Schedule', icon: <MdCheckCircle />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.05)', path: '/orders' },
    
    // Status entries from Sidebar Image
    { id: 'roles', name: 'Roles', value: '8', status: 'Active', icon: <MdSecurity />, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.05)', path: '/roles' },
    { id: 'collab', name: 'Collaborators', value: '24', status: 'Active', icon: <MdGroups />, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.05)', path: '/collaborators' },
    { id: 'materials', name: 'Materials', value: '142', status: 'In Stock', icon: <MdInventory />, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.05)', path: '/material' },
    { id: 'layers', name: 'Mid Layers', value: '6', status: 'Defined', icon: <MdLayers />, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.05)', path: '/mid_layer_material' },
    { id: 'pathology', name: 'Pathologies', value: '31', status: 'Logged', icon: <MdCategory />, color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.05)', path: '/pathologies' },
    { id: 'kiosks', name: 'Kiosks', value: '12', status: 'Connected', icon: <MdDevices />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.05)', path: '/kiosks' },
    { id: 'couriers', name: 'Couriers', value: '5', status: 'Active', icon: <MdLocalShipping />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.05)', path: '/couriers' },
    { id: 'corrections', name: 'Corrections', value: '18', status: 'Pending', icon: <MdHistory />, color: '#64748b', bg: 'rgba(100, 116, 139, 0.05)', path: '/corrections' },
  ];

  return (
    <div className="kpi-summary-section">
        <div className="orders-title">
          <h3>System Insights</h3>
         
        </div>
      <div className="kpi-summary-grid">
        {stats.map((item, index) => (
          <Motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="kpi-summary-card"
            onClick={() => navigate(item.path)}
          >
            <div className="kpi-summary-icon" style={{ color: item.color, backgroundColor: item.bg }}>
              {item.icon}
            </div>
            <div className="kpi-summary-details">
              <span className="kpi-summary-name">{item.name}</span>
              <div className="kpi-summary-row">
                <span className="kpi-summary-value">{item.value}</span>
                <span className="kpi-summary-status" style={{ color: item.color }}>{item.status}</span>
              </div>
            </div>
            <div className="kpi-summary-arrow-hint">
              <MdArrowForward />
            </div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
}