import { useTaskContext } from './taskContext';

export const useTasks = () => {
  const { tasks } = useTaskContext();
  return tasks;
};

export const useTaskDispatch = () => {
  const { dispatch } = useTaskContext();
  return dispatch;
};
