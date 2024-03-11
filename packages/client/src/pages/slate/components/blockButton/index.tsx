import { useSlate } from 'slate-react';
import { TEXT_ALIGN_TYPES } from '../../constants';
import { Button, Icon } from '../common/components';
import { isBlockActive, toggleBlock } from '../../utils/editor';
import './style.less';

interface IProps {
  format: string;
  icon: string;
}

export default function BlockButton(props: IProps) {
  const { format, icon } = props;

  const editor = useSlate();
  return (
    <Button
      className="block-button"
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
      )}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
}