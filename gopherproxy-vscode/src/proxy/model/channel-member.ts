import { ForwardingRule } from "./forwarding-rule";

export interface ChannelMember {
  id: string | undefined;
  name: string | undefined;
  forwardingRules: ForwardingRule[] | undefined;
}
