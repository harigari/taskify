import { DashBoardData } from "@/types/api.type";
import { atom } from "jotai";

export const dashboardListAtom = atom<DashBoardData[]>([]);
