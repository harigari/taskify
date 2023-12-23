export interface Member {
  nickname: string;
  id: number;
  profileImageUrl?: string;
}

export interface InviteBoard {
  id: number;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
}

export type Tableindex = {
  [a: string]: "nickname" | "dashboard" | "invitee" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};
