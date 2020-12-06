export const part1 = (input: string): number => {
  const groups = input.split("\n\n");
  const answersPerGroup = groups.map((str) => str.split(/\s?/));

  return answersPerGroup.reduce(
    (sum, answers) => sum + new Set(answers).size,
    0
  );
};

const getLargerList = (lists: Array<any[]>): any[] => {
  let largerList = [];

  for (let list of lists) {
    if (list.length > largerList.length) {
      largerList = list;
    }
  }

  return largerList;
};

const intersection = (...lists: Array<string[]>): string[] => {
  const largerList: string[] = getLargerList(lists);
  const intersectionValues: string[] = [];

  for (let value of largerList) {
    if (lists.every((val) => val.includes(value))) {
      intersectionValues.push(value);
    }
  }

  return intersectionValues;
};

export const part2 = (input: string) => {
  const groups = input.split("\n\n");

  return groups.reduce(
    (sum, group) =>
      sum +
      intersection(...group.split("\n").map((answers) => answers.split("")))
        .length,
    0
  );
};
