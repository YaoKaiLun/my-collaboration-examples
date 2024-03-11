import useTaskStore from './stores/task';
import TaskList from './components/taskList';
import CollaborationService from './services/collaboration';
import { useEffect, useRef, useState } from 'react';
import { EnumTaskStatus, ITaskItem } from './types/task';
import { useSearchParams } from 'react-router-dom';
import { getMockDoc } from './utils/mock';
import './style.less';

type TodoListGroupMap = {
  [key in EnumTaskStatus]: ITaskItem[];
}

export default function TodoPage() {
  const [searchParams] = useSearchParams();

  const collaborationServiceRef = useRef<CollaborationService>();

  const taskList = useTaskStore(state => state.taskList);
  const [haveInit, setHaveInit] = useState(false);
  const [todoListGroupMap, setTodoListGroupMap] = useState<TodoListGroupMap>({
    todo: [],
    doing: [],
    done: [],
  });

  useEffect(() => {
    if (!collaborationServiceRef.current) {
      collaborationServiceRef.current = new CollaborationService({
        // initData: getMockDoc(),
        method: searchParams.get('method') as any,
      });
      setHaveInit(true);
    }
  }, []);

  useEffect(() => {
    const groupMap: TodoListGroupMap = {
      todo: [],
      doing: [],
      done: [],
    };

    taskList.forEach(item => {
      switch (item.status) {
        case EnumTaskStatus.Todo:
          groupMap.todo.push(item);
          break;
        case EnumTaskStatus.Doing:
          groupMap.doing.push(item);
          break;
        case EnumTaskStatus.Done:
          groupMap.done.push(item);
          break;
      }
    });

    setTodoListGroupMap(groupMap);
  }, [taskList]);

  return (
    <div className="page todo-page">
      <div className="task-list-layout">
        {
          haveInit ? (
            (Object.keys(todoListGroupMap) as Array<keyof typeof todoListGroupMap>).map(statusType => (
              <TaskList
                key={statusType}
                statusType={statusType}
                taskList={todoListGroupMap[statusType]}
                collaborationService={collaborationServiceRef.current!}
              />
            ))
          ) : null
        }
      </div>
    </div>
  );
}