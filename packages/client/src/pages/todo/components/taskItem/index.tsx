import CollaborationService from '../../../../services/collaboration';
import { ITaskItem } from '../../../../types/task';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.less';

interface IProps {
  taskData: ITaskItem;
  collaborationService: CollaborationService;
}

export default function TaskItem(props: IProps) {
  const { taskData, collaborationService } = props;

  const openEditModal = () => {
    console.log('openEditModal');
  };

  const handleDeleteItem = () => {
    collaborationService.removeTask(taskData.id);
  };

  return (
    <li className="task-item-container">
      <p>
        {taskData.content}
      </p>
      <div className="action-btns">
        <button onClick={openEditModal}>
          <EditOutlined style={{ fontSize: 22, color: '#fff' }} />
        </button>
        <button onClick={handleDeleteItem}>
          <DeleteOutlined style={{ fontSize: 22, color: '#fff' }} />
        </button>
      </div>
    </li>
  );
}