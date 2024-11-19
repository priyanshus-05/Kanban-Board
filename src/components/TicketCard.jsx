import React from 'react';
import '../components/TicketCard.css';

// Import status icons
import BacklogIcon from '../assests/Backlog.svg';
import TodoIcon from '../assests/To-do.svg';
import InProgressIcon from '../assests/in-progress.svg';
import DoneIcon from '../assests/Done.svg';
import CancelledIcon from '../assests/Cancelled.svg';

// Import priority icons
import UrgentIcon from '../assests/SVG - Urgent Priority colour.svg';
import HighIcon from '../assests/Img - High Priority.svg';
import MediumIcon from '../assests/Img - Medium Priority.svg';
import LowIcon from '../assests/Img - Low Priority.svg';
import NoPriorityIcon from '../assests/No-priority.svg';

// Map statuses to icons
const STATUS_ICONS = {
  backlog: <img src={BacklogIcon} alt="Backlog" className="status-icon" />,
  todo: <img src={TodoIcon} alt="Todo" className="status-icon" />,
  'in progress': <img src={InProgressIcon} alt="In Progress" className="status-icon" />,
  done: <img src={DoneIcon} alt="Done" className="status-icon" />,
  canceled: <img src={CancelledIcon} alt="Cancelled" className="status-icon" />,
};

// Map priorities to icons
const PRIORITY_ICONS = {
  4: <img src={UrgentIcon} alt="Urgent Priority" className="priority-icon" />,
  3: <img src={HighIcon} alt="High Priority" className="priority-icon" />,
  2: <img src={MediumIcon} alt="Medium Priority" className="priority-icon" />,
  1: <img src={LowIcon} alt="Low Priority" className="priority-icon" />,
  0: <img src={NoPriorityIcon} alt="No Priority" className="priority-icon" />,
};

export function TicketCard({ ticket, user, grouping }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {/* Do not show user avatar when grouped by user */}
        {grouping !== 'user' && user && (
          <div className="user-avatar">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
            />
            <span className={`status-dot ${user.available ? 'available' : 'away'}`} />
          </div>
        )}
      </div>
      <h3 className="ticket-title">
        {/* Show the status icon in the title */}
        {(grouping === 'priority' || grouping === 'user') &&
          STATUS_ICONS[ticket.status.toLowerCase()]}
        {ticket.title}
      </h3>
      <div className="ticket-tags">
        {/* Show the priority icon at the bottom-left when grouped by user or status */}
        {(grouping === 'user' || grouping === 'status') && (
          <span className="priority-icon-container">
            {PRIORITY_ICONS[ticket.priority]}
          </span>
        )}
        {ticket.tag && ticket.tag.length > 0 &&
          ticket.tag.map((tag) => (
            <span key={tag} className="feature-tag">
              <span className="filled-circle"></span> {tag}

            </span>
          ))}
      </div>
    </div>
  );
}
