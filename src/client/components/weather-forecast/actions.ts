import { useEffect } from "react";
import { Geocoding } from "../../../server/models/geocoding-model";
import { AirPollutionData } from "../../../server/models/air-pollution";
import FutureWeather from "../../../server/models/future-weather-model";
import WeatherData from "../../../server/models/weather-model";
import { GET as fetchWeatherData } from "@/src/app/api/app/weather/route";
import { GET as fetchAirPollution } from "@/src/app/api/app/air-pollution/route";
import { GET as fetchFutureData } from "@/src/app/api/app/future/route";

interface KelvinToCelsiusProps {
  kelvin: number;
}

interface ConvertTimeProps {
  time: number | undefined;
  timezoneOffset: number | undefined;
}

interface HandleSelectProps {
  location: Geocoding;
  setCurrentLocation: (location: Geocoding) => void;
  setSearchCity: (city: string) => void;
  setIsDropdownVisible: (isVisible: boolean) => void;
}

interface UseFetchInitialDataProps {
  setWeatherData: (data: WeatherData) => void;
  setFutureWeatherData: (data: FutureWeather) => void;
  setAirPollutionData: (data: AirPollutionData) => void;
}

export const kelvinToCelsius = ({ kelvin }: KelvinToCelsiusProps): string => {
  return (kelvin - 273.15).toFixed(1);
};

export const convertTime = ({
  time,
  timezoneOffset,
}: ConvertTimeProps): string => {
  const thisTime = new Date((time ?? 0) * 1000);
  const utc = thisTime.getTime() + thisTime.getTimezoneOffset() * 60000;
  const localDate = new Date(utc + (timezoneOffset ?? 0) * 1000);
  return localDate.toLocaleTimeString();
};

export const useHandleSelect = ({
  setCurrentLocation,
  setSearchCity,
  setIsDropdownVisible,
}: Omit<HandleSelectProps, "location">) => {
  const handleSelect = (location: Geocoding) => {
    setSearchCity(location.name);
    setIsDropdownVisible(false);
    setCurrentLocation(location);
  };

  return { handleSelect };
};

export const useFetchInitialData = ({
  setWeatherData,
  setFutureWeatherData,
  setAirPollutionData,
}: UseFetchInitialDataProps) => {
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const weatherData = await fetchWeatherData({ city: "Chiang mai" });
        setWeatherData(weatherData);

        const futureWeatherData = await fetchFutureData({
          lat: 18.75,
          lon: 99,
        });
        setFutureWeatherData(futureWeatherData);

        const airPollutionData = await fetchAirPollution({
          lat: 18.75,
          lon: 99,
        });
        setAirPollutionData(airPollutionData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchInitialData();
  }, []);
};
