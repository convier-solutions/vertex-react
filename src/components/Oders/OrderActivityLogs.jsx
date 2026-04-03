import React from 'react';
import { 
  LuHistory, 
  LuUser, 
  LuClock, 
  LuDisc,           /* Swapped from LuCircleDot */
  LuBadgeCheck,     /* Swapped from LuCheckCircle */
  LuPackage,
  LuMessageSquare
} from "react-icons/lu";
import './OrderActivityLogs.css';

const ActivityItem = ({ log, isLast }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return <LuBadgeCheck size={14} />;
      case 'comment': return <LuMessageSquare size={14} />;
      case 'shipped': return <LuPackage size={14} />;
      default: return <LuDisc size={14} />;
    }
  };

  return (
    <div className="log-item">
      <div className="log-timeline">
        <div className="timeline-dot">{getStatusIcon(log.status)}</div>
        {!isLast && <div className="timeline-line"></div>}
      </div>

      <div className="log-content-card">
        <div className="log-main-info">
          <div className="log-collaborator">
            <div className="user-avatar">{log.collaborator[0]}</div>
            <div className="user-details">
              <span className="user-name">{log.collaborator}</span>
              <span className="user-label">Collaborator</span>
            </div>
          </div>

          <div className="log-status-section">
            <span className={`status-pill ${log.status.toLowerCase()}`}>
              {log.status}
            </span>
          </div>
        </div>

        <div className="log-meta">
          <div className="meta-item">
            <LuClock size={12} />
            <span>{log.datetime}</span>
          </div>
          <div className="meta-description">
            {log.description}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderActivityLogs = () => {
  const activityData = [
    {
      id: 1,
      collaborator: "James Smith",
      datetime: "Oct 24, 2023 • 02:15 PM",
      status: "Shipped",
      description: "Order marked as shipped via FedEx Express."
    },
    {
      id: 2,
      collaborator: "Emily Davis",
      datetime: "Oct 23, 2023 • 10:00 AM",
      status: "Completed",
      description: "Production finalized and quality check passed."
    },
    {
      id: 3,
      collaborator: "Michael Johnson",
      datetime: "Oct 22, 2023 • 09:30 AM",
      status: "Comment",
      description: "Client requested a change in the shipping address."
    }
  ];

  return (
    <div className="activity-logs-wrapper">
      <div className="logs-header">
        <div className="header-title">
          <LuHistory size={18} />
          <h3>Order Activity Logs</h3>
        </div>
        <span className="log-count">{activityData.length} Events</span>
      </div>

      <div className="logs-container">
        {activityData.map((log, index) => (
          <ActivityItem 
            key={log.id} 
            log={log} 
            isLast={index === activityData.length - 1} 
          />
        ))}
      </div>
    </div>
  );
};

export default OrderActivityLogs;