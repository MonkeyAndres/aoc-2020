interface Passport {
  ecl: string;
  pid: string;
  eyr: string;
  hcl: string;
  byr: string;
  iyr: string;
  hgt: string;
  cid?: string;
}

type Predicate<T> = (value: T) => boolean;

type PassportPolicy = {
  [K in keyof Passport]: Predicate<Passport[K]>;
};

enum EyeColors {
  amb = "amb",
  blu = "blu",
  brn = "brn",
  gry = "gry",
  grn = "grn",
  hzl = "hzl",
  oth = "oth",
}

export const PASSPORT_RESTRICT_POLICY: PassportPolicy = {
  byr: (value) => parseInt(value, 10) >= 1920 && parseInt(value, 10) <= 2002,
  iyr: (value) => parseInt(value, 10) >= 2010 && parseInt(value, 10) <= 2020,
  eyr: (value) => parseInt(value, 10) >= 2020 && parseInt(value, 10) <= 2030,
  hgt: (value: string) => {
    if (value.endsWith("cm")) {
      return parseInt(value, 10) >= 150 && parseInt(value, 10) <= 193;
    } else if (value.endsWith("in")) {
      return parseInt(value, 10) >= 59 && parseInt(value, 10) <= 76;
    }

    return false;
  },
  hcl: (value) => /^#[0-9a-f]{6}$/i.test(value),
  ecl: (value) => !!EyeColors[value as EyeColors],
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
      (field: string) => !!passport[field as keyof Passport]
    )
  ).length;
};

export const part2 = (input: string): number => {
  const passports: Passport[] = input.split("\n\n").map(parsePassport);

  return passports.filter((passport: Passport) =>
    Object.entries(PASSPORT_RESTRICT_POLICY).every(([field, predicate]) => {
      if (predicate === undefined) {
        return true;
      }

      const fieldValue = passport[field as keyof Passport];

      if (!fieldValue) {
        return false;
      }

      return predicate(fieldValue);
    })
  ).length;
};
