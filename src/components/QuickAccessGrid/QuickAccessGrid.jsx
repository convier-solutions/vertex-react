import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdPeople, MdGroups, MdInventory2, 
  MdCategory, MdSecurity, MdArrowForward 
} from 'react-icons/md';
import './QuickAccessGrid.css';

export default function QuickAccessGrid() {
  const navigate = useNavigate();

  const items = [
    { label: 'Roles', count: 12, icon: <MdSecurity />, path: '/roles', color: '#6366f1' },
    { label: 'Collaborators', count: 48, icon: <MdGroups />, path: '/collaborators', color: '#06b6d4' },
    { label: 'Materials', count: 156, icon: <MdInventory2 />, path: '/material', color: '#8b5cf6' },
    { label: 'Pathologies', count: 84, icon: <MdCategory />, path: '/pathologies', color: '#f43f5e' },
  ];

  return (
    <div className="quick-access-wrapper">
      <div className="section-header">
        <h4>System Directory</h4>
        <p>Quick management & totals</p>
      </div>
      
      <div className="quick-grid">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="quick-card" 
            onClick={() => navigate(item.path)}
          >
            <div className="quick-card__main">
              <div className="quick-icon" style={{ background: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <div className="quick-info">
                <span className="quick-count">{item.count}</span>
                <span className="quick-label">{item.label}</span>
              </div>
            </div>
            <MdArrowForward className="quick-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}