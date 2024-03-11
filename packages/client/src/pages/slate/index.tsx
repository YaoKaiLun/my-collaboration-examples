import SlateEditor from './components/slateEditor';
import './style.less';

export default function SlatePage() {
  return (
    <div className="slate-page">
      <div className="editor-container">
        <SlateEditor />
      </div>
    </div>
  );
}