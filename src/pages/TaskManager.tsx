import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { setTasks } from '../store/actions';
import { useTasks, useTaskDispatch } from '../store/selector';
import type { Task } from '../types/types';

export default function TaskManager() {
  const tasks: Task[] = useTasks();
  const dispatch = useTaskDispatch();
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleAdd = () => {
    setSelectedTask(null);
    setIsEdit(false);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEdit(true);
    setModalOpen(true);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/tasks');
      const data = await res.json();
      dispatch(setTasks(data));
    } catch (err) {
      toast.error('Failed to load tasks');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: Omit<Task, 'id'>) => {
    if (isEdit) {
      await fetch(`http://localhost:3001/tasks/${selectedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selectedTask, ...formData }),
      });
      toast.success(`Task: ${selectedTask?.title} Updated`, {
        duration: 5000,
      });
    } else {
      await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success(`New Task: ${selectedTask?.title} Created`);
    }

    setModalOpen(false);
    setIsEdit(false);
    setSelectedTask(null);
    fetchTasks();
  };

  const handleDelete = async (taskId: string) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE',
      });
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Task Manager
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>

          <TaskForm
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
            initialValues={selectedTask}
            isEdit={isEdit}
          />
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </main>
  );
}
