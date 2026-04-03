import React, { useState } from 'react';
import { 
  LuTruck, 
  LuBox, 
  LuExternalLink, 
  LuCopy, 
  LuPencil,
  LuHistory,
  LuChevronDown,
  LuFactory
} from "react-icons/lu";
import './ShippingInformation.css'; // This will contain your OrderManagement styles

/**
 * Reusable Section Wrapper
 * High-end expandable card logic
 */
const OrderSection = ({ title, icon, isDefaultOpen = true, children }) => {
  const [isExpanded, setIsExpanded] = useState(isDefaultOpen);

  return (
    <div className={`order-card ${isExpanded ? 'is-open' : 'is-closed'}`}>
      <div className="order-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="header-main">
          <div className="header-icon-box">{icon}</div>
          <div className="header-info">
            <h3>{title}</h3>
            <p className="status-text">{isExpanded ? 'View details' : 'Click to expand'}</p>
          </div>
        </div>
        <div className={`arrow-icon ${isExpanded ? 'rotated' : ''}`}>
          <LuChevronDown size={20} />
        </div>
      </div>

      <div className="order-card-content">
        <div className="content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

const ShippingManagement = () => {
  // Demo Data
  const mainShipping = {
    courier: "FedEx",
    tracking: "775778977650",
    status: "In Transit",
    eta: "Oct 24, 2023"
  };

  const prodShipping = {
    tracking: "PROD-99821-X",
    status: "Label Created"
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="shipping-layout-wrapper">
      
      {/* 1. Customer Shipping Section */}
      <OrderSection 
        title="Shipping Information" 
        icon={<LuTruck size={20} />}
      >
        <div className="sleek-list">
          <div className="list-item shipping-active">
            <div className="brand-avatar">{mainShipping.courier[0]}</div>
            
            <div className="item-details">
              <div className="shipping-row">
                <span className="item-main-text">{mainShipping.courier}</span>
                <span className="status-pill status-blue">{mainShipping.status}</span>
              </div>
              <div className="item-meta">
                <span className="mono-code" onClick={() => copyToClipboard(mainShipping.tracking)}>
                  <LuBox size={14} /> {mainShipping.tracking}
                  <LuCopy size={12} className="copy-hint" />
                </span>
                <span className="separator">•</span>
                <span className="meta-block">ETA: {mainShipping.eta}</span>
              </div>
            </div>

            <div className="item-actions">
              <button className="icon-btn" title="Track"><LuExternalLink size={16} /></button>
              <button className="icon-btn accent-hover" title="Edit"><LuPencil size={16} /></button>
            </div>
          </div>
        </div>
      </OrderSection>

      {/* 2. Production Shipping Section */}
      <OrderSection 
        title="Production Shipping Information" 
        icon={<LuFactory size={20} />}
        isDefaultOpen={false} // Closed by default to save space
      >
        <div className="sleek-list">
          {prodShipping.tracking ? (
            <div className="list-item">
              <div className="item-details">
                <p className="item-main-text">Production Tracking</p>
                <div className="item-meta">
                  <span className="mono-code">{prodShipping.tracking}</span>
                  <span className="separator">•</span>
                  <span className="status-pill status-gray">{prodShipping.status}</span>
                </div>
              </div>
              <div className="item-actions">
                <button className="icon-btn accent-hover"><LuPencil size={16} /></button>
              </div>
            </div>
          ) : (
            <div className="empty-shipping-state">
              <LuHistory size={24} />
              <p>No production tracking available yet.</p>
            </div>
          )}
        </div>
      </OrderSection>

    </div>
  );
};

export default ShippingManagement;