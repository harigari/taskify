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
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
}

export type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};
