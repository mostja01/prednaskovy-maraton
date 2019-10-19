import {AppUser} from './appUser';

export interface Talk {
  line?: TopicLine;
  inMainLine?: boolean;
  showVoteButton: boolean;
  talkId: string;
  talkRef: any;
  name: string;
  color: string;
  userId: string;
  description?: string;
  lineId: string;
  lineName: string;
  duration: string;
  userName: string;
  hasVoted: boolean;
  votesCount: number;
  voters: Array<string>;
  created: Date;
  noteForOrg: string;
}

export interface TopicLine {
  id?: string;
  name: string;
  // description: string;
  color: string;
  // managerId: string;
  // manager?: AppUser;
}
