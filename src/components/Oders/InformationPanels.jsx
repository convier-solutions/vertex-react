import React, { useState } from 'react';
import { 
  LuBuilding, 
  LuUser, 
  LuMail, 
  LuUsers, 
  LuPhone, 
  LuCalendar, 
  LuFootprints, 
  LuScale, 
  LuRuler, 
  LuChevronDown
} from "react-icons/lu"; 
import { FaMars, FaVenus } from "react-icons/fa6";
import './InformationPanels.css';

const InformationPanel = ({ title, icon, isExpandedInitial = true, children, variant = "default" }) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedInitial);

  return (
    <div className={`sleek-card ${isExpanded ? 'is-expanded' : ''}`}>
      <div className="sleek-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="header-content">
          <div className="header-icon">{icon}</div>
          <div className="header-text">
            <h3 className="header-title">{title}</h3>
            <span className="header-subtitle">{isExpanded ? 'Hide details' : 'Show details'}</span>
          </div>
        </div>
        <div className={`header-arrow ${isExpanded ? 'rotated' : ''}`}>
          <LuChevronDown size={20} />
        </div>
      </div>

      <div className={`sleek-content-wrapper ${isExpanded ? 'open' : ''}`}>
        {/* Added dynamic class for grid layout control */}
        <div className={`sleek-grid ${variant === 'wide' ? 'grid-wide' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, icon, extra }) => (
  <div className="sleek-field">
    <div className="field-label">
      {icon}
      <span>{label}</span>
    </div>
    <div className="field-value-wrapper">
      <span className="field-value">{value || '—'}</span>
      {extra && <span className="field-badge">{extra}</span>}
    </div>
  </div>
);

const InformationDashboard = ({ customerData, patientData }) => {
  const customer = customerData || { name: 'Wealcan LLC', email: 'cs@wealcan.com', role: 'Main Admin' };
  const patient = patientData || { 
    firstName: 'Adam', 
    lastName: 'Hartman', 
    id: '059123-001',
    email: 'adam.hartman@email.com', 
    phone: '+1 (555) 123-4567', 
    birthdate: 'Jan. 24, 2024', 
    height: 185, 
    weight: 90, 
    shoeSize: 'M 13.5 / W 15',
    gender: 'M'
  };

  return (
    <div className="sleek-dashboard">
      {/* Used variant="wide" to fill space on large screens */}
      <InformationPanel title="Customer Overview" icon={<LuBuilding size={18} />} variant="wide">
        <InfoField label="Business" value={customer.name} icon={<LuUsers size={13} />} />
        <InfoField label="Email" value={customer.email} icon={<LuMail size={13} />} />
        <InfoField label="Role" value={customer.role} icon={<LuUser size={13} />} />
      </InformationPanel>

      <InformationPanel title="Patient Profile" icon={<LuUser size={18} />}>
        <InfoField 
            label="Name" 
            value={`${patient.firstName} ${patient.lastName}`} 
            icon={patient.gender === 'M' ? <FaMars size={13} /> : <FaVenus size={13} />}
            extra={patient.id}
        />
        <InfoField label="Contact" value={patient.phone} icon={<LuPhone size={13} />} />
        <InfoField label="Birthday" value={patient.birthdate} icon={<LuCalendar size={13} />} />
        <InfoField label="Height" value={patient.height} icon={<LuRuler size={13} />} extra="cm" />
        <InfoField label="Weight" value={patient.weight} icon={<LuScale size={13} />} extra="kg" />
        <InfoField label="Shoe Size" value={patient.shoeSize} icon={<LuFootprints size={13} />} />
      </InformationPanel>
    </div>
  );
};

export default InformationDashboard;