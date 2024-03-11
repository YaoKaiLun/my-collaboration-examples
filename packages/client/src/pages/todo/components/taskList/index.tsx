import TaskItem from '../taskItem';
import CollaborationService from '../../../../services/collaboration';
import { useMemo } from 'react';
import { EnumTaskStatus, ITaskItem } from '../../../../types/task';
import { ClockCircleOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './style.less';

interface IProps {
  statusType: EnumTaskStatus;
  taskList: ITaskItem[];
  collaborationService: CollaborationService;
}

const config = {
  todo: {
    title: '未开始',
    icon: <ClockCircleOutlined style={{ fontSize: 24 }} />,
  },
  doing: {
    title: '处理中',
    icon: <EditOutlined style={{ fontSize: 24 }} />,
  },
  done: {
    title: '已完成',
    icon: <CheckCircleOutlined style={{ fontSize: 24 }} />,
  },
};

export default function TaskList(props: IProps) {
  const { statusType, taskList, collaborationService } = props;

  const currentConfig = useMemo(() => config[statusType], [statusType]);

  return (
    <div className="task-list-container">
      <header>
        {currentConfig.icon}
        <h1>{currentConfig.title}</h1>
      </header>
      <ul>
        {
          taskList.map(item => (
            <TaskItem
              key={item.id}
              taskData={item}
              collaborationService={collaborationService}
            />
          ))
        }
      </ul>
    </div>
  );
}