import React from 'react';
import './TicketCard.css';

// interface Props {
//   ticket: Ticket;
//   user?: User;
// }

export function TicketCard({ ticket, user }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
            />
            <span className={`status-dot ${user.available ? 'available' : 'away'}`} />
          </div>
        )}
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-tags">
        <span className="priority-tag">
          {getPriorityIcon(ticket.priority)}
        </span>
        {ticket.tag.map(tag => (
          <span key={tag} className="feature-tag">
            ○ {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function getPriorityIcon(priority) {
  switch (priority) {
    case 4:
      return '⚡';
    case 3:
      return '🔴';
    case 2:
      return '🟡';
    case 1:
      return '🔵';
    default:
      return '⚪';
  }
}