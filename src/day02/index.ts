const ENTRY_REGEXP = /(\d+)-(\d+) (\w{1}): (\w+)/;

export const part1 = (input: string) => {
  const parsedInput = input.split("\n");

  return parsedInput.filter((entry) => {
    const [_, min, max, char, password] = entry.match(ENTRY_REGEXP) || [];

    if (!!password) {
      const occurrences = (password.match(new RegExp(char, "g")) || []).length;

      return occurrences >= Number(min) && occurrences <= Number(max);
    }

    throw new Error(`Corrupted entry "${entry}"`);
  }).length;
};

export const part2 = (input: string) => {
  const parsedInput = input.split("\n");

  return parsedInput.filter((entry) => {
    const [_, pos1, pos2, char, password] = entry.match(ENTRY_REGEXP) || [];

    if (!!password) {
      const charAtPos1 = password.charAt(Number(pos1) - 1);
      const charAtPos2 = password.charAt(Number(pos2) - 1);

      return (
        (charAtPos1 === char && charAtPos2 !== char) ||
        (charAtPos1 !== char && charAtPos2 === char)
      );
    }

    throw new Error(`Corrupted entry "${entry}"`);
  }).length;
};
