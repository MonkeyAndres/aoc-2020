const operations = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
};

const parseExpression = (
  elements: string,
  index = 0,
  depth = 0
): number | [number, number] => {
  let acc = 0;
  let pointer = index;

  while (pointer < elements.length) {
    const curr = elements[pointer];
    const next = elements[pointer + 1];
    const operation = operations[curr];

    if (curr === "(") {
      const result = parseExpression(elements, pointer + 1, depth + 1);

      if (Array.isArray(result)) {
        acc = result[0];
        pointer = result[1];
        continue;
      } else {
        return result;
      }
    }

    if (curr === ")") {
      return [acc, pointer + 1];
    }

    if (!acc) {
      acc += parseInt(curr, 10);
      pointer += 1;
      continue;
    }

    if (operation && next !== "(") {
      acc = operation(acc, parseInt(next, 10));
      pointer += 2;
      continue;
    } else if (operation && next === "(") {
      const result = parseExpression(elements, pointer + 2, depth + 1);

      if (Array.isArray(result)) {
        acc = operation(acc, result[0]);
        pointer = result[1];
        continue;
      } else {
        return result;
      }
    }

    throw new Error(
      `Unhandled: ${JSON.stringify({ curr, next, pointer, acc })}`
    );
  }

  return acc;
};

export const parseFormula = (input: string): number => {
  const elements = input.replace(/\s/g, "");
  return parseExpression(elements);
};

export const part1 = (input: string) => {
  const parsedInput = input.split("\n");

  return parsedInput.reduce((acc, formula) => acc + parseFormula(formula), 0);
};
