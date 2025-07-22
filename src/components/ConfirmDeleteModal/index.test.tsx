import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import type { Task } from '../../types/types';

import ConfirmDeleteModal from '.';

vi.mock('focus-trap-react', () => ({
  FocusTrap: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ConfirmDeleteModal', () => {
  const task: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Some description',
    status: 'To-Do',
    dueDate: '2025-07-25',
  };

  const onCancel = vi.fn();
  const onConfirm = vi.fn();

  beforeEach(() => {
    onCancel.mockClear();
    onConfirm.mockClear();
  });

  it('render modal on isOpen=true', () => {
    render(
      <ConfirmDeleteModal
        isOpen={true}
        task={task}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.getByText('Delete Task?')).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('Modal -> Cancel', () => {
    render(
      <ConfirmDeleteModal
        isOpen={true}
        task={task}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('Modal -> Delete', () => {
    render(
      <ConfirmDeleteModal
        isOpen={true}
        task={task}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('Modal -> is Open=false', () => {
    const { queryByText } = render(
      <ConfirmDeleteModal
        isOpen={false}
        task={task}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />,
    );

    expect(queryByText('Delete Task?')).not.toBeInTheDocument();
  });
});
