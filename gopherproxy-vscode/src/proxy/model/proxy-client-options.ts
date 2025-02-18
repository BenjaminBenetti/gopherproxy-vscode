import { ForwardingRule } from "./forwarding-rule";

export interface ProxyClientOptions {
  proxyServer: string; // The address of the gopherproxy server
  clientName: string; // The name of this client
  channelName: string; // The name of the channel to join
  channelPassword: string; // The password of the channel to join
  forwardingRules: ForwardingRule[]; // Forwarding rules to apply to the gopherproxy client
}
