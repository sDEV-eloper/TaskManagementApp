import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'To-Do' | 'In Progress' | 'Under Review' | 'Completed';
  priority?: 'Low' | 'Medium' | 'Urgent';
  deadline?: string;
}

interface BoardState {
  tasks: Task[];
}

const initialState: BoardState = {
  tasks: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTask(state, action: PayloadAction<{ id: string; status: Task['status'] }>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index].status = action.payload.status;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = boardSlice.actions;

export default boardSlice.reducer;
