import React from 'react';
import { LuClipboardList, LuPencil, LuZap, LuBox, LuRuler, LuActivity } from "react-icons/lu";
import './OrderInformation.css';

const OrderInformation = ({ data, onEdit }) => {
  // We group fields into logical sections for better scannability
  const sections = [
    {
      title: "Core Specifications",
      icon: <LuBox size={14} />,
      fields: [
        { label: 'Orthotic Type', value: data?.orthoticType },
        { label: 'Quantity', value: data?.quantity },
        { label: 'Shoe Type', value: data?.shoeType },
        { label: 'Orthotic Length', value: data?.length },
      ]
    },
    {
      title: "Material & Build",
      icon: <LuZap size={14} />,
      fields: [
        { label: 'Shell Material', value: data?.material },
        { label: 'Mid Layer', value: data?.midLayer },
        { label: 'Top Cover', value: data?.topCover },
        { label: 'Rush Order', value: data?.isRush ? 'Priority' : 'Standard', isHighlight: data?.isRush },
      ]
    },
    {
      title: "Clinical Details",
      icon: <LuActivity size={14} />,
      fields: [
        { label: 'Arch Height', value: data?.archHeight },
        { label: 'Pathology', value: data?.pathology },
        { label: 'Corrections', value: data?.corrections },
      ]
    },
    {
      title: "Heel Measurements",
      icon: <LuRuler size={14} />,
      fields: [
        { label: 'Heel Left', value: data?.heelLeft },
        { label: 'Heel Right', value: data?.heelRight },
      ]
    }
  ];

  return (
    <div className="premium-order-card">
      {/* Header Section */}
      <div className="order-header-main">
        <div className="title-block">
          <div className="icon-badge-main">
            <LuClipboardList size={22} strokeWidth={2.5} />
          </div>
          <div className="text-group">
            <h3>Order Information</h3>
            <p>Technical specifications and clinical requirements</p>
          </div>
        </div>
        
        <button className="btn-edit-premium" onClick={onEdit}>
          <LuPencil size={14} strokeWidth={3} />
          <span>Edit Order</span>
        </button>
      </div>

      {/* Grouped Content */}
      <div className="order-content-grid">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="info-section-group">
            <div className="section-label">
              {section.icon}
              <span>{section.title}</span>
            </div>
            
            <div className="fields-sub-grid">
              {section.fields.map((field, fIdx) => (
                <div key={fIdx} className={`info-data-cell ${field.isHighlight ? 'rush-highlight' : ''}`}>
                  <label>{field.label}</label>
                  <div className="data-value">{field.value || '—'}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderInformation;