/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';
import { connectSocket, disconnectSocket } from '../store/socket';
import { updatePlayerStatus, resetUserInformation } from '../store/user';
import { updatePlayerGold, updatePlayerTurn, updateGameState, updateCurrentBet, updatePlayerReadyStatus, updateRollingState, updateRoll } from '../store/room';
import { initializeRoom } from '../store/room';
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
      store.dispatch(updatePlayerStatus(true));
      store.dispatch(initializeRoom(data));
    });

    this.socket.on('updatePlayerGold', (data) => {
      store.dispatch(updatePlayerGold(data));
    });

    this.socket.on('updatePlayerTurn', (data) => {
      store.dispatch(updatePlayerTurn(data));
    });

    this.socket.on('updateGameState', (data) => {
      store.dispatch(updateGameState(data));
    });

    this.socket.on('updateCurrentBet', (data) => {
      store.dispatch(updateCurrentBet(data));
    });
    this.socket.on('updatePlayerReadyStatus', (data) => {
      store.dispatch(updatePlayerReadyStatus(data));
    });
    this.socket.on('updateRollingState', (data) => {
      store.dispatch(updateRollingState(data));
    });
    this.socket.on('updateRoll', (data) => {
      store.dispatch(updateRoll(data));
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
