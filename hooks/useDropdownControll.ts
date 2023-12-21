import { useState } from "react";

interface Prop {
  options: string[];
}

function useDropdownController({ options }: Prop) {
  const [value, setValue] = useState("");

  return { options, value, setValue };
}

export default useDropdownController;
