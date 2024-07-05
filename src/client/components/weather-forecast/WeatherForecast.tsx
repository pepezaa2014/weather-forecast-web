import { useState, useEffect, Suspense } from "react";
import { AQIMap } from "../../constants/aqi";
import { AirPollutionData } from "../../../server/models/air-pollution";
import FutureWeather from "../../../server/models/future-weather-model";
import { Geocoding } from "../../../server/models/geocoding-model";
import WeatherData from "../../../server/models/weather-model";
import FutureCard from "../future-card/FutureCard";
import DetailForm from "./DetailForm";
import { GET as fetchWeatherData } from "@/src/app/api/app/weather/route";
import { GET as fetchAirPollution } from "@/src/app/api/app/air-pollution/route";
import { GET as fetchFutureData } from "@/src/app/api/app/future/route";
import MainDetail from "./MainDetail";
import Navbar from "../navbar/Navbar";
import { useFetchInitialData } from "./actions";

const WeatherForecast = () => {
  const [currentLocation, setCurrentLocation] = useState<Geocoding | null>(
    null
  );

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [futureWeatherData, setFutureWeatherData] =
    useState<FutureWeather | null>(null);
  const [airPollutionData, setAirPollutionData] =
    useState<AirPollutionData | null>(null);

  useFetchInitialData({
    setWeatherData,
    setFutureWeatherData,
    setAirPollutionData,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!currentLocation) return;

      try {
        let weatherData = await fetchWeatherData({
          city: currentLocation.name,
        });

        if (!weatherData) {
          weatherData = await fetchWeatherData({
            lat: currentLocation.lat,
            lon: currentLocation.lon,
          });
        }

        setWeatherData(weatherData);

        const futureWeatherData = await fetchFutureData({
          lat: currentLocation.lat,
          lon: currentLocation.lon,
        });
        setFutureWeatherData(futureWeatherData);

        const airPollutionData = await fetchAirPollution({
          lat: currentLocation.lat,
          lon: currentLocation.lon,
        });
        setAirPollutionData(airPollutionData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [currentLocation]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-secondary text-black">
      <Navbar setCurrentLocation={setCurrentLocation} />
      <div className="flex flex-col p-4 items-center justify-between gap-8 w-full">
        <MainDetail weatherData={weatherData} />
        <FutureCard futureWeather={futureWeatherData} />
        <DetailForm
          airPollutionData={airPollutionData}
          weatherData={weatherData}
        />
      </div>
    </div>
  );
};

export default WeatherForecast;
