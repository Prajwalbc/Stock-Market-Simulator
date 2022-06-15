export function isNullOrWhiteSpaceOrEmpty(str) {
  return str === null || str.replace(/\s/g, "").length === 0 || str === "";
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
