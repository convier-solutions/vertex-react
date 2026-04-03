import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdChevronRight } from 'react-icons/md';
import './PageHeader.css';

const PageHeader = ({ 
  title, 
  description, 
  breadcrumb = [], 
  icon: Icon,
  showBack = true,
  backPath = '/orders',
  actions
}) => {
  const navigate = useNavigate();

  return (
    <header className="page-header-container">
      {/* Breadcrumb Section */}
      <nav className="breadcrumb-nav">
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <span 
              className={`breadcrumb-link ${item.active ? 'active' : ''}`}
              onClick={() => !item.active && item.path && navigate(item.path)}
            >
              {item.label}
            </span>
            {index < breadcrumb.length - 1 && (
              <MdChevronRight className="breadcrumb-separator" />
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Main Content Section */}
      <div className="page-header-main">
        <div className="header-left">
          {Icon && (
            <div className="header-icon-glow">
              <div className="header-icon-inner">
                <Icon size={24} />
              </div>
            </div>
          )}
          <div className="header-titles">
            <h1 className="header-title ubuntu-bold">{title}</h1>
            {description && <p className="header-subtitle ubuntu-regular">{description}</p>}
          </div>
        </div>

        <div className="header-right">
          {actions && <div className="custom-actions">{actions}</div>}
          {showBack && (
            <button className="premium-back-btn" onClick={() => navigate(backPath)}>
              <MdArrowBack />
              <span>Go Back</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;