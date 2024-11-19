import React, { useState } from 'react';
import './DisplayMenu.css';
import Display from '../assests/Display.svg';

const groupingOptions = [
  { value: 'status', label: 'Status' },
  { value: 'user', label: 'User' },
  { value: 'priority', label: 'Priority' },
];

const orderingOptions = [
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
];

export function DisplayMenu({ displayState, setDisplayState }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (type, value) => {
    setDisplayState({
      ...displayState,
      [type]: value,
    });
    setIsOpen(false); // Close the menu after selection
  };

  return (
    <div className="display-menu">
      <button
        className="display-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={Display} alt="Menu" className="menu-icon" />
        Display
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          {/* Grouping Menu */}
          <div className="menu-item">
            <label>Grouping</label>
            <select
              value={displayState.grouping}
              onChange={(e) => handleChange('grouping', e.target.value)}
            >
              {groupingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Ordering Menu */}
          <div className="menu-item">
            <label>Ordering</label>
            <select
              value={displayState.ordering}
              onChange={(e) => handleChange('ordering', e.target.value)}
            >
              {orderingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
