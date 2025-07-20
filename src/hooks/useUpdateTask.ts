import type { Task } from '../types/types';

import { API_URL } from './config';

export const useUpdateTask = () => {
  return async (id: string, formData: Partial<Task>) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return await res.json();
  };
};
