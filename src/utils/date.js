import moment from "moment";

export const dateHandler = date => {
  //   let laggingTime = new Date(date);
  //   let currentTime = laggingTime.setHours(laggingTime.getHours() + 1);
  let now = moment();
  let momentDate = moment(date);
  let time = momentDate.fromNow(true);
  let dateByHourAndMinute = momentDate.format("LT");

  const getDay = () => {
    let days = time.split(" ")[0];
    if (Number(days) < 7) {
      return now.subtract(Number(days), "days").format("dddd");
    } else {
      return momentDate.format("DD/MM/YYYY");
    }
  };

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
    return getDay();
  }

  return time;
};
