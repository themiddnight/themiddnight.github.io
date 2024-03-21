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

export function getRelativeTime(timestamp) {
  const date = new Date(timestamp._seconds * 1000);
  const now = new Date();
  const diff = now - date;

  if (diff < 1000 * 60) {
    return "Just now";
  } else if (diff < 1000 * 60 * 60) {
    const min = Math.floor(diff / (1000 * 60));
    return `${min} ${min === 1 ? "min." : "mins."}`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hour = Math.floor(diff / (1000 * 60 * 60));
    return `${hour} ${hour === 1 ? "hr." : "hrs."}`;
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${day} ${day === 1 ? "day" : "days"}`;
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    const week = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    return `${week} ${week === 1 ? "week" : "weeks"}`;
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }
}