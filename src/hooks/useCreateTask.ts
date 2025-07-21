import type { Task } from '../types/types';

import { API_URL } from './config';

export const useCreateTask = () => {
  return async (formData: Omit<Task, 'id'>) => {
    formData.createdDate = Date.now();
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return await res.json();
  };
};
