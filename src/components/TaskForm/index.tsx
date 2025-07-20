import React, { useState, useEffect } from 'react';

// import { useTaskValidation } from '../../hooks/useTaskValidation';
import type { Task } from '../../types/types';
import { Modal } from '../common/Modal';

type TaskFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: Omit<Task, 'id'>) => void;
  initialValues?: Partial<Task> | null;
  isEdit?: boolean;
};

const mapTaskValues = (values: Partial<Task> | null = {}) => ({
  title: values?.title ?? '',
  description: values?.description ?? '',
  status: values?.status ?? 'To-Do',
  dueDate: values?.dueDate ?? '',
});

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialValues = {},
  isEdit = false,
}: TaskFormModalProps) {
  const [form, setForm] = useState(() => mapTaskValues(initialValues));
  // const { errors, validate } = useTaskValidation();

  useEffect(() => {
    if (isOpen) {
      setForm(mapTaskValues(initialValues));
    }
  }, [isOpen, initialValues]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      status: (form?.status as Task['status']) ?? 'To-Do',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'Add New Task'}
    >
      <div className="p-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Description"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>To-Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <input
            type="date"
            name="dueDate"
            required
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            >
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
