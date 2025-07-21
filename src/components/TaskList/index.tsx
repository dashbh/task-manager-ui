import type { Task } from '../../types/types';
import TaskCard from '../TaskCard';

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
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
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
