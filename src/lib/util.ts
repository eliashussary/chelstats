import toNumber from "lodash/toNumber";
export const isNumeric = (val: string | number) => {
  const num = toNumber(val);
  const isNan = Number.isNaN(num);
  if (isNan) return false;
  if (typeof num === "number") return true;
  return false;
};
