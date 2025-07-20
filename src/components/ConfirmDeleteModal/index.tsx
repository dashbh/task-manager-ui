import type { Task } from '../../types/types';
import { Modal } from '../common/Modal';

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  task: Task | null;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({
  isOpen,
  task,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete Task?">
      <div className="p-0">
        <p className="mb-4">
          Are you sure you want to delete{' '}
          <strong>{task?.title || 'this task'}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
