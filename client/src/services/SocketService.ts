/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect(url: string): void {
    this.socket = io(url);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
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
