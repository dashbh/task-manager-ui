import { API_URL } from './config';

export const useDeleteTask = () => {
  return async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete task');
  };
};
