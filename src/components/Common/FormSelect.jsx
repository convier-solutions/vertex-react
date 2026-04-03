import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import './Form.css';

const FormSelect = ({ 
  label, 
  icon: Icon, 
  fullWidth, 
  options = [], 
  placeholder = "Select an option",
  onChange,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, dropUp: false });
  
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const option = options.find(o => o.value === props.value);
    setSelectedOption(option || null);
  }, [props.value, options]);

  // Function to calculate position
  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = 280; // Matches max-height in CSS
      const margin = 8;
      
      // If space below is less than menu height, flip it up
      const shouldDropUp = spaceBelow < menuHeight && rect.top > menuHeight;

      setCoords({
        left: rect.left,
        width: rect.width,
        top: shouldDropUp 
          ? rect.top + window.scrollY - margin 
          : rect.bottom + window.scrollY + margin,
        dropUp: shouldDropUp
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option.value);
  };

  // The Portal Menu Content
  const menuContent = (
    <div 
      ref={dropdownRef}
      className={`apple-dropdown-menu ${coords.dropUp ? 'open-up' : ''}`}
      style={{
        position: 'absolute',
        top: coords.top,
        left: coords.left,
        width: coords.width,
        transform: coords.dropUp ? 'translateY(-100%)' : 'none',
      }}
    >
      {options.map((option) => (
  <div 
    key={option.value} 
    className={`apple-option ${selectedOption?.value === option.value ? 'selected' : ''}`}
    onClick={() => handleSelect(option)}
  >
    {/* Label on the left */}
    <span>{option.label}</span>
    
    {/* Check icon on the right */}
    {selectedOption?.value === option.value && (
      <span className="check-icon">✓</span>
    )}
  </div>
))}
    </div>
  );

  return (
    <div className={`form-field ${fullWidth ? 'full-width' : ''}`}>
      {label && <label>{label}</label>}
      <div 
        ref={triggerRef}
        className={`input-wrapper select-wrapper ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {Icon && <Icon className="input-icon" size={24} />}
        <div className="custom-select-trigger">
          {selectedOption ? selectedOption.label : placeholder}
        </div>
      </div>
      
      {/* Teleport the menu to the end of <body> to escape overflow:hidden */}
      {isOpen && createPortal(menuContent, document.body)}
    </div>
  );
};

export default FormSelect;