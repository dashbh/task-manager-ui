import { useRef, useEffect } from 'react';

import type { Task } from '../../types/types';
import TaskCard from '../TaskCard';
type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
};

const useIntersectionObserver = (callback: () => void, options = {}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
        ...options,
      },
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [callback]);

  return targetRef;
};

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onLoadMore,
  hasMore,
  loading,
}: Props) {
  const loadMoreRef = useIntersectionObserver(onLoadMore, {
    threshold: 0.1,
    rootMargin: '0px',
  });

  return (
    <div className="w-full p-4 bg-gray-200">
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

      {hasMore && tasks.length > 0 && (
        <div ref={loadMoreRef} className="flex justify-center py-4 md:py-8">
          <div className="text-gray-500 text-sm">
            {loading ? 'Loading more tasks...' : 'Scroll for more tasks'}
          </div>
        </div>
      )}

      {loading && tasks.length === 0 && (
        <div className="flex justify-center py-4 md:py-8">
          <div className="text-gray-500 text-sm">Loading tasks...</div>
        </div>
      )}
      {!hasMore && (
        <div className="flex justify-center py-4 md:py-8">
          <div className="text-gray-500 text-sm">- Complete -</div>
        </div>
      )}
    </div>
  );
}
