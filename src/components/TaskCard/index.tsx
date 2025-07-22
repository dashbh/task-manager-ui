import React from 'react';

import type { Task } from '../../types/types';

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

function TaskCard({ task, onEdit, onDelete }: Props) {
  console.log(`Rendered - Task ${task.id}`);

  return (
    <article
      key={task.id}
      className="md:items-center flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4 px-4 py-3 bg-white hover:bg-gray-50 transition rounded-lg shadow-sm"
    >
      {/* Title */}
      <div>
        <div className="text-sm text-gray-900 font-medium">{task.title}</div>
      </div>

      {/* Description */}
      <div className="relative group w-full">
        <p className="line-clamp-2 text-sm text-gray-700">{task.description}</p>

        <div
          className="absolute bottom-full mb-1 left-0 z-10 hidden group-hover:block bg-black text-white text-xs rounded p-2 shadow-md w-max max-w-xs"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {task.description}
        </div>
      </div>

      {/* Status */}
      <div>
        <span className="md:hidden text-xs text-gray-500 mr-2">Status</span>
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            task.status === 'Completed'
              ? 'bg-green-100 text-green-700'
              : task.status === 'In Progress'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Due Date */}
      <div>
        <span className="md:hidden text-xs text-gray-500 mr-2">Due Date</span>
        <span className="text-sm text-gray-600">{task.dueDate}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          className="text-teal-700 text-sm hover:underline cursor-pointer"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
        >
          Edit
        </button>
        <button
          className="text-red-600 text-sm hover:underline cursor-pointer"
          onClick={() => onDelete(task)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default React.memo(TaskCard);
