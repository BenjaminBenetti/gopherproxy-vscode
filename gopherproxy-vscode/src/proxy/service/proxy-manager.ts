import { ChannelState } from "../model/channel-state";
import { ProxyClientOptions } from "../model/proxy-client-options";

export class ProxyManager {
  private _proxyOptions: ProxyClientOptions | undefined;
  private _proxyChannelState: ChannelState | undefined;
  private _connected: boolean = false;

  // =======================================
  // Public Methods
  // =======================================

  // =======================================
  // Setters
  // =======================================

  set proxyOptions(options: ProxyClientOptions | undefined) {
    this._proxyOptions = options;
  }

  set proxyChannelState(state: ChannelState | undefined) {
    this._proxyChannelState = state;
  }

  // =======================================
  // Getters
  // =======================================

  get proxyOptions(): ProxyClientOptions | undefined {
    return this._proxyOptions;
  }

  get proxyChannelState(): ChannelState | undefined {
    return this._proxyChannelState;
  }

  get connected(): boolean {
    return this._connected;
  }
}
