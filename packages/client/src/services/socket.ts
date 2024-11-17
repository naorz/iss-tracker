import { io, Socket } from 'socket.io-client'
import { ISSPosition, SocketEvents } from 'iss-schema'

export type ISSPositionUpdate = (position: ISSPosition) => void

export class SocketService {
  private socket: Socket

  constructor() {
    this.socket = io('ws://localhost:3000')
  }

  onISSPosition(callback: ISSPositionUpdate) {
    this.connect()
    this.socket.on(SocketEvents.ISS_POSITION_UPDATES, callback)
    return () => this.offISSPosition(callback)
  }

  offISSPosition(callback: ISSPositionUpdate) {
    this.socket.off(SocketEvents.ISS_POSITION_UPDATES, callback)
  }

  requestCurrentPosition() {
    this.socket.emit(SocketEvents.GET_POSITION)
  }

  connect() {
    if (this.socket.connected) return
    this.socket.connect()
  }

  disconnect() {
    if (!this.socket.connected) return
    this.socket.disconnect()
  }
}

export const socketService = new SocketService()
