import type { Task } from '../../types/types';

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: Props) {
  return (
    <div className="w-full">
      {/* MD+ */}
      <div className="mb-2 hidden md:grid grid-cols-5 gap-4 px-4 py-4 bg-gray-300 text-sm font-bold text-gray-700 border border-gray-300">
        <span>Title</span>
        <span>Description</span>
        <span>Status</span>
        <span>Due Date</span>
        <span>Actions</span>
      </div>

      <div className="space-y-4 md:space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="md:items-center flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4 px-4 py-3 bg-white hover:bg-gray-50 transition rounded-lg shadow-sm"
          >
            {/* Title */}
            <div>
              <div className="text-sm text-gray-900 font-medium">
                {task.title}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="md:hidden text-xs text-gray-500">Description</div>
              <div className="text-sm text-gray-700">{task.description}</div>
            </div>

            {/* Status */}
            <div>
              <span className="md:hidden text-xs text-gray-500 mr-2">
                Status
              </span>
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
              <span className="md:hidden text-xs text-gray-500 mr-2">
                Due Date
              </span>
              <span className="text-sm text-gray-600">{task.dueDate}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="text-cyan-500 text-sm hover:underline"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>
              <button
                className="text-red-600 text-sm hover:underline"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
