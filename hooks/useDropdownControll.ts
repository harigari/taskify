import { useState } from "react";

interface Prop {
  options: string[];
}

function useDropdownControll({ options }: Prop) {
  const [value, setValue] = useState("");

  return { options, value, setValue };
}

export default useDropdownControll;
