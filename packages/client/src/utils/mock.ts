import * as Y from 'yjs';
import { EnumTaskStatus, ITaskItem } from '../types/task';

const mockInitTaskList: ITaskItem[] = [
  {
    id: '1',
    content: '开发页面4',
    status: EnumTaskStatus.Todo,
  },
  {
    id: '2',
    content: '开发页面3',
    status: EnumTaskStatus.Todo,
  },
  {
    id: '3',
    content: '开发页面2',
    status: EnumTaskStatus.Doing,
  },
  {
    id: '4',
    content: '开发页面1',
    status: EnumTaskStatus.Done,
  },
];

export const getMockDoc = () => {
  const ydoc = new Y.Doc();
  const taskList = ydoc.getArray<ITaskItem>('taskList');
  taskList.push([...mockInitTaskList]);
  return Y.encodeStateAsUpdate(ydoc);
};