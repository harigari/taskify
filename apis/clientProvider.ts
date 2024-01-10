import { QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import sender from "./sender";

export const clientProvider = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  const accessToken = getAccessTokenFromCookie(context) as string;

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => sender.get({ path: "me", accessToken: accessToken }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["dashboards"],
    queryFn: () => sender.get({ path: "dashboards", method: "pagination", size: 999, accessToken: accessToken }),
  });

  const boardId = Number(context.query["boardId"]);

  if (boardId) {
    await queryClient.prefetchQuery({
      queryKey: ["members", boardId],
      queryFn: () => sender.get({ path: "members", id: boardId, accessToken }),
    });

    await queryClient.prefetchQuery({
      queryKey: ["dashboardInvitations", boardId],
      queryFn: () => sender.get({ path: "dashboardInvitations", id: boardId, accessToken }),
    });
  }

  return queryClient;
};
