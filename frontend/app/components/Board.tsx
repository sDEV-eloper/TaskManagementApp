'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Column from './Column';

const Board: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.board.tasks);

  const columns = ['To-Do', 'In Progress', 'Under Review', 'Completed'];

  return (
    <div className="board">
      {columns.map((column) => (
        <Column key={column} title={column} tasks={tasks.filter((task) => task.status === column)} />
      ))}
    </div>
  );
};

export default Board;
