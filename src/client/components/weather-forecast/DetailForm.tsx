import React from "react";
import { AQIMap } from "../../constants/aqi";
import { AirPollutionData } from "../../../server/models/air-pollution";
import WeatherData from "../../../server/models/weather-model";
import ConvertTimeComponent from "./time";

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
      <div className="grid grid-cols-2 gap-x-64 gap-y-16 content-center">
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
          "พระอาทิตย์ขึ้น",
          <ConvertTimeComponent
            time={weatherData?.sys.sunrise ?? 0}
            timezoneOffset={weatherData?.timezone ?? 0}
          />
        )}
        {detailWeather(
          "พระอาทิตย์ตก",
          <ConvertTimeComponent
            time={weatherData?.sys.sunset ?? 0}
            timezoneOffset={weatherData?.timezone ?? 0}
          />
        )}
        {detailWeather("ความเร็วลม", weatherData?.wind.speed, "m/s")}
        {detailWeather("ความกดอากาศ", weatherData?.main.pressure, "hPa")}
        {detailWeather(
          "ระยะการมองเห็น",
          ((weatherData?.visibility ?? 0) / 1000).toFixed(2),
          "km"
        )}
        {detailWeather("ความชื้น", weatherData?.main.humidity, "%")}
      </div>
    </div>
  );
};

export default DetailForm;
