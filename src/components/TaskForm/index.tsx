import React, { useState, useEffect } from 'react';

import type { Task } from '../../types/types';

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
    onSubmit({ ...form, status: (form?.status as Task['status']) ?? 'To-Do' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="relative z-10"
    >
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="text-xl font-semibold mb-4">
                {isEdit ? 'Edit Task' : 'Add New Task'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                  className="w-full border rounded px-3 py-2"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border rounded px-3 py-2"
                />
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>To-Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {isEdit ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
