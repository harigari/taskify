const SENDER_CONFIG = {
  BASE_URL: "https://sp-taskify-api.vercel.app/1-7",
  get: {
    cards: (id: number) => `/cards?columnId=${id}`,
    card: (id: number) => `/cards/${id}`,
    columns: (id: number) => `/columns?dashbaordId=${id}`,
    comments: (id: number) => `/comments?cardId=${id}`,
    dashboards: (method: "infiniteScroll" | "pagination") => `/dashboards?navigationMethod=${method}`,
    dashboard: (id: number) => `/dashboards/${id}`,
    dashboardInvitations: (id: number) => `/dashboards/${id}/invitations`,
    invitations: "/invitations",
    members: (id: number) => `/members?dashboardId=${id}`,
    me: "/users/me",
  },
  post: {
    signin: "/auth/login",
    signup: "/users",
    card: "/cards",
    column: "/columns",
    comment: "/comments",
    cardImage: (id: number) => `/columns/${id}/card-image`,
    invitation: (id: number) => `/dashboards/${id}/invitations`,
    myImage: "/users/me/image",
  },
  put: {
    passwordChange: "/auth/password",
    card: (id: number) => `/cards/${id}`,
    column: (id: number) => `/columns/${id}`,
    comment: (id: number) => `/comments/${id}`,
    dashboard: (id: number) => `/dashboards/${id}`,
    invitation: (id: number) => `/invitations/${id}`,
    me: "/users/me",
  },
  delete: {
    card: (id: number) => `/cards/${id}`,
    column: (id: number) => `/columns/${id}`,
    comment: (id: number) => `/comments/${id}`,
    dashboard: (id: number) => `/dashboards/${id}`,
    dashboardInvitations: (dashboardId: number, invitationId: number) =>
      `/dashboards/${dashboardId}/invitations/${invitationId}`,
    member: (id: number) => `/members/${id}`,
  },
};
export default SENDER_CONFIG;
