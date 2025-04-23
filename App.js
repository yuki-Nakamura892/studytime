import React, { useState, useRef, useEffect } from "react";
import Todotime from "./Todotime";
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Todoprior from "./Todoprior";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const [priority, setPriority] = useState('中'); 
  const [deadline, setDeadline] = useState('');   
  const [nowLevel, setNowLevel] = useState(0);
  const needTime = 60 * 60 * 1000; // 60分 (ミリ秒)

  const handleAppAdd = () => {
    const name = todoNameRef.current.value;
    if (name === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { 
        id: uuidv4(), 
        name: name,
        startTime: null,
        endTime: null,
        priority: priority, 
        deadline: deadline 
      }];
    });

    todoNameRef.current.value = null; 
  };

  const handleStartButtonClick = (id) => {
    const now = new Date().getTime(); 

    setTodos(prevTodos => {
      return prevTodos.map(todo => 
        todo.id === id ? { ...todo, startTime: now } : todo
      );
    });
  };

  const handleEndButtonClick = (id) => {
    const now = new Date().getTime();

    setTodos(prevTodos => {
      return prevTodos.map(todo => 
        todo.id === id ? { ...todo, endTime: now } : todo
      );
    });
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    
  };

  const handleDeadlineChange = (newDeadline) => {
    setDeadline(newDeadline);
    
  };

    
    const calculateTotalStudyTime = (todos) => {
      if (!Array.isArray(todos)) {
        return "0時間0分0秒";
      }
      
      let totalMs = 0;
      todos.forEach(item => {
        if (item.startTime && item.endTime) {
          totalMs += new Date(item.endTime).getTime() - new Date(item.startTime).getTime();
        }
      });
      
      const totalSec = Math.floor(totalMs / 1000);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;
  
      return `${hours}時間${minutes}分${seconds}秒`;
    };


    const calculateStudyTime = (startTime, endTime) => {
      if (!startTime || !endTime) return 0;
      return endTime - startTime;
    };
  
    useEffect(() => {
      let totalStudyTime = 0;
      todos.forEach(todo => {
        totalStudyTime += calculateStudyTime(todo.startTime, todo.endTime);
      });
  
      if (totalStudyTime >= needTime * (nowLevel + 2)) {
        setNowLevel(prevLevel => prevLevel + 1);
      }
    }, [todos, needTime]); 

  return (
    <div>
      <h1 className="title">
        Study Plan
      </h1>
      <div className="studyplan-container">
        <div className="level">
          <h3>現在のレベル: {nowLevel}</h3>
          <p>次のレベルまでの必要時間: {(needTime * (nowLevel + 2) / 1000) / 60 }分</p>
        </div>
        <h2 className="studyplan-title">Study Plan</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.name}
              <button 
                onClick={() => handleStartButtonClick(todo.id)} 
                className="start-button"
                disabled={todo.startTime !== null}
              >
                Start
              </button>
              <button 
                onClick={() => handleEndButtonClick(todo.id)} 
                className="end-button"
                disabled={todo.startTime === null || todo.endTime !== null}
              >
                End
              </button>
              <div>
                開始時間: {todo.startTime ? new Date(todo.startTime).toLocaleTimeString('ja-JP') : "未設定"}
                , 終了時間: {todo.endTime ? new Date(todo.endTime).toLocaleTimeString('ja-JP') : "未設定"}
              </div>
              <div>優先度: {todo.priority}, 締切: {todo.deadline || "未設定"}</div>
              <Todotime todo={todo} />
            </li>
          ))}
        </ul>
      </div>
      <div className="input-container">
        <input type="text" ref={todoNameRef} placeholder="新しいタスクを入力..."  className="input" />
        <button onClick={handleAppAdd} className="add-button">Add</button>
        <Todoprior 
          onPriorityChange={handlePriorityChange}
          onDeadlineChange={handleDeadlineChange}
        />
      </div>
      {/* Total study time for all todos */}
      <div className="total-time">
        <h3>総勉強時間</h3>
        {calculateTotalStudyTime(todos)}
      </div>
    </div>
  );
}

export default App;
