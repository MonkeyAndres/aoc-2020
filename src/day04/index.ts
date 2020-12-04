interface Passport {
  ecl: string;
  pid: string;
  eyr: string;
  hcl: string;
  byr: string;
  iyr: string;
  cid: string;
  hgt: string;
}

type Predicate<T> = (value: T) => boolean;

interface PassportPolicy {
  byr: Predicate<string>;
  iyr: Predicate<string>;
  eyr: Predicate<string>;
  hgt: Predicate<string>;
  hcl: Predicate<string>;
  ecl: Predicate<string>;
  pid: Predicate<string>;
}

export const PASSPORT_RESTRICT_POLICY: PassportPolicy = {
  byr: (value) => value.length === 4 && +value >= 1920 && +value <= 2002,
  iyr: (value) => value.length === 4 && +value >= 2010 && +value <= 2020,
  eyr: (value) => value.length === 4 && +value >= 2020 && +value <= 2030,
  hgt: (value: string) => {
    if (value.endsWith("cm")) {
      return parseInt(value, 10) >= 150 && parseInt(value, 10) <= 193;
    } else if (value.endsWith("in")) {
      return parseInt(value, 10) >= 59 && parseInt(value, 10) <= 76;
    }

    return false;
  },
  hcl: (value) => /^#[0-9a-f]{6}$/i.test(value),
  ecl: (value) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value),
  pid: (value) => /^[\d]{9}$/.test(value),
};

export const parsePassport = (passport: string): Passport =>
  passport.split(/[ \n]/).reduce((acc, field) => {
    const [key, value] = field.split(":");
    return { ...acc, [key]: value };
  }, {}) as Passport;

export const part1 = (input: string): number => {
  const passports: Passport[] = input.split("\n\n").map(parsePassport);

  return passports.filter((passport: Passport) =>
    Object.keys(PASSPORT_RESTRICT_POLICY).every(
      (field: string) => passport[field as keyof Passport]
    )
  ).length;
};

export const part2 = (input: string): number => {
  const passports: Passport[] = input.split("\n\n").map(parsePassport);

  return passports.filter((passport: Passport) =>
    Object.keys(PASSPORT_RESTRICT_POLICY).every((field) => {
      const fieldValue = passport[field as keyof Passport];
      const predicate = PASSPORT_RESTRICT_POLICY[field as keyof PassportPolicy];

      if (fieldValue) {
        return predicate(fieldValue);
      }

      return false;
    })
  ).length;
};
