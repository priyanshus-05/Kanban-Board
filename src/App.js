import React, { useEffect, useState } from 'react';
import { DisplayMenu } from './components/DisplayMenu';
import { KanbanBoard } from './components/KanbanBoard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayState, setDisplayState] = useState(() => {
    const saved = localStorage.getItem('displayState');
    return saved ? JSON.parse(saved) : { grouping: 'status', ordering: 'priority' };
  });
  

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
      //   console.log("Fetched Tickets:", data.tickets); 
      // console.log("Fetched Users:", data.users); 
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('displayState', JSON.stringify(displayState));
  }, [displayState]);

  return (
    <div className="app">
      <DisplayMenu displayState={displayState} setDisplayState={setDisplayState} />
      <KanbanBoard 
        tickets={tickets}
        users={users}
        displayState={displayState}
      />
    </div>
  );
}

export default App;