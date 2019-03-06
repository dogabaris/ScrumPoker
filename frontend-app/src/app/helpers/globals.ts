declare function unescape(s: string): string;
declare function escape(s: string): string;
import { SignalRConfiguration } from 'ng2-signalr';

export const Globals: any = {
  signalRUrl: '/signalr_engine',
  createConfig(): SignalRConfiguration {
    const c = new SignalRConfiguration();
    //c.hubName = hubName;
    c.qs = { user: 'user_' + new Date() };
    c.url = Globals.signalRUrl;
    c.logging = false;
    return c;
  }
};
