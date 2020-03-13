const calculateDate = timeStamp => {
  const a = new Date(timeStamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const day = days[a.getDay()];
  let suffix;

  if (date == 3 || date == 23) {
    suffix = "rd";
  } else if (date == 2 || date == 22) {
    suffix = "nd";
  } else if (date == 1 || date == 21 || date == 31) {
    suffix = "st";
  } else {
    suffix = "th";
  }

  return `${day} ${date}${suffix} of ${month}`;
};

export default calculateDate;
