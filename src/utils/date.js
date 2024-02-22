import moment from "moment";

const getDay = (time, now, momentDate) => {
  let days = time.split(" ")[0];
  if (Number(days) < 7) {
    return now.subtract(Number(days), "days").format("dddd");
  } else {
    console.log("DD/MM/YYYY", momentDate.format("DD/MM/YYYY"));
    return momentDate.format("DD/MM/YYYY");
  }
};

export const dateHandler = date => {
  //   let laggingTime = new Date(date);
  //   let currentTime = laggingTime.setHours(laggingTime.getHours() + 1);
  let now = moment();
  let momentDate = moment(date);
  let time = momentDate.fromNow(true);
  let dateByHourAndMinute = momentDate.format("LT");

  //   if (time === "a few seconds") {
  //     return "Now";
  //   }
  //   if (time.search("minute") !== -1) {
  //     let mins = time.split(" ")[0];
  //     if (mins === "a") {
  //       return "1 min";
  //     } else {
  //       return `${mins} min`;
  //     }
  //   }

  if (
    time.search("hour") !== -1 ||
    time.search("minute") !== -1 ||
    time === "a few seconds"
  ) {
    return dateByHourAndMinute;
  }

  if (time === "a day") {
    return "Yesterday";
  }

  if (time.search("days") !== -1) {
    return getDay(time, now, momentDate);
  }

  return getDay(time, now, momentDate);
};

export function sameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const getMessageDate = date => {
  let now = moment();
  let momentDate = moment(date);
  let time = momentDate.fromNow(true);

  if (
    time.search("hour") !== -1 ||
    time.search("minute") !== -1 ||
    time === "a few seconds" ||
    time === "a day"
  ) {
    return "Yesterday".toUpperCase();
  }

  if (time.search("days") !== -1) {
    return getDay(time, now, momentDate).toUpperCase();
  }
  return getDay(time, now, momentDate).toUpperCase();
};
