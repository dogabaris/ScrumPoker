import { Component } from '@angular/core';
import { ConnectionResolver } from './helpers/signalResolver';
import { ConnectionStatus } from 'ng2-signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private connectionResolver: ConnectionResolver) {
    connectionResolver.getSignalR().then((c) => {
      c.status.subscribe((status: ConnectionStatus) => {
        console.log("status change", status);
        if (status.value === 1)
            console.log("Bağlanılıyor.");
        if (status.value === 2)
            console.log("Bağlanıldı.");
        if (status.value === 3)
            console.log("Yeniden Bağlanılıyor.");
        if (status.value === 4) {
          console.log("Bağlantı Koptu.");
        }
      });
      c.errors.subscribe((error: any) => {
        console.log("error", error);
      });
    });
  }
}
