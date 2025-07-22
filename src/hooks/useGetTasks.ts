import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

import type { Task } from '../types/types';

import { API_URL } from './config';

export function useGetTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const shouldTriggerFetch = useRef(false);

  const fetchTasks = async (isRefetch: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}?_page=${currentPage}&_per_page=10&_sort=-createdDate`,
      );
      const data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!isRefetch) {
        setTasks((prev) => [...prev, ...(data?.data || [])]);
      } else {
        console.log('Refetch Triggered + ');
        setTasks(data?.data || []);
      }

      setHasMore(data.next !== null);
      //   toast.success('Task List Loaded', { duration: 1000 });
    } catch (err) {
      setError('Failed to fetch tasks');
      toast.error('Error loading tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  const refetch = useCallback(() => {
    setCurrentPage(1);
    shouldTriggerFetch.current = true;
    fetchTasks(true);
  }, []);

  useEffect(() => {
    if (shouldTriggerFetch.current && currentPage === 1) {
      fetchTasks(true);
      shouldTriggerFetch.current = false;
    } else {
      fetchTasks();
    }
  }, [currentPage]);

  return { tasks, loading, error, refetch, hasMore, loadMore };
}
