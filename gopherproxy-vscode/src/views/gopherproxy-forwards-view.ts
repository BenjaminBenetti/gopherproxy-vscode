import { AbstractView } from "./view";
import { ProxyManager } from "../proxy/service/proxy-manager";
import { ProxyState } from "../proxy/service/proxy-state";

export class GopherProxyForwardsView extends AbstractView {
  public static readonly ViewId = "gopherproxy-forwards-view";

  private readonly _proxyManager: ProxyManager;
  private readonly _proxyState: ProxyState;

  private _selectedClientId: string | undefined;

  // ==================================
  // Public Methods
  // ==================================

  constructor(proxyManager: ProxyManager, proxyState: ProxyState) {
    super();

    this._proxyManager = proxyManager;
    this._proxyState = proxyState;
  }

  // ==================================
  // View Implementation
  // ==================================

  public onBuild(): void {
    // default to selecting self.
    this._selectedClientId = this._proxyManager.proxyChannelState?.yourId;
  }

  public render(): void {
    if (this._webview) {
      this._webview.webview.html = this.getHtmlContent();
    }
  }

  // ==================================
  // Private Methods
  // =================================

  /**
   * Get the html content to render in the webview.
   * @returns - The html content.
   */
  private getHtmlContent(): string {
    // Getting real react jsx vibes here.
    // It's gross. That's why Angular is the best!
    // Any how, extension will be minimal so, this is fine.
    return `
    <style>
      .main-layout {
        display: grid;
        grid-template-columns: 1fr 20em;
        grid-template-rows: 3em 1fr;
        height: 100vh;
      }

      .header {
        grid-column: 1 / span 2;
        padding-bottom: 0.5em;
        border-bottom: 1px solid var(--vscode-editorGroup-border);
      }

      .left-panel {
        border-left: 1px solid var(--vscode-editorGroup-border);
        padding-left: 0.5em;
      }

      .text-pop {
        color: var(--vscode-textPreformat-foreground);
      }

      .text-error {
        color: var(--vscode-errorForeground);
      }
    </style>

    <div class="main-layout">
      <div class="header">
        <h4>
          ${
            this._proxyManager.connected
              ? "Connected: "
              : "<span class='text-error'>Disconnected: </span>"
          }
          <span class="text-pop">${
            this._proxyManager.proxyOptions?.proxyServer
          }</span> 
          as
           <span class="text-pop"> ${
             this._proxyManager.proxyOptions?.clientName
           } </span>
        </h4>
      </div>
      <div class="right-panel">
        <h4>Forwarding Rules</h4>
        <ul>
          ${
            this._selectedClientId
              ? this._proxyState
                  .forwardingRulesForClient(this._selectedClientId)
                  .map(
                    (rule) =>
                      `<li>${rule.localPort} -> ${rule.remoteClient} -> ${
                        rule.remoteHost
                      }:${rule.remotePort} ${
                        rule.valid
                          ? "(online)"
                          : "<span class='text-error'>(offline)</span>"
                      }</li>`
                  )
                  .join("")
              : ""
          }
        </ul>
      </div>
      <div class="left-panel">
        <h4>Clients</h4>
        <ul>
          ${this._proxyManager.proxyChannelState?.currentMembers
            ?.map((member) => `<li>${member.name}</li>`)
            .join("")}
        </ul>
      </div>

    `;
  }
}
