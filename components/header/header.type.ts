export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Member {
  nickname: string;
  id: number;
  profileImageUrl: string;
}

export interface IndexHeaderProps {
  color: "white" | "black";
}

export interface HeaderProfileProps {
  user: User;
}

export interface MembersProps {
  members: Member[];
}
