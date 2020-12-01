import fs from "fs";
import path from "path";

export const getDayInput = (dayNumber: number) => {
  const paddedDay = String(dayNumber).padStart(2, "0");
  const filePath = path.join(__dirname, `day${paddedDay}`, "input.txt");
  const input = fs.readFileSync(filePath, {
    encoding: "utf-8",
  });

  return input;
};
