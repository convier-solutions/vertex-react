import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { MdTrendingUp } from 'react-icons/md';
import './VelocityChart.css';

// Custom Tooltip to match your "Premium" UI
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip-v2">
        <p className="tooltip-date">{label}</p>
        <p className="tooltip-value">
          <span className="dot" />
          {payload[0].value} Orders
        </p>
      </div>
    );
  }
  return null;
};

export default function VelocityChart({ days, trend }) {
  // Transform days data for Recharts
  const chartData = days.map(d => ({
    date: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(d),
    fullDate: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(d),
    orders: Math.floor(Math.random() * 50) + 100 // Mocking values based on your series logic
  }));

  return (
    <div className="graph-card-wrapper">
      <div className="card-label">
        <div className="card-label__left">
          <h3>Order Velocity</h3>
          <span className="card-caption">
            Daily production volume • {days.length} days
          </span>
        </div>
        <div className={`trend ${trend.dir === 'up' ? 'trend-up' : 'trend-down'}`}>
          <MdTrendingUp />
          <span>{trend.pct >= 0 ? '+' : ''}{trend.pct}%</span>
        </div>
      </div>

      <div className="recharts-wrapper">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              verticalFill={['#fff', '#f8fafc']}
            />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }} />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOrders)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend-v2">
        <div className="legend-item">
          <span className="legend-dot" />
          <span>Completed Units</span>
        </div>
      </div>
    </div>
  );
}