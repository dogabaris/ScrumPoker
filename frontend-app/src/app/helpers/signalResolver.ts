import { SignalR, ISignalRConnection } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionResolver {
  signal: Promise<ISignalRConnection>;

  constructor(private _signalR: SignalR) {
    this.signal = _signalR.createConnection({ withCredentials: true, hubName: "PokerHub" }).start();
  }
    
  newConnection() {
    let connectionResolver = new ConnectionResolver(this._signalR);
  }

  getSignalR() {
    return this.signal;
  }
}
