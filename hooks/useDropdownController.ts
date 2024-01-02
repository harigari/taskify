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
  options: T[] | undefined;
  initialValue?: T;
}

function useDropdownController<T>({ options, initialValue }: Prop<T>) {
  const unifiedInitialValue = () => {
    if (typeof initialValue === "string") {
      return initialValue;
    } else {
      return undefined;
    }
  };

  const [value, setValue] = useState<T | undefined>(unifiedInitialValue());

  return { options, value, setValue };
}

export default useDropdownController;
