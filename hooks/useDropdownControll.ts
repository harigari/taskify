import { useState } from "react";

interface Prop {
  options: string[];
}

function useDropdownController({ options }: Prop) {
  const [value, setValue] = useState(options[0]);

  return { options, value, setValue };
}

export default useDropdownController;
