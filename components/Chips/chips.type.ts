import { ReactNode } from "react";
export interface ChipColorProps {
  size: string;
  color: "green" | "purple" | "orange" | "blue" | "pink";
  onClick?: () => void;
  isSelected: boolean;
}

export interface ChipColorsProps {
  size: "sm" | "lg";
}

export interface ChipNumProps {
  children: ReactNode;
}

export interface ChipTagProps {
  size: "sm" | "lg";
  children: ReactNode;
}

export interface ChipTodoProps {
  size: "sm" | "lg";
  children: ReactNode;
}
