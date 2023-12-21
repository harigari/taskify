import { ReactNode } from "react";

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

export interface HeaderButtonProps {
  src: string;
  alt: string;
  children: ReactNode;
}
