import type { Task, TaskAction } from '../types/types';

export const setTasks = (tasks: Task[]): TaskAction => ({
  type: 'SET_TASKS',
  payload: tasks,
});

export const addTask = (task: Task): TaskAction => ({
  type: 'ADD_TASK',
  payload: task,
});

export const deleteTask = (id: string): TaskAction => ({
  type: 'DELETE_TASK',
  payload: id,
});

export const editTask = (id: string, status: string): TaskAction => ({
  type: 'EDIT_TASK',
  payload: { id, status },
});
