interface Bags {
  [bagType: string]: BagContent | {};
}

interface BagContent {
  [bagType: string]: number;
}

const SHINY_GOLD_BAG_TYPE = "shiny gold";

const formatBagRules = (acc: Bags, rule: string): Bags => {
  const [bagType, containedBags] = rule.split(" bags contain ");

  const content: BagContent = containedBags.split(", ").reduce((acc, bag) => {
    const matches = bag.match(/^(\d+) ([a-z ]+) bags?\.?$/);

    if (!matches) {
      return {};
    }

    const [_, quantity, type] = matches;

    return { ...acc, [type]: parseInt(quantity, 10) };
  }, {});

  return { ...acc, [bagType]: content };
};

const recursiveFindBag = (
  desiredBag: string,
  bagType: keyof Bags,
  bags: Bags
): boolean => {
  const keys = Object.keys(bags[bagType]);

  if (keys.includes(desiredBag)) {
    return true;
  }

  return keys.some((key) => recursiveFindBag(desiredBag, key, bags));
};

export const part1 = (input: string) => {
  const rules = input.split("\n");
  const bags: Bags = rules.reduce(formatBagRules, {});

  return Object.keys(bags).reduce((acc: number, bagType) => {
    if (recursiveFindBag(SHINY_GOLD_BAG_TYPE, bagType, bags)) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const recursiveCountBags = (bagType: keyof Bags, bags: Bags): number => {
  const bagContent = Object.entries(bags[bagType]);

  if (bagContent.length === 0) {
    return 0;
  }

  return bagContent.reduce((acc, [key, quantity]) => {
    return acc + quantity + quantity * recursiveCountBags(key, bags);
  }, 0);
};

export const part2 = (input: string) => {
  const rules = input.split("\n");
  const bags: Bags = rules.reduce(formatBagRules, {});

  return recursiveCountBags(SHINY_GOLD_BAG_TYPE, bags);
};
