import type { Task, TaskAction } from '../types/types';

export type TaskState = Task[];

export const initialState: TaskState = [];

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}
