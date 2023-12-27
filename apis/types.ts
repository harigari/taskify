type TimeStamp = {
  createdAt?: Date;
  updatedAt?: Date;
};

// 유저 관련 타입
type BasicUserType = {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
};

type ExtendedUserType = {
  email: string;
} & TimeStamp &
  BasicUserType;

// 카드 관련 타입
type CardType = {
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
} & TimeStamp;

type CardListType = {
  cursorId: 0;
  totalCount: 0;
  cards: CardType[];
};

// 컬럼 관련 타입
type ColumnType = {
  id: number;
  cardId: number;
  author: BasicUserType;
} & TimeStamp;

type ColumnListType = {
  result: "SUCCESS";
  data: ColumnType[];
};

type ImageUrlType = {
  imageUrl: string;
};

// 댓글 관련 타입
type CommentType = {
  id: number;
  content: string;
  cardId: number;
  author: BasicUserType;
} & TimeStamp;

type CommentListType = {
  cursorId: 0;
  comments: CommentType[];
};

// 대시보드 관련 타입
type DashBoardType = {
  id: number;
  title: string;
  color: string;
  createdByMe: Boolean;
  userId: number;
} & TimeStamp;

type DashBoardListType = {
  cursorId: 0;
  totalCount: 0;
  dashboards: DashBoardType[];
};

// 대시보드 맴버 관련 타입
type Member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
} & TimeStamp;

type DashBoardMemberType = {
  members: Member[];
  totalCount: 0;
};
