import React from "react";
import WeatherData from "../../../server/models/weather-model";
import { kelvinToCelsius } from "./actions";
import { Avatar } from "@nextui-org/avatar";

interface MainDetailProps {
  weatherData: WeatherData | null;
}

const MainDetail: React.FC<MainDetailProps> = ({ weatherData }) => {
  return (
    <div className="flex flex-col items-center">
      {weatherData && (
        <>
          <div className="flex flex-col mb-8 text-center">
            <div>
              <h1>{weatherData.name}</h1>
              <div>{weatherData.sys.country}</div>
            </div>
          </div>
          <div className="flex flex-row mb-4">
            <Avatar
              src={`/images/weather_${weatherData?.weather[0].icon}.png`}
              className="bg-primary mr-4"
            />
            <div className="flex flex-col">
              <div className="font-bold">{weatherData.weather[0].main}</div>
              <div>{weatherData.weather[0].description}</div>
            </div>
          </div>
          <div className="font-bold text-2xl">
            {`${kelvinToCelsius({ kelvin: weatherData.main.temp })} °C`}
          </div>
          <div>
            {`สูงสุด: ${kelvinToCelsius({
              kelvin: weatherData.main.temp_max,
            })} °C ต่ำสุด: ${kelvinToCelsius({
              kelvin: weatherData.main.temp_min,
            })} °C`}
          </div>
          <div className="contentTitle">
            {`Feels like ${kelvinToCelsius({
              kelvin: weatherData.main.feels_like,
            })} °C`}
          </div>
        </>
      )}
    </div>
  );
};

export default MainDetail;
