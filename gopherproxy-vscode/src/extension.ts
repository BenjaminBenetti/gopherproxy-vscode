// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { GopherProxyForwardsView } from "./views/gopherproxy-forwards-view";
import { ProxyManager } from "./proxy/service/proxy-manager";
import { ProxyState } from "./proxy/service/proxy-state";

// ============= services =================
const proxyManager = new ProxyManager();
const proxyState = new ProxyState(proxyManager);

// ============= views =====================
const gopherProxyForwardsView = new GopherProxyForwardsView(
  proxyManager,
  proxyState
);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // ====== DUMMY OPTIONS FOR UI DEV. REMOVE LATER ======
  proxyManager.proxyOptions = {
    proxyServer: "ws://proxy.bbenetti.ca:8080",
    clientName: "vscode",
    channelName: "gopherproxy",
    channelPassword: "password",
    forwardingRules: [
      {
        localPort: 8080,
        remoteClient: "other-client",
        remoteHost: "localhost",
        remotePort: 8080,
      },
    ],
  };

  // ====== DUMMY STATE FOR UI DEV. REMOVE LATER ======
  proxyManager.proxyChannelState = {
    yourId: "vscode-138rjfgr03jfodfjgre",
    currentMembers: [
      {
        id: "other-client-3432423rgjkdlvg",
        name: "other-client",
        forwardingRules: [],
      },
      {
        id: "vscode-138rjfgr03jfodfjgre",
        name: "vscode",
        forwardingRules: [
          {
            localPort: 8080,
            remoteClient: "other-client",
            remoteHost: "localhost",
            remotePort: 8080,
            valid: false,
          },
        ],
      },
    ],
  };

  // ====== Register Views ======
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      GopherProxyForwardsView.ViewId,
      gopherProxyForwardsView
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
