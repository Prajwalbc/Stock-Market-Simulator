export function isNullOrWhiteSpaceOrEmpty(str) {
  return str === null || str.replace(/\s/g, "").length === 0 || str === "";
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function getDateTime(ISOdateTime) {
  const dt = new Date(ISOdateTime);

  const parsedDateTime = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "short",
    timeStyle: "short",
  })
    .format(dt)
    .split(",");

  return parsedDateTime;
}

// let a = new Date().toISOString();
// console.log(a);
