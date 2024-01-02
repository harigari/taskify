import SENDER_CONFIG from "@/constants/senderConfig";

type TimeStamp = {
  createdAt: string;
  updatedAt: string;
};

// 유저 관련 타입
export type BasicUserType = {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
};

export type ExtendedUserType = {
  email: string;
} & TimeStamp &
  BasicUserType;

type ImageUrlType = {
  imageUrl: string;
};

type Return_get_me = ExtendedUserType;

type Req_put_passwordChange = {
  password: string;
  newPassword: string;
};

type Req_post_signin = {
  email: string;
  password: string;
};

type Return_post_signin = {
  user: ExtendedUserType;
  accessToken: string;
};

type Req_post_signup = {
  email: string;
  nickname: string;
  password: string;
};

type Return_post_signup = ExtendedUserType;

type Req_put_me = {
  nickname: string;
  profileImageUrl?: string;
};

type Return_put_me = ExtendedUserType;

type Req_post_myImage = FormData;

type Return_post_myImage = {
  profileImageUrl: string;
};

// 카드 관련 타입
export type CardData = {
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

type Return_get_card = CardData;

type Return_get_cards = {
  cursorId: number;
  totalCount: number;
  cards: CardData[];
};

type Req_post_cardImage = FormData;

type Return_post_cardImage = ImageUrlType;

type Req_post_card = {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
};

type Return_post_card = CardData;

type Req_put_card = {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
};

type Return_put_card = CardData;

// 컬럼 관련 타입
export type ColumnData = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
} & TimeStamp;

type ColumnListData = {
  result: "SUCCESS";
  data: ColumnData[];
};

type Return_get_columns = ColumnListData;

type Req_post_column = {
  title: string;
  dashboardId: number;
};

type Return_post_column = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
} & TimeStamp;

type Req_put_column = {
  title: string;
};

type Return_put_column = {
  id: number;
  title: string;
  teamId: string;
} & TimeStamp;

// 댓글 관련 타입
export type CommentData = {
  id: number;
  content: string;
  cardId: number;
  author: BasicUserType;
} & TimeStamp;

type CommentListData = {
  cursorId: number;
  comments: CommentData[];
};

type Return_get_comments = CommentListData;

type Req_post_comment = {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
};

type Return_post_comment = {
  id: number;
  content: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
} & TimeStamp;

type Req_put_comment = {
  content: string;
};

type Return_put_comment = {
  id: number;
  content: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
} & TimeStamp;

// 대시보드 관련 타입

export type ColorType = "#7ac555" | "#760dde" | "#ffa500" | "#76a5ea" | "#e876ea";

export type DashBoardData = {
  id: number;
  title: string;
  color: ColorType;
  createdByMe: Boolean;
  userId: number;
} & TimeStamp;

type DashBoardListData = {
  cursorId: number;
  totalCount: number;
  dashboards: DashBoardData[];
};

export type InvitationData = {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: true;
} & TimeStamp;

type InvitationListData = {
  totalCount: number;
  invitations: InvitationData[];
};

type Return_get_invitations = {
  cursorId: number;
  invitations: InvitationData[];
};

type Return_get_dashboardInvitations = InvitationListData;

type Return_get_dashboard = DashBoardData;

type Return_get_dashboards = DashBoardListData;

type Req_post_dashboard = {
  title: string;
  color: ColorType;
};

type Return_post_dashboard = {
  id: number;
  title: string;
  color: ColorType;
  createdByMe: boolean;
  userId: number;
} & TimeStamp;

type Req_put_dashboard = Req_post_dashboard;

type Return_put_dashboard = Return_post_dashboard;

type Req_post_invitation = {
  email: string;
};

type Return_post_invitation = {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
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
} & TimeStamp;

type Req_put_invitation = {
  inviteAccepted: boolean;
};

type Return_put_invitation = {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
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
} & TimeStamp;

// 대시보드 맴버 관련 타입
export type Member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
} & TimeStamp;

type DashBoardMemberType = {
  members: Member[];
  totalCount: number;
};

type Return_get_members = DashBoardMemberType;

export type RequestData<T, U> = T extends "post"
  ? U extends "card"
    ? Req_post_card
    : U extends "column"
    ? Req_post_column
    : U extends "comment"
    ? Req_post_comment
    : U extends "dashboard"
    ? Req_post_dashboard
    : U extends "invitation"
    ? Req_post_invitation
    : U extends "signin"
    ? Req_post_signin
    : U extends "signup"
    ? Req_post_signup
    : U extends "myImage"
    ? Req_post_myImage
    : U extends "cardImage"
    ? Req_post_cardImage
    : null
  : T extends "put"
  ? U extends "card"
    ? Req_put_card
    : U extends "column"
    ? Req_put_column
    : U extends "comment"
    ? Req_put_comment
    : U extends "dashboard"
    ? Req_put_dashboard
    : U extends "invitation"
    ? Req_put_invitation
    : U extends "me"
    ? Req_put_me
    : U extends "passwordChange"
    ? Req_put_passwordChange
    : null
  : null;

export type ReturnData<T, U> = T extends "get"
  ? U extends "card"
    ? Return_get_card
    : U extends "cards"
    ? Return_get_cards
    : U extends "columns"
    ? Return_get_columns
    : U extends "comments"
    ? Return_get_comments
    : U extends "dashboard"
    ? Return_get_dashboard
    : U extends "dashboards"
    ? Return_get_dashboards
    : U extends "dashboardInvitations"
    ? Return_get_dashboardInvitations
    : U extends "invitations"
    ? Return_get_invitations
    : U extends "members"
    ? Return_get_members
    : U extends "me"
    ? Return_get_me
    : any
  : T extends "post"
  ? U extends "signin"
    ? Return_post_signin
    : U extends "signup"
    ? Return_post_signup
    : U extends "card"
    ? Return_post_card
    : U extends "column"
    ? Return_post_column
    : U extends "comment"
    ? Return_post_comment
    : U extends "dashboard"
    ? Return_post_dashboard
    : U extends "invitation"
    ? Return_post_invitation
    : U extends "myImage"
    ? Return_post_myImage
    : U extends "cardImage"
    ? Return_post_cardImage
    : any
  : T extends "put"
  ? U extends "card"
    ? Return_put_card
    : U extends "column"
    ? Return_put_column
    : U extends "comment"
    ? Return_put_comment
    : U extends "dashboard"
    ? Return_put_dashboard
    : U extends "invitation"
    ? Return_put_invitation
    : U extends "me"
    ? Return_put_me
    : any
  : any;

export type Method = keyof Omit<typeof SENDER_CONFIG, "BASE_URL">;
export type Path<T extends Method> = (typeof SENDER_CONFIG)[T];
export type PathProps<T extends Method> = keyof (typeof SENDER_CONFIG)[T];

export type RequireId<T extends Method, U extends PathProps<T>> = Path<T>[U] extends string
  ? { path: U; accessToken?: string; data?: RequestData<T, U> }
  : Path<T>[U] extends (id: number) => string
  ? { path: U; id: number; accessToken?: string; data?: RequestData<T, U> }
  : Path<T>[U] extends (method: "infiniteScroll" | "pagination") => string
  ? { path: U; method: "infiniteScroll" | "pagination"; accessToken?: string; data?: RequestData<T, U> }
  : { path: U; dashboardId: number; invitationId: number; accessToken?: string; data?: RequestData<T, U> };

export type HTTP<T extends Method> = <U extends PathProps<T>>(
  obj: RequireId<T, U>
) => Promise<{ status: number; data: ReturnData<T, U>; message?: string }>;

export type Wrapped<T extends Method> = <U extends PathProps<T>>(
  obj: RequireId<T, U>
) => Promise<{ status: number; data: ReturnData<T, U>; message?: string } | undefined>;

export type PathFinder = <T extends Method, U extends PathProps<T>>(
  method: T,
  obj: RequireId<T, U>
) => string | Promise<string | any>;
