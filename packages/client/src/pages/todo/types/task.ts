export enum EnumTaskStatus {
  Todo = 'todo',
  Doing = 'doing',
  Done = 'done',
}

export interface ITaskItem {
  id: string;
  content: string;
  status: EnumTaskStatus;
}