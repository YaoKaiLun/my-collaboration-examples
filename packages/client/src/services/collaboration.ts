import * as Y from 'yjs';
import useTaskStore from '../stores/task';
import { ITaskItem } from '../types/task';
import { WebrtcProvider } from 'y-webrtc';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

localStorage.log = 'y-webrtc';

interface IOptions {
  method?: 'webrtc' | 'websocket';
  initData?: Uint8Array;
}

export default class CollaborationService {
  private ydoc = new Y.Doc();
  private taskList = this.ydoc.getArray<ITaskItem>('taskList');

  constructor(options: IOptions) {
    const { method = 'webrtc', initData } = options;

    this.observe();

    initData && Y.applyUpdate(this.ydoc, initData);

    const webrtcRoomName = 'ykl-webrtc-room';
    const wsRoomName = 'ykl-ws-room';

    if (method === 'websocket') {
      new IndexeddbPersistence(wsRoomName, this.ydoc);
      new WebsocketProvider(
        'ws://localhost:4443',
        wsRoomName,
        this.ydoc,
      );
    } else {
      new IndexeddbPersistence(webrtcRoomName, this.ydoc);
      new WebrtcProvider(
        webrtcRoomName,
        this.ydoc,
        { signaling: ['ws://localhost:4444'] },
      );
    }
  }

  private observe() {
    this.taskList.observe(() => {
      useTaskStore.getState().setTaskList(this.taskList.toArray());
    });
  }

  appendTask(taskItem: ITaskItem) {
    this.taskList.push([taskItem]);
  }

  removeTask(id: string) {
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList.get(i).id === id) {
        this.taskList.delete(i);
        break;
      }
    }
  }
}