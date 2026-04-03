import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './StatusTiles.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="pie-custom-tooltip">
        <div className="pie-tooltip-header">
          <div className="pie-tooltip-dot" style={{ backgroundColor: payload[0].payload.color }} />
          <span className="pie-tooltip-label">{payload[0].name}</span>
        </div>
        <div className="pie-tooltip-value">{payload[0].value.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

export default function StatusTiles({ statusData }) {
  const navigate = useNavigate();
  const totalOrders = statusData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="status-wrapper">
      {statusData.map((item, idx) => (
        <Motion.div
          key={idx}
          className="status-tile"
          whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}
          onClick={() => navigate(`/orders/${item.key}`)}
        >
          <div className="tile-top-row">
            <div className="tile-left-group">
              <div className="tile-icon" style={{ color: item.color, background: `${item.color}15` }}>{item.icon}</div>
              <span className="tile-name">{item.name}</span>
            </div>
            <div className="tile-numbers">
              <span className="tile-count">{item.count.toLocaleString()}</span>
              <span className="tile-total-text">/{item.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="progress-bar-bg">
            <Motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.count / item.total) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="progress-fill"
              style={{ backgroundColor: item.color }}
            />
          </div>
          <div className="spacer" />
          <div className="subs-row">
            <div className="sub-box">
              <span className="tile-name">Warranty</span>
              <span className="sub-val">{item.warranty}<span className="tile-total-text">/{item.total}</span></span>
            </div>
            <div className="sub-box">
              <span className="tile-name">Orders</span>
              <span className="sub-val">{item.orders}<span className="tile-total-text">/{item.total}</span></span>
            </div>
          </div>
        </Motion.div>
      ))}

      <div className="summary-card">
        <div className="summary-header">
          <div className="live-dot" />
          <p className="live-text">Live Overview</p>
        </div>

        <div className="donut-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart onMouseDown={(e) => e.preventDefault()}>
              <Tooltip 
                content={<CustomTooltip />} 
                wrapperStyle={{ zIndex: 100, pointerEvents: 'none' }} 
              />
              <Pie
                data={statusData}
                cx="50%" cy="50%"
                innerRadius={110} outerRadius={140}
                paddingAngle={10} dataKey="count"
                stroke="none" cornerRadius={14}
                activeShape={false}
              >
                {statusData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    style={{ filter: `drop-shadow(0px 8px 12px ${entry.color}44)`, outline: 'none' }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-center-content">
            <span className="center-label">Current Load</span>
            <div className="center-val-group">
              <span className="center-total">{totalOrders}</span>
              <span style={{ color: '#cbd5e1', fontSize: '22px', marginLeft: '4px' }}>/</span>
              <span style={{ color: '#94a3b8', fontSize: '24px', fontWeight: '600' }}>1.8k</span>
            </div>
            <div className="center-accent-line" />
          </div>
        </div>
      </div>
    </div>
  );
}