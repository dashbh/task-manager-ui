import { useEffect, useState } from 'react';

import TaskList from '../components/TaskList';
import { addTask, setTasks } from '../store/actions';
import { useTasks, useTaskDispatch } from '../store/selector';
import type { Task } from '../types/types';

export default function TaskManager() {
  const tasks: Task[] = useTasks();
  const dispatch = useTaskDispatch();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/tasks');
        const data = await res.json();
        dispatch(setTasks(data));
      } catch (err) {
        setError('Failed to load tasks');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch(
      addTask({
        id: crypto.randomUUID(),
        title: input.trim(),
        description: '',
        dueDate: '',
        status: 'To-Do',
      }),
    );
    setInput('');
  };

  if (loading) {
    return 'Loading...';
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Task Manager
        </h1>

        {error && (
          <div className="text-red-500 hover:text-red-600 text-sm">{error}</div>
        )}

        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a task..."
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
