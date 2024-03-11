import type { BaseEditor, Text } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';
import type { YjsEditor } from '@slate-yjs/core';

interface IBaseElement {
  align?: string;
}

export interface IParagraph extends IBaseElement {
  type: 'paragraph';
  children: Text[];
}

export interface IBlockQuote extends IBaseElement {
  type: 'block-quote';
  children: Text[];
}

export interface IHeadingOne extends IBaseElement {
  type: 'heading-one';
  children: Text[];
}

export interface IHeadingTwo extends IBaseElement {
  type: 'heading-two';
  children: Text[];
}

export interface IListItem extends IBaseElement {
  type: 'list-item';
  children: Text[];
}

export interface IBulletedList extends IBaseElement {
  type: 'bulleted-list';
  children: IListItem[];
}

export interface INumberedList extends IBaseElement {
  type: 'number-list';
  children: IListItem[];
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & YjsEditor;

export type CustomElement =
  | IParagraph
  | IBlockQuote
  | IHeadingOne
  | IHeadingTwo
  | IListItem
  | IBulletedList
  | INumberedList;

export type CustomText = {
  text: string;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
  code?: boolean;
}