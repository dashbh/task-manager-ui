export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'To-Do' | 'In Progress' | 'Completed';
  dueDate: string;
  createdDate?: number;
};

export type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'EDIT_TASK'; payload: { id: string; status: string } };
