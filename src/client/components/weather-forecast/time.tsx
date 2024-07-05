import { useState, useEffect } from "react";
import { convertTime } from "./actions";

function convertTimeFormat(timeString: string) {
  const [hours, minutes] = timeString.split(":");
  const hoursNumber = parseInt(hours, 10);
  const period = hoursNumber >= 12 ? "PM" : "AM";
  const adjustedHours = hoursNumber % 12 || 12;
  return `${String(adjustedHours).padStart(2, "0")}:${minutes} ${period}`;
}

const ConvertTimeComponent = ({
  time,
  timezoneOffset,
}: {
  time: number;
  timezoneOffset: number;
}) => {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    setLocalTime(convertTime({ time: time, timezoneOffset: timezoneOffset }));
  }, [time, timezoneOffset]);

  return <span>{convertTimeFormat(localTime)}</span>;
};

export default ConvertTimeComponent;
