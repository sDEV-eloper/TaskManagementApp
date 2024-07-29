'use client';

import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '../../redux/slices/boardSlice';

interface ColumnProps {
  title: string;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
