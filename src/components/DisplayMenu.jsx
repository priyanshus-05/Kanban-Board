import React, { useState } from 'react';
import './DisplayMenu.css';
import Display from '../assests/Display.svg';
// interface Props {
//   displayState: DisplayState;
//   setDisplayState: (state: DisplayState) => void;
// }

const groupingOptions = [
  { value: 'status', label: 'Status' },
  { value: 'user', label: 'User' },
  { value: 'priority', label: 'Priority' }
];

const orderingOptions = [
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' }
];

export function DisplayMenu({ displayState, setDisplayState }) {
  const [isOpen, setIsOpen] = useState(false);

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
              onChange={(e) =>
                setDisplayState({
                  ...displayState,
                  grouping: e.target.value,
                })
              }
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          {/* Ordering Menu */}
          <div className="menu-item">
            <label>Ordering</label>
            <select
              value={displayState.ordering}
              onChange={(e) =>
                setDisplayState({
                  ...displayState,
                  ordering: e.target.value,
                })
              }
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}