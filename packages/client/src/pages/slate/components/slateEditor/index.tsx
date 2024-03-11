import * as Y from 'yjs';
import EditorElement from '../editorElement';
import EditorLeaf from '../editorLeaf';
import MarkButton from '../markButton';
import BlockButton from '../blockButton';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { withYjs, YjsEditor } from '@slate-yjs/core';
import { Toolbar } from '../common/components';
import { createEditor, Descendant } from 'slate';
import { Editable, withReact, Slate, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor, CustomElement, CustomText } from '../../types/editor';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const wsRoomName = 'ykl-slate-room';

const initialValue: Descendant[] = [{
  type: 'paragraph',
  children: [{ text: '' }],
}];

export default function SlateEditor() {
  const yDocRef = useRef(new Y.Doc());
  const sharedTypeRef = useRef(yDocRef.current.get('content', Y.XmlText));

  const provider = useMemo(() => {
    new IndexeddbPersistence(wsRoomName, yDocRef.current);

    return new WebsocketProvider(
      'ws://localhost:4443',
      wsRoomName,
      yDocRef.current,
    );
  }, []);

  const editor = useMemo(() => withHistory(withReact(
    withYjs(createEditor(), sharedTypeRef.current),
  )), []);

  useEffect(() => {
    return () => provider.disconnect();
  }, [provider]);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  const renderElement = useCallback((props: RenderElementProps) => <EditorElement {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <EditorLeaf {...props} />, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
      />
    </Slate>
  );
}