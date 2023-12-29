const makeColorProfile = (str: string) => {
  const idx = str.toLowerCase();
  switch (true) {
    case (idx >= "a" && idx < "g") || (idx >= "가" && idx < "라"):
      return "var(--green)";
    case (idx >= "g" && idx < "m") || (idx >= "라" && idx < "사"):
      return "var(--orange)";
    case (idx >= "m" && idx < "s") || (idx >= "사" && idx < "차"):
      return "var(--blue)";
    case (idx >= "s" && idx <= "z") || (idx >= "차" && idx < "힣"):
      return "var(--pink)";
    default:
      return "var(--gray50)";
  }
};

export { makeColorProfile };
