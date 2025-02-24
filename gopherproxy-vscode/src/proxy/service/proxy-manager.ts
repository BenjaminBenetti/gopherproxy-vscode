import { ChannelState } from "../model/channel-state";
import { ProxyClientOptions } from "../model/proxy-client-options";
import { GopherProxyCliDownLoader } from "./gopherproxy-cli-downloader";
import * as vscode from "vscode";

export class ProxyManager {
  private _vscodeContext: vscode.ExtensionContext | undefined;
  private _proxyOptions: ProxyClientOptions | undefined;
  private _proxyChannelState: ChannelState | undefined;
  private _connected: boolean = false;
  private _cliPath: string | undefined;

  // =======================================
  // Public Methods
  // =======================================

  public initialize(
    vsContext: vscode.ExtensionContext,
    proxyOptions: ProxyClientOptions
  ): void {
    this._vscodeContext = vsContext;
    this._proxyOptions = proxyOptions;
  }

  public async getCliPath(): Promise<string> {
    this._cliPath ??=
      await new GopherProxyCliDownLoader().ensureMostRecentGopherProxyCli(
        this._vscodeContext!
      );
    return this._cliPath;
  }

  // =======================================
  // Setters
  // =======================================

  set proxyOptions(options: ProxyClientOptions | undefined) {
    this._proxyOptions = options;
  }

  set proxyChannelState(state: ChannelState | undefined) {
    this._proxyChannelState = state;
  }

  set vscodeContext(context: vscode.ExtensionContext) {
    this._vscodeContext = context;
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
