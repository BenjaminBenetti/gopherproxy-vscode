import * as vscode from "vscode";

export abstract class AbstractView implements vscode.WebviewViewProvider {
  protected _webview: vscode.WebviewView | undefined;
  protected _viewContext: vscode.WebviewViewResolveContext | undefined;
  protected _cancellationToken: vscode.CancellationToken | undefined;

  // ==================================
  // Public Methods
  // =================================

  /**
   * Called by vscode when the webview becomes visible.
   * @param webviewView - The webview view.
   * @param context - Persistent state of the webview. The webview will often unload. So you should restore form this state.
   * @param token - A cancellation token (what is this c# :P )
   */
  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): Thenable<void> | void {
    this._webview = webviewView;
    this._viewContext = context;
    this._cancellationToken = token;

    this.onBuild();
    this.render();
  }

  /**
   * Called when the webview is built
   */
  public abstract onBuild(): void;

  /**
   * Render the view.
   */
  public abstract render(): void;
}
