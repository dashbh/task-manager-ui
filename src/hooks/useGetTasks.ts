import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import type { Task } from '../types/types';

import { API_URL } from './config';

export function useGetTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
      //   toast.success('Task List Loaded', { duration: 1000 });
    } catch (err) {
      setError('Failed to fetch tasks');
      toast.error('Error loading tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, refetch: fetchTasks };
}
