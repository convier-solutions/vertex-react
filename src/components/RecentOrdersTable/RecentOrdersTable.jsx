import React, { useState, useMemo } from 'react';
import { MdSearch, MdArrowForward, MdOutlineVisibility, MdFlashOn } from 'react-icons/md';
import './RecentOrdersTable.css';

const statusMeta = {
  open: { name: 'Open', color: '#64748b' },
  in_process: { name: 'In Process', color: '#3b82f6' },
  file_ready: { name: 'File Ready', color: '#06b6d4' },
  in_production: { name: 'In Production', color: '#8b5cf6' },
  ready_to_ship: { name: 'Ready to Ship', color: '#f59e0b' },
  shipped: { name: 'Shipped', color: '#10b981' },
};

export default function RecentOrdersTable({ orders = [] }) {
  const [orderQuery, setOrderQuery] = useState('');

  const filteredOrders = useMemo(() => {
    const q = orderQuery.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(r =>
      [r.id, r.client, r.patientName, r.orthoticType].some(v =>
        String(v).toLowerCase().includes(q)
      )
    );
  }, [orders, orderQuery]);

  return (
    <div className="">
      {/* HEADER SECTION - Now Responsive */}
      <div className="orders-header">
        <div className="orders-title">
          <h3>Recent Orders</h3>
         
        </div>
        <div className="orders-actions">
          <div className="search-input">
            <MdSearch className="search-icon" />
            <input
              value={orderQuery}
              onChange={e => setOrderQuery(e.target.value)}
              placeholder="Search patient, ID, or client..."
            />
          </div>
          <button className="btn-view-all">
            View All <MdArrowForward />
          </button>
        </div>
      </div>

      {/* TABLE WRAPPER - This handles the horizontal scroll */}
      <div className="orders-table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Prev ID</th>
              <th>Status</th>
              <th>Client</th>
              <th>Created</th>
              <th>Patient / Products</th>
              <th>Orthotic Type</th>
              <th>Top Cover</th>
              <th>Qty</th>
              <th>Rush</th>
              <th className="col-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={11} className="orders-empty">
                  No orders found matching your search.
                </td>
              </tr>
            ) : (
              filteredOrders.map(row => (
                <tr key={row.id}>
                  <td className="mono-id">#{row.id}</td>
                  <td className="text-muted">{row.prevId || '—'}</td>
                  <td>
                    <span 
                      className="status-pill" 
                      style={{ '--pill-clr': statusMeta[row.status]?.color || '#cbd5e1' }}
                    >
                      <span className="status-dot" />
                      {statusMeta[row.status]?.name || row.status}
                    </span>
                  </td>
                  <td className="font-semibold">{row.client}</td>
                  <td className="text-xs text-muted">{row.createdDate}</td>
                  <td>
                    <div className="patient-cell">
                      <span className="patient-name">{row.patientName}</span>
                      <span className="product-sub">{row.productCount} Items</span>
                    </div>
                  </td>
                  <td><span className="type-badge">{row.orthoticType}</span></td>
                  <td className="text-muted text-sm">{row.topCover}</td>
                  <td className="font-bold">{row.quantity}</td>
                  <td>
                    {row.isRush ? (
                      <span className="rush-indicator"><MdFlashOn /> RUSH</span>
                    ) : <span className="text-muted">—</span>}
                  </td>
                  <td className="col-center">
                    <button className="btn-action-eye" title="View Order">
                      <MdOutlineVisibility />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}