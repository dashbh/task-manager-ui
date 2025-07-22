import { useState, lazy, Suspense, useCallback } from 'react';
import { toast } from 'sonner';

import Loader from '../components/common/Loader';
import TaskList from '../components/TaskList';
import { useCreateTask } from '../hooks/useCreateTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useGetTasks } from '../hooks/useGetTasks';
import { useUpdateTask } from '../hooks/useUpdateTask';
import type { Task } from '../types/types';

const TaskForm = lazy(() => import('../components/TaskForm'));
const ConfirmDeleteModal = lazy(
  () => import('../components/ConfirmDeleteModal'),
);

function TaskManager() {
  const { tasks, loading, error, refetch, loadMore, hasMore } = useGetTasks();
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();
  const createTask = useCreateTask();

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

  const handleEdit = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsEdit(true);
    setModalOpen(true);
  }, []);

  const handleSubmit = async (formData: Omit<Task, 'id'>) => {
    if (isEdit && selectedTask) {
      await updateTask(selectedTask.id, formData);
      toast.success(`Task: ${selectedTask?.title} Updated`);
    } else {
      await createTask(formData);
      toast.success(`New Task: ${formData?.title} Created`);
    }

    setModalOpen(false);
    setIsEdit(false);
    setSelectedTask(null);
    refetch();
  };

  const openDeleteModal = useCallback((task: Task) => {
    setTaskToDelete(task);
    setDeleteOpen(true);
  }, []);

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
    <main className="min-h-screen bg-white pt-4 md:p-20 flex flex-col items-center">
      <div className="container mx-auto">
        <div className="sticky top-0 z-10 bg-white pb-0 pt-6 border-b-1 border-gray-300">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2 md:mb-8 px-4 md:px-0">
            Task Manager
          </h1>

          <div className="flex gap-2 mb-4 px-4 md:px-0">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-xs md:text-md text-white px-4 py-2 rounded cursor-pointer"
            >
              Add Task
            </button>
          </div>

          <div className="px-4 md:px-0 text-right">
            {error && (
              <div className="text-sm md:text-lg text-red-500 py-2">
                {error}
              </div>
            )}
            <div className="text-sm md:text-lg text-green-700 py-2">
              {loading && <Loader inline />} &nbsp; Total Rows: {tasks.length}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-4 bg-gray-200 text-sm font-bold text-gray-700 border border-gray-300">
            <span>Title</span>
            <span>Description</span>
            <span>Status</span>
            <span>Due Date</span>
            <span>Actions</span>
          </div>
        </div>

        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      </div>

      {/* Task Form & Delete Confirmation Modal */}
      <Suspense fallback={null}>
        {isModalOpen && (
          <TaskForm
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
            initialValues={selectedTask}
            isEdit={isEdit}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {isDeleteOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteOpen}
            task={taskToDelete}
            onCancel={() => setDeleteOpen(false)}
            onConfirm={handleDelete}
          />
        )}
      </Suspense>
    </main>
  );
}

export default TaskManager;
