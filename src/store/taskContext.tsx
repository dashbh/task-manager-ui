import React, { createContext, useContext, useReducer } from 'react';

import type { Task, TaskAction } from '../types/types';

import { taskReducer, initialState } from './reducer';

type TaskContextType = {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
