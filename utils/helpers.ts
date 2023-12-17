export const formatDate = (date: string) => {
  const currentDate = new Date();
  const blogDate = new Date(date);
  const timeDiff = currentDate.getTime() - blogDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (daysDiff < 7) {
    console.log(daysDiff);
    if (daysDiff === 0) {
      return "Today";
    } else if (daysDiff === 1) {
      return "Yesterday";
    } else {
      return `${Math.floor(daysDiff)} days ago`;
    }
  } else {
    if (currentDate.getFullYear() === blogDate.getFullYear()) {
      return `${blogDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    } else {
      return `${blogDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }
};
