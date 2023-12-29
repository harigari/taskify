const apiConfig = {
  BASE_URL: () => "https://sp-taskify-api.vercel.app/1-7",
  END_POINT: {
    auth: {
      signIn: (teamId: number) => `/${teamId}/auth/login`,
      changePassword: (teamId: number) => `/${teamId}/auth/password`,
    },
    cards: {
      newListCards: (teamId: number) => `/${teamId}/cards`, //변수명 애매
      manageCards: (teamId: number, cardId: number) => `/${teamId}/cards/${cardId}`,
    },
    columns: {
      newListColumns: (teamId: number) => `/${teamId}/columns`,
      manageColumns: (teamId: number, columnId: number) => `/${teamId}/columns/${columnId}`,
    },
    comments: {
      newListComments: (teamId: number) => `/${teamId}/comments`,
      manageComments: (teamId: number, commentId: number) => `/${teamId}/comments/${commentId}`,
    },
    dashboards: {
      newListDashboards: (teamId: number) => `/${teamId}/dashboards`,
      manageDashboards: (teamId: number, dashboardId: number) => `/${teamId}/dashboards/${dashboardId}`,
      manageDashboardInvitation: (teamId: number, dashboardId: number) =>
        `/${teamId}/dashboards/${dashboardId}/invitations`,
      CancelDashboardInvitaion: (teamId: number, dashboardId: number, invitationId: number) =>
        `/${teamId}/dashboards/${dashboardId}/invitations/${invitationId}`,
    },
    invitations: {
      GetinvitationLists: (teamId: number) => `/${teamId}/invitations`,
      replyToInvitation: (teamId: number, invitationId: number) => `/${teamId}/invitations/${invitationId}`,
    },
    members: {},
    users: {},
  },
} as const;

export default apiConfig;
