import { ForwardingRule } from "../model/forwarding-rule";
import { ProxyManager } from "./proxy-manager";

export class ProxyState {
  private readonly _proxyManager: ProxyManager;

  // =======================================
  // Public Methods
  // =======================================

  constructor(proxyManager: ProxyManager) {
    this._proxyManager = proxyManager;
  }

  /**
   * Gets the forwarding rules for the specified client.
   * @param clientId - The id of the client to get the forwarding rules for.
   * @returns - The forwarding rules for the client
   */
  public forwardingRulesForClient(clientId: string): ForwardingRule[] {
    const client = this._proxyManager.proxyChannelState?.currentMembers?.find(
      (member) => member.id === clientId
    );

    if (!client) {
      throw new Error(
        `Error when looking up forwarding rules! Client with id ${clientId} not found.`
      );
    }

    return client.forwardingRules ?? [];
  }
}
