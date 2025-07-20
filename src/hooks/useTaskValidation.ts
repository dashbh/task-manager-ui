import { useState } from 'react';

import type { Task } from '../types/types';

export interface TaskValidationErrors {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: string;
}

export function useTaskValidation() {
  const [errors, setErrors] = useState<TaskValidationErrors>({});

  const validate = (data: Omit<Task, 'id'>): boolean => {
    const newErrors: TaskValidationErrors = {};

    if (!data.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (data.description && data.description.length > 300) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    const validStatuses = ['To-Do', 'In Progress', 'Completed'];
    if (!validStatuses.includes(data.status)) {
      newErrors.status = 'Invalid status';
    }

    const date = new Date(data.dueDate);
    if (date < new Date()) {
      newErrors.dueDate = 'Due date must be a valid future date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    validate,
  };
}
