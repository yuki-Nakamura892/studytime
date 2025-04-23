import React, { useState } from 'react';

const Todoprior = ({ onPriorityChange, onDeadlineChange }) => {
  const [priority, setPriority] = useState('中');
  const [deadline, setDeadline] = useState('');

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
    onPriorityChange(event.target.value); 
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
    onDeadlineChange(event.target.value); 
  };

  return (
    <div id="input">
      <select value={priority} onChange={handlePriorityChange}>
        <option>低</option>
        <option>中</option>
        <option>高</option>
      </select>
      <br />
      <label>期限：<input type="date" value={deadline} onChange={handleDeadlineChange} /></label><br />
    </div>
  );
};

export default Todoprior;