const formatTimeAgo = (timestamp) => {
  const now = Date.now();
  const difference = now - timestamp;

  // Calcula las unidades de tiempo correspondientes
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (difference < minute) {
    return "Justo ahora";
  } else if (difference < hour) {
    const minutes = Math.floor(difference / minute);
    return minutes + "m";
  } else if (difference < day) {
    const hours = Math.floor(difference / hour);
    return hours + "h";
  } else if (difference < week) {
    const days = Math.floor(difference / day);
    return days + "d";
  } else if (difference < month) {
    const weeks = Math.floor(difference / week);
    return weeks + "w";
  } else {
    const months = Math.floor(difference / month);
    return months + "m";
  }
};

export { formatTimeAgo };
