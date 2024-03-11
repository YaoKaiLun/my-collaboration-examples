import { create } from 'zustand';
import { ITaskItem } from '../types/task';

interface ITaskStore {
  id: string;
  taskList: ITaskItem[];
  setTaskList: (list: ITaskItem[]) => void;
}

const useTaskStore = create<ITaskStore>((set) => ({
  id: '',
  taskList: [],
  setTaskList: (taskList) => set({ taskList }),
}));

export default useTaskStore;