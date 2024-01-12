import { DashBoardData } from "@/types/api.type";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const dashboardListAtom = atom<DashBoardData[]>([]);
export const accessTokenAtom = atomWithStorage<string>("accessToken", "");
