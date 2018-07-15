export const required = value => (value ? undefined : "Required");
export const isNumber = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const NagativeNumber = value =>
  value < 0 ? `NOT SUPPORT NAGATIVE NUMBER` : undefined;
export const ZeroNumber = value =>
  Number(value) === 0 ? `NOT SUPPORT ZERO NUMBER` : undefined;
