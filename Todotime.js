import React from 'react';

const Todotime = ({ todo }) => {
  const timeDifference = (startTime, endTime) => {
    if (!startTime || !endTime) return "未計測"; 
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const differenceMs = end.getTime() - start.getTime(); 
    const differenceSec = Math.floor(differenceMs / 1000);
    const hours = Math.floor(differenceSec / 3600);
    const minutes = Math.floor((differenceSec % 3600) / 60);
    const seconds = differenceSec % 60;

    return `${hours}時間${minutes}分${seconds}秒`;
  };


  return (
    <div>
      <div>勉強時間: {timeDifference(todo.startTime, todo.endTime)}</div>
    </div>
  );
};

export default Todotime;