import React, { useState } from 'react';
import { 
  LuFileText, 
  LuTrash2, 
  LuDownload, 
  LuCloudUpload,
  LuFileCode,
//   LuCheckCircle,
  LuChevronDown,
  LuPlus
} from "react-icons/lu";
import './ScanFileManagement.css'; // This will contain your OrderManagement styles

const OrderSection = ({ title, icon, actionText, onAction, children }) => {
  const [isExpanded, setIsExpanded] = useState(true); 

  return (
    <div className={`order-card ${isExpanded ? 'is-open' : 'is-closed'}`}>
      <div className="order-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="header-main">
          <div className="header-icon-box">{icon}</div>
          <div className="header-info">
            <h3>{title}</h3>
            <p className="status-text">{isExpanded ? 'Manage entries' : 'Click to view'}</p>
          </div>
        </div>
        <div className={`arrow-icon ${isExpanded ? 'rotated' : ''}`}>
          <LuChevronDown size={20} />
        </div>
      </div>

      <div className="order-card-content">
        <div className="content-inner">
          {actionText && (
            <div className="internal-action-bar">
              <button className="add-btn-sleek" onClick={(e) => { e.stopPropagation(); onAction(); }}>
                <LuPlus size={18} strokeWidth={3} />
                <span>{actionText}</span>
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

const ScanManagement = () => {
  const scannedFiles = []; // Empty state demo

  return (
    <div className="order-management-wrapper">
      
      {/* Section 1: 3D Scanned Files */}
      <OrderSection 
        title="3D SizeME Scanned Files" 
        icon={<LuFileCode size={20} />}
      >
        <div className="sleek-list">
          {scannedFiles.length > 0 ? (
            scannedFiles.map(file => (
               <div key={file.id} className="list-item">
                 {/* ... existing file mapping logic ... */}
               </div>
            ))
          ) : (
            <div className="empty-state-container">
              <p>No files scanned yet.</p>
            </div>
          )}
        </div>
      </OrderSection>

      {/* Section 2: Scan Files Attachment */}
      <OrderSection 
        title="Scan Files" 
        icon={<LuCloudUpload size={20} />}
      >
        <div className="attachment-interface">
          <div className="input-group-modern">
            <div className="select-wrapper">
              <select className="modern-select">
                <option>Select Scan Files</option>
                <option>Scan_Left_Foot.obj</option>
              </select>
              <LuChevronDown className="select-icon" />
            </div>
            <button className="attach-btn-glow">Attach</button>
          </div>

          <div className="sleek-list" style={{marginTop: '16px'}}>
            <div className="list-item selected-highlight">
              <div className="file-icon-type">
                <LuFileCode size={20} />
              </div>
              <div className="item-details">
                <p className="item-main-text">/wealcan_llc/Mark_Trusty_059123_000084.usl</p>
                <div className="item-meta">
                  <span className="meta-block" style={{color: '#10b981'}}>
                    Ready to process
                  </span>
                </div>
              </div>
              <div className="item-actions">
                <button className="action-icon-btn delete"><LuTrash2 size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </OrderSection>

    </div>
  );
};

export default ScanManagement;