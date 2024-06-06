/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import WeatherData from "@/client/models/weather-model";

const InsideFutureContent = ({
  futureWeather,
}: {
  futureWeather: WeatherData | undefined;
}) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    if (futureWeather) {
      const date = new Date(futureWeather.dt_txt);
      const optionsDate: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
      };
      const formattedDate = date.toLocaleDateString("th-TH", optionsDate);
      setFormattedDate(formattedDate);

      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedTime = date.toLocaleTimeString("th-TH", optionsTime);
      setFormattedTime(formattedTime);
    }
  }, [futureWeather]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {futureWeather && (
        <>
          <p suppressHydrationWarning className="text-xs text-red-800">
            {formattedDate}
          </p>
          <p suppressHydrationWarning className="text-sm text-red-800">
            {formattedTime}
          </p>
          <div className="h-12 w-12">
            <img
              src={`weather_${futureWeather.weather[0].icon}.png`}
              alt={futureWeather.weather[0].description}
              className="object-contain h-full w-full"
            />
          </div>
          <p className="text-red-800">{futureWeather.weather[0].main}</p>
        </>
      )}
      {!futureWeather && (
        <p className="text-sm text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default InsideFutureContent;
