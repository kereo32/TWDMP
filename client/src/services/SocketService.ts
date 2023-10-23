/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';
import { connectSocket, disconnectSocket } from '../store/socket';
import { updatePlayerStatus, resetUserInformation } from '../store/user';
import store from '../store/store';

class SocketService {
  private socket: Socket | null = null;

  connect(url: string): void {
    this.socket = io(url);

    this.socket.on('connect', () => {
      store.dispatch(
        connectSocket({
          connected: !!this.socket?.connected,
          connectionId: this.socket?.id || '',
          connectionDate: new Date().getTime(),
        })
      );
    });

    this.socket.on('gameReady', (data) => {
      console.log('ok');
      console.log(data);
      store.dispatch(updatePlayerStatus(true));
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();

      this.socket.on('disconnect', () => {
        store.dispatch(disconnectSocket());
        store.dispatch(resetUserInformation());
      });
    }
  }

  on(event: string, callback: () => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback: () => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

export default new SocketService();
