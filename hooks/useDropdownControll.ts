import { useState } from "react";

type Member = {
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

function useDropdownController({ options }: Prop) {
  const [value, setValue] = useState<Member | null>(null);

  return { options, value, setValue };
}

export default useDropdownController;
