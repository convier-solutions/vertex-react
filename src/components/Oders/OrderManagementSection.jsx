import React, { useState } from 'react';
import { 
  LuFilePlus, 
  LuFileText, 
  LuTrash2, 
  LuDownload, 
  LuChevronDown,
  LuClock,
  LuUser,
  LuPlus
} from "react-icons/lu";
import './OrderManagement.css';

const OrderSection = ({ title, icon, actionText, onAction, children }) => {
  // Set to false by default to show the "Clean" closed state
  const [isExpanded, setIsExpanded] = useState(false); 

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
          <div className="internal-action-bar">
            <button className="add-btn-sleek" onClick={(e) => { e.stopPropagation(); onAction(); }}>
              <LuPlus size={18} strokeWidth={3} />
              <span>{actionText}</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

// ... (imports remain the same)

const OrderManagement = () => {
  const notes = [{ id: 1, text: "3mm lateral forefoot wedge soft dancer pad", creator: "Customer", date: "Oct 12, 2023" }];
  const files = [{ id: 1, name: "Scan_Left_Foot.obj", type: "3D Model", creator: "Admin", date: "Oct 14, 2023" }];

  return (
    <div className="order-management-wrapper">
      <OrderSection title="Order Notes" icon={<LuFileText size={20} />} actionText="Add New Note" onAction={() => {}}>
        <div className="sleek-list">
          {notes.map(note => (
            <div key={note.id} className="list-item">
              {/* Added a placeholder or spacer to align with file section if desired, 
                  or keep it clean as is. I've optimized the CSS to handle both. */}
              <div className="item-details">
                <p className="item-main-text">{note.text}</p>
                <div className="item-meta">
                  <span className="meta-block"><LuUser size={14} /> {note.creator}</span>
                  <span className="separator">•</span>
                  <span className="meta-block"><LuClock size={14} /> {note.date}</span>
                </div>
              </div>
              <div className="item-actions">
                <button className="action-icon-btn delete" title="Delete"><LuTrash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </OrderSection>

      <OrderSection title="Order Files" icon={<LuFilePlus size={20} />} actionText="Upload New File" onAction={() => {}}>
        <div className="sleek-list">
          {files.map(file => (
            <div key={file.id} className="list-item">
              <div className="file-icon-type">
                <LuFileText size={20} />
              </div>
              <div className="item-details">
                <p className="item-main-text">{file.name}</p>
                <div className="item-meta">
                  <span className="meta-block"><LuUser size={14} /> {file.creator}</span>
                  <span className="separator">•</span>
                  <span className="meta-block"><LuClock size={14} /> {file.date}</span>
                </div>
              </div>
              <div className="item-actions">
                <button className="action-icon-btn download" title="Download"><LuDownload size={16} /></button>
                <button className="action-icon-btn delete" title="Delete"><LuTrash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </OrderSection>
    </div>
  );
};


export default OrderManagement;