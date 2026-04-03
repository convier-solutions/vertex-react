import React, { useState, useEffect } from 'react';
import { 
  LuFilePlus, 
  LuLoader, 
  LuFileCheck2, 
  LuFactory, 
  LuBox, 
  LuSend,
  LuCheck 
} from "react-icons/lu"; 
import './OrderStatus.css';

const OrderStatus = ({ initialOrderData }) => {
  const [orderData, setOrderData] = useState(initialOrderData);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (initialOrderData) setOrderData(initialOrderData);
  }, [initialOrderData]);

  if (!orderData) return <div className="status-loader">Loading Order Details...</div>;

  // mapping the steps to React Icons
  const steps = [
    { label: 'Opened', key: 'Opend', icon: <LuFilePlus />, desc: 'Order received and successfully logged.' },
    { label: 'In Process', key: 'In Process', icon: <LuLoader />, desc: 'We are preparing your requirements.' },
    { label: 'File Ready', key: 'File ready', icon: <LuFileCheck2 />, desc: 'Technical files have been generated.' },
    { label: 'Production', key: 'In production', icon: <LuFactory />, desc: 'Your order is currently being built.' },
    { label: 'Ready to Ship', key: 'Ready to ship', icon: <LuBox />, desc: 'Quality check complete, awaiting courier.' },
    { label: 'Shipped', key: 'shipped', icon: <LuSend />, desc: 'Package is in transit to your location.' },
  ];

  const currentIndex = steps.findIndex(s => s.key === orderData.currentStatus);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const currentStep = steps[safeIndex];

  const handleStepClick = (step) => {
    if (step.key === orderData.currentStatus) return;
    setPendingStatus(step);
    setIsConfirming(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      setOrderData({ ...orderData, currentStatus: pendingStatus.key });
      setIsConfirming(false);
      setPendingStatus(null);
    }
  };

  return (
    <div className="status-dashboard">
      {/* --- Confirmation Modal --- */}
      {isConfirming && pendingStatus && (
        <div className="modal-overlay" onClick={() => setIsConfirming(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-glow">
              {/* Rendering the icon larger in the modal */}
              {React.cloneElement(pendingStatus.icon, { size: 48, strokeWidth: 2 })}
            </div>
            <h4>Change Status?</h4>
            <p>Update order status to <strong>{pendingStatus.label}</strong>?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setIsConfirming(false)}>Dismiss</button>
              <button className="btn-confirm" onClick={confirmStatusChange}>Update Now</button>
            </div>
          </div>
        </div>
      )}

      <header className="status-header-main">
        <div className="title-group">
          <h3>Order Tracking</h3>
          <p className="subtitle">Real-time updates & manual control</p>
        </div>
        <div className="id-badge">
          <div className="id-row">
            <span className="id-label">Order ID</span>
            <span className="id-value">{orderData.id}</span>
          </div>
          <div className="id-row secondary">
            <span className="id-label">Previous ID</span>
            <span className="id-value">{orderData.prevId || 'N/A'}</span>
          </div>
        </div>
      </header>

      <div className={`status-announcement active-step-${safeIndex}`}>
        <div className="pulse-dot"></div>
        <div className="announcement-content">
          <span className="status-label-top">{currentStep.label}</span>
          <p className="status-description">{currentStep.desc}</p>
        </div>
      </div>

      <div className="status-timeline-container">
        {steps.map((step, index) => {
          const isActive = orderData.currentStatus === step.key;
          const isCompleted = currentIndex > index;
          const isLast = index === steps.length - 1;
          const isShipped = orderData.currentStatus === 'shipped';
          const showLoader = isActive && !isShipped;

          return (
            <div
              key={step.key}
              className={`status-node 
                ${isActive ? 'is-active' : ''} 
                ${isCompleted ? 'is-completed' : ''}
                ${isActive && isShipped ? 'shipped-glow' : ''}
                clickable-node`}
              onClick={() => handleStepClick(step)}
            >
              <div className="node-visual">
                {!isLast && <div className={`node-connector ${isCompleted ? 'filled' : ''}`}></div>}
                
                <div className="node-circle">
                  {showLoader && <div className="status-spinner"></div>}
                  <span className="icon-wrapper">
                    {/* If completed, show a checkmark. If not, show the step icon */}
                    {isCompleted ? <LuCheck size={20} strokeWidth={3} /> : React.cloneElement(step.icon, { size: 22, strokeWidth: 2 })}
                  </span>
                  <span className="click-hint">Set {step.label}</span>
                </div>
              </div>
              <div className="node-label">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;