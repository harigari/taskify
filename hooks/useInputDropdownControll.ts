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

interface Prop {
  options: Member[];
}

function useInputDropdownController({ options }: Prop) {
  const [value, setValue] = useState<Member | null>(null);

  return { options, value, setValue };
}

export default useInputDropdownController;
