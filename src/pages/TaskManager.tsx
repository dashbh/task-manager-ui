import { useState } from 'react';
import { toast } from 'sonner';

import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useGetTasks } from '../hooks/useGetTasks';
import type { Task } from '../types/types';

function TaskManager() {
  const { tasks, loading, error, refetch } = useGetTasks();
  const deleteTask = useDeleteTask();
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
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
    refetch();
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (taskToDelete) {
      try {
        await deleteTask(taskToDelete.id);
        toast.success(`Deleted: ${taskToDelete.title}`);
        refetch();
      } catch (error) {
        toast.success(`Deleted: ${taskToDelete.title}`);
        console.log(error);
      } finally {
        setDeleteOpen(false);
      }
    }
  };

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
          {loading && <p>Loading tasks...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {tasks && tasks.length > 0 && (
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={openDeleteModal}
            />
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        task={taskToDelete}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </main>
  );
}

export default TaskManager;
