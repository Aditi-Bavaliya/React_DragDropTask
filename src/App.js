import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' },
    { id: 4, text: 'Task 4' },
    { id: 5, text: 'Task 5' },
    { id: 6, text: 'Task 6' },
    { id: 7, text: 'Task 7' },
    { id: 8, text: 'Task 8' },
    { id: 9, text: 'Task 9' },
    { id: 10, text: 'Task 10' },
  ]);

  const [blocks, setBlocks] = useState({
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    unplanned: tasks.map(task => task.id),
  });

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (event, blockName) => {
    const taskId = event.dataTransfer.getData('taskId');
    const updatedBlocks = { ...blocks };

    for (const key in updatedBlocks) {
      if (updatedBlocks[key].includes(parseInt(taskId))) {
        updatedBlocks[key] = updatedBlocks[key].filter(id => id !== parseInt(taskId));
        break;
      }
    }

    updatedBlocks[blockName] = [...updatedBlocks[blockName], parseInt(taskId)];
    setBlocks(updatedBlocks);
  };

  return (
    <>
    <h1>Drag & Drop Task</h1>
    <div className="App">
      <div className="block" onDrop={(event) => handleDrop(event, 'unplanned')} onDragOver={(event) => event.preventDefault()}>
        <h2>Unplanned</h2>
        {blocks.unplanned.map(taskId => (
          <div key={taskId} draggable onDragStart={(event) => handleDragStart(event, taskId)}>
            Task {taskId}
          </div>
        ))}
      </div>
      <div className="block" onDrop={(event) => handleDrop(event, 'today')} onDragOver={(event) => event.preventDefault()}>
        <h2>Today</h2>
        {blocks.today.map(taskId => (
          <div key={taskId} draggable onDragStart={(event) => handleDragStart(event, taskId)}>
            Task {taskId}
          </div>
        ))}
      </div>
      <div className="block" onDrop={(event) => handleDrop(event, 'tomorrow')} onDragOver={(event) => event.preventDefault()}>
        <h2>Tomorrow</h2>
        {blocks.tomorrow.map(taskId => (
          <div key={taskId} draggable onDragStart={(event) => handleDragStart(event, taskId)}>
            Task {taskId}
          </div>
        ))}
      </div>
      <div className="block" onDrop={(event) => handleDrop(event, 'thisWeek')} onDragOver={(event) => event.preventDefault()}>
        <h2>This Week</h2>
        {blocks.thisWeek.map(taskId => (
          <div key={taskId} draggable onDragStart={(event) => handleDragStart(event, taskId)}>
            Task {taskId}
          </div>
        ))}
      </div>
      <div className="block" onDrop={(event) => handleDrop(event, 'nextWeek')} onDragOver={(event) => event.preventDefault()}>
        <h2>Next Week</h2>
        {blocks.nextWeek.map(taskId => (
          <div key={taskId} draggable onDragStart={(event) => handleDragStart(event, taskId)}>
            Task {taskId}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default App;
