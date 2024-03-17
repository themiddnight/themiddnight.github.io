export function convertDate(date, day = false, long = false) {
  const dateOutput = new Date(date).toLocaleDateString("en-US", {
    month: long ? "long" : "short",
    year: "numeric",
    day: day ? "numeric" : undefined,
  });
  if (dateOutput === "Invalid Date") return "Present";
  return dateOutput;
}

export function sortByDate(data, attr = "to", desc = true) {
  return data.sort((a, b) => {
    if (a[attr] === "Present") {
      return desc ? -1 : 1;
    } else if (b[attr] === "Present") {
      return desc ? 1 : -1;
    } else {
      return desc
        ? new Date(b[attr]) - new Date(a[attr])
        : new Date(a[attr]) - new Date(b[attr]);
    }
  });
}
