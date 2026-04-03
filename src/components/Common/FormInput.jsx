import React from 'react';
import './Form.css';

const FormInput = ({ 
  label, 
  icon: Icon, 
  fullWidth, 
  error,
  ...props 
}) => {
  return (
    <div className={`form-field ${fullWidth ? 'full-width' : ''} ${error ? 'has-error' : ''}`}>
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" size={24} />}
        <input {...props} />
      </div>
      {error && <span className="form-error-text">{error}</span>}
    </div>
  );
};

export default FormInput;
