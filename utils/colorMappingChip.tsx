const colorMappingChip = (firstLetter: string) => {
  switch (true) {
    case (firstLetter >= "a" && firstLetter < "g") || (firstLetter >= "가" && firstLetter < "라"):
      return ["var(--tag1)", "var(--tag1Font)"];
    case (firstLetter >= "g" && firstLetter < "m") || (firstLetter >= "라" && firstLetter < "사"):
      return ["var(--tag2)", "var(--tag2Font)"];
    case (firstLetter >= "m" && firstLetter < "s") || (firstLetter >= "사" && firstLetter < "차"):
      return ["var(--tag3)", "var(--tag3Font)"];
    case (firstLetter >= "s" && firstLetter <= "z") || (firstLetter >= "차" && firstLetter < "힣"):
      return ["var(--tag4)", "var(--tag4Font)"];
    default:
      return ["var(--gray40)", "var(--black)"];
  }
};

export { colorMappingChip };
