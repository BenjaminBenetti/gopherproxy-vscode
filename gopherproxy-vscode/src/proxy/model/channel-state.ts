import { ChannelMember } from "./channel-member";

export interface ChannelState {
  yourId: string | undefined;
  currentMembers: ChannelMember[] | undefined;
}
