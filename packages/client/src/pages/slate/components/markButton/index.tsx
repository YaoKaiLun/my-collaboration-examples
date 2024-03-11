import { useSlate } from 'slate-react';
import { Button, Icon } from '../common/components';
import { isMarkActive, toggleMark } from '../../utils/editor';

interface IProps {
  format: string;
  icon: string;
}

export default function MarkButton(props: IProps) {
  const { format, icon } = props;

  const editor = useSlate();

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
}