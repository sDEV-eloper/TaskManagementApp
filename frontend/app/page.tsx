"use client"

import React from 'react';
import Board from './components/Board';
import KanbanBoard from './components/KanbanBoard';



const HomePage: React.FC = () => {
  return (
    <div>
   <KanbanBoard/>
    </div>
  );
};

export default HomePage;
