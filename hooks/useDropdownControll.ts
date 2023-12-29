import { useState } from "react";

export type Member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
};

interface Prop<T> {
  options: T[];
}

function useDropdownController<T>({ options }: Prop<T>) {
  const [value, setValue] = useState<T>();

  return { options, value, setValue };
}

export default useDropdownController;
