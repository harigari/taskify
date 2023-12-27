interface TimeStamp {
  createdAt?: Date;
  updatedAt?: Date;
}

type BasicUserType = {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
};

export interface UserType extends TimeStamp, BasicUserType {
  email: string;
}

export interface CardType extends TimeStamp {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: BasicUserType;
  imageUrl?: string;
  teamId: string;
  columnId: number;
  dashboardId: number;
}

export interface columnType extends TimeStamp {
  id: number;
  content: string;
  cardId: number;
  author: BasicUserType;
}

export interface ImageUrlType {
  imageUrl: string;
}

export interface CommentType extends TimeStamp {
  id: number;
  content: string;
  cardId: number;
  author: BasicUserType;
}

export interface DashBoardType extends TimeStamp {
  id: number;
  title: string;
  color: string;
  createdByMe: Boolean;
  userId: number;
}
