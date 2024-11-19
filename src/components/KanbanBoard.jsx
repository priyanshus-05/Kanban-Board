import React from 'react';
import { TicketCard } from './TicketCard';
import { Circle, CheckCircle2, Clock, XCircle, AlertTriangle, Signal, MoreHorizontal, Plus } from 'lucide-react';
import './KanbanBoard.css';
import ToDoIcon from '../assests/To-do.svg';
import CancelledIcon from '../assests/Cancelled.svg';
import InProgressIcon from '../assests/in-progress.svg';
import highpriority from '../assests/Img - High Priority.svg';
import lowpriority from '../assests/Img - Low Priority.svg';
import mediumpriority from '../assests/Img - Medium Priority.svg';
import nopriority from '../assests/No-priority.svg';
import urgentpriority from '../assests/SVG - Urgent Priority colour.svg';
import backlog from '../assests/Backlog.svg';
import done from '../assests/Done.svg';


const STATUS_ICONS = {
    'Backlog': <img src={backlog} alt="Backlog Icon" className="status-icon" />,
    'Todo': <img src={ToDoIcon} alt="Todo Icon" className="status-icon" />, // **Updated**
    'In Progress': <img src={InProgressIcon} alt="In Progress Icon" className="status-icon" />, // **Updated**
    'Done': <img src={done} alt="Done Icon" className="status-icon" />, 
    'Canceled': <img src={CancelledIcon} alt="Cancelled Icon" className="status-icon" />, // **Updated**
  };

  const PRIORITY_ICONS = {
    4: <img src={urgentpriority} alt="Urgent Priority Icon" className="priority-icon" />, // **Updated**
    3: <img src={highpriority} alt="High Priority Icon" className="priority-icon" />, // **Updated**
    2: <img src={mediumpriority} alt="Medium Priority Icon" className="priority-icon" />, // **Updated**
    1: <img src={lowpriority} alt="Low Priority Icon" className="priority-icon" />, // **Updated**
    0: <img src={nopriority} alt="No Priority Icon" className="priority-icon" />, // **Updated**
  };

const PRIORITY_LABELS = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

export function KanbanBoard({ tickets, users, displayState }) {
  const groupTickets = () => {
    const sortedTickets = [...tickets].sort((a, b) => {
      if (displayState.ordering === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });

    switch (displayState.grouping) {
      case 'status':
        return groupByStatus(sortedTickets);
      case 'user':
        return groupByUser(sortedTickets, users);
      case 'priority':
        return groupByPriority(sortedTickets);
      default:
        return {};
    }
  };

  const groupByStatus = (tickets) => {
    const statusOrder = ['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled'];
    const groups = tickets.reduce((acc, ticket) => {
      const normalizedStatus = ticket.status.trim().toLowerCase(); // Normalize to lowercase
      console.log("Normalized Status:", normalizedStatus); // Debug log
  
      // Match normalized statuses with the expected format
      const formattedStatus = statusOrder.find(
        (status) => status.toLowerCase() === normalizedStatus
      );
  
      if (!formattedStatus) {
        console.warn("Unexpected status:", ticket.status);
        return acc; // Skip tickets with unexpected statuses
      }
  
      if (!acc[formattedStatus]) {
        acc[formattedStatus] = [];
      }
      acc[formattedStatus].push(ticket); // Use formattedStatus for grouping
      return acc;
    }, {});
  
    return Object.fromEntries(
      statusOrder.map((status) => [status, groups[status] || []])
    );
  };
  
  
  

  const groupByUser = (tickets, users) => {
    return tickets.reduce((groups, ticket) => {
      const user = users.find(u => u.id === ticket.userId);
      const userName = user ? user.name : 'Unassigned';
      if (!groups[userName]) {
        groups[userName] = [];
      }
      groups[userName].push(ticket);
      return groups;
    }, {});
  };

  const groupByPriority = (tickets) => {
    const priorityOrder = [0,4, 3, 2, 1];
    const groups = tickets.reduce((acc, ticket) => {
      const priority = PRIORITY_LABELS[ticket.priority];
      if (!acc[priority]) {
        acc[priority] = [];
      }
      acc[priority].push(ticket);
      return acc;
    }, {});

    return Object.fromEntries(
      priorityOrder.map(priority => [
        PRIORITY_LABELS[priority ],
        groups[PRIORITY_LABELS[priority]] || []
      ])
    );
  };

  const getGroupIcon = (groupName) => {
    if (displayState.grouping === 'status') {
      return STATUS_ICONS[groupName ];
    }
    if (displayState.grouping === 'priority') {
      const priorityLevel = Object.entries(PRIORITY_LABELS).find(([_, label]) => label === groupName);
      return priorityLevel ? PRIORITY_ICONS[Number(priorityLevel[0]) ] : null;
    }
    return null;
  };

  const groups = groupTickets();
//   console.log("Grouped Tickets in KanbanBoard:", groups); 
  return (
    <div className="kanban-board">
      {Object.entries(groups).map(([groupName, groupTickets]) => (
        <div key={groupName} className="ticket-group">
          <div className="group-header">
            <div className="group-header-left">
              {getGroupIcon(groupName)}
              <h2>{groupName}</h2>
              <span className="ticket-count">{groupTickets.length}</span>
            </div>
            <div className="group-header-right">
              <button className="icon-button">
                <Plus size={16} /> {/* Added Plus Icon */}
              </button>
              <button className="icon-button">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
          <div className="tickets-container">
            {groupTickets.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                user={users.find(u => u.id === ticket.userId)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}