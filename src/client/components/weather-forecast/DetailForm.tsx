import React from "react";
import { AQIMap } from "../../constants/aqi";
import { AirPollutionData } from "../../../server/models/air-pollution";
import WeatherData from "../../../server/models/weather-model";
import ConvertTimeComponent from "./time";
import { Divider } from "@nextui-org/divider";

interface DetailFormProps {
  airPollutionData: AirPollutionData | null;
  weatherData: WeatherData | null;
}

const detailWeather = (
  title: string,
  detail: JSX.Element | string | number | undefined,
  unit?: string
): JSX.Element => {
  return (
    <div className="flex flex-col">
      <div className="contentTitle">{title}</div>
      <Divider className="w-4 my-1 bg-black" />
      <div className="detail">
        {detail !== undefined ? (
          <>
            {detail} {unit ?? ""}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const DetailForm: React.FC<DetailFormProps> = ({
  airPollutionData,
  weatherData,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <div className="grid content-center grid-cols-2 gap-x-64 gap-y-16">
        {detailWeather(
          "AQI",
          AQIMap[airPollutionData?.list[0]?.main?.aqi ?? 0]
        )}
        {detailWeather(
          "PM2.5",
          airPollutionData?.list[0].components.pm2_5,
          "μg/\u33A5"
        )}
        {detailWeather(
          "Sun Rise",
          <ConvertTimeComponent
            time={weatherData?.sys.sunrise ?? 0}
            timezoneOffset={weatherData?.timezone ?? 0}
          />
        )}
        {detailWeather(
          "Sun Set",
          <ConvertTimeComponent
            time={weatherData?.sys.sunset ?? 0}
            timezoneOffset={weatherData?.timezone ?? 0}
          />
        )}
        {detailWeather("Wind Speed", weatherData?.wind.speed, "m/s")}
        {detailWeather("Pressure", weatherData?.main.pressure, "hPa")}
        {detailWeather(
          "Visibility",
          ((weatherData?.visibility ?? 0) / 1000).toFixed(2),
          "km"
        )}
        {detailWeather("Humidity", weatherData?.main.humidity, "%")}
      </div>
    </div>
  );
};

export default DetailForm;
