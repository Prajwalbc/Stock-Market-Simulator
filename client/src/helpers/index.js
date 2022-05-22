export function isNullOrWhiteSpaceOrEmpty(str) {
  return str === null || str.replace(/\s/g, "").length === 0 || str === "";
}
