const SENDER_CONFIG = {
  BASE_URL: "https://sp-taskify-api.vercel.app/1-7",
  get: {
    cards: (id: number, size: number = 5, cursorId: number = 0) =>
      `/cards?columnId=${id}&size=${size}${cursorId ? `&cursorId=${cursorId}` : ""}`,
    // 특정한 칼럼에 있는 전체 카드 목록 가져오기
    card: (id: number) => `/cards/${id}`,
    // 특정한 카드 1개 정보 가져오기
    columns: (id: number) => `/columns?dashboardId=${id}`,
    // 특정한 대시보드에 있는 전체 칼럼 목록 가져오기
    comments: (id: number, size: number = 5, cursorId: number = 0) =>
      `/comments?cardId=${id}&size=${size}${cursorId ? `&cursorId=${cursorId}` : ""}`,
    // 특정한 카드에 있는 전체 댓글 목록 가져오기
    dashboards: (method: "infiniteScroll" | "pagination", size: number = 5, cursorId: number = 0) =>
      `/dashboards?navigationMethod=${method}&size=${size}${cursorId ? `&cursorId=${cursorId}` : ""}`,
    // 초대받거나 생성한 전체 대시보드 목록 가져오기
    // 무한스크롤과 페이지네이션 중 옵션을 고를 수 있습니다.
    dashboard: (id: number) => `/dashboards/${id}`,
    // 특정한 대시보드 1개 정보 가져오기
    dashboardInvitations: (id: number) => `/dashboards/${id}/invitations`,
    // 특정한 대시보드에서 보낸 초대장 목록 가져오기
    invitations: "/invitations",
    // 내가 받은 초대장 목록 가져오기
    members: (id: number) => `/members?dashboardId=${id}`,
    // 특정한 대시보드에 초대된 구성원 목록 가져오기
    me: "/users/me",
    // 내 정보 가져오기
  },
  post: {
    signin: "/auth/login",
    // 로그인하기
    signup: "/users",
    // 회원가입하기
    card: "/cards",
    // 새로운 카드 생성하기
    column: "/columns",
    // 새로운 칼럼 생성하기
    comment: "/comments",
    // 새로운 댓글 생성하기
    dashboard: "/dashboards",
    // 새로운 대시보드 생성하기
    cardImage: (id: number) => `/columns/${id}/card-image`,
    // 새로운 카드 이미지 생성하기
    invitation: (id: number) => `/dashboards/${id}/invitations`,
    // 특정한 대시보드에서 초대장 보내기
    myImage: "/users/me/image",
    // 내 프로필이미지 업로드
  },
  put: {
    passwordChange: "/auth/password",
    // 내 비밀번호 변경하기
    card: (id: number) => `/cards/${id}`,
    // 특정한 카드 1개의 정보 수정하기
    column: (id: number) => `/columns/${id}`,
    // 특정한 칼럼 1개의 정보 수정하기
    comment: (id: number) => `/comments/${id}`,
    // 특정한 댓글 1개의 정보 수정하기
    dashboard: (id: number) => `/dashboards/${id}`,
    // 특정한 대시보드 1개의 정보 수정하기
    invitation: (id: number) => `/invitations/${id}`,
    // 특정한 초대장 1개의 정보 수정하기
    me: "/users/me",
    // 내 닉네임, 프로필이미지 수정하기
  },
  delete: {
    card: (id: number) => `/cards/${id}`,
    // 특정한 카드 1개 삭제하기
    column: (id: number) => `/columns/${id}`,
    // 특정한 칼럼 1개 삭제하기
    comment: (id: number) => `/comments/${id}`,
    // 특정한 댓글 1개 삭제하기
    dashboard: (id: number) => `/dashboards/${id}`,
    // 특정한 대시보드 1개 삭제하기
    dashboardInvitations: (dashboardId: number, invitationId: number) =>
      `/dashboards/${dashboardId}/invitations/${invitationId}`,
    // 특정한 대시보드의 초대장 1개 삭제하기
    member: (id: number) => `/members/${id}`,
    // 특정한 대시보드에 참여하고 있는 구성원 1명 내쫓기
  },
};
export default SENDER_CONFIG;
