export interface ForwardingRule {
  localPort: number;
  remoteClient: string;
  remoteHost: string;
  remotePort: number;
  valid?: boolean | undefined;
}
