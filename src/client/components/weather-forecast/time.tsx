import { useState, useEffect } from "react";
import { convertTime } from "./actions";

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

  return <span>{localTime}</span>;
};

export default ConvertTimeComponent;
