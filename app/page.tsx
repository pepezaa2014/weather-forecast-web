/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useEffect } from "react";
import AppConstant from "@/client/constants/app-constants";
import WeatherRouter from "@/client/router/weather_router";
import WeatherData from "@/client/models/weather-model";
import FutureWeather from "@/client/models/future-weather-model";
import FutureWeatherRouter from "@/client/router/future_weather_router";
import AirPollutionRouter from "@/client/router/air_pollution_router";
import { AirQualityData } from "@/client/models/air-pollution";
import { AQIMap } from "@/client/constants/aqi";
import FutureCard from "@/client/components/future-card/future-card";
import GeocodingRouter from "@/client/router/geocoding_router";
import { Geocoding } from "@/client/models/geocoding-model";

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

async function fetchGeocoding(q: string): Promise<Geocoding[]> {
  const queryParams = new URLSearchParams({
    q: q,
    limit: AppConstant.limitGeocoding,
    appid: AppConstant.appId,
  });

  const res = await fetch(
    `${AppConstant.baseWeatherUrl}${GeocodingRouter.geocodingURL}?${queryParams}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function fetchAirPollution(
  lat: number,
  lon: number
): Promise<AirQualityData> {
  const queryParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: AppConstant.appId,
  });

  const res = await fetch(
    `${AppConstant.baseWeatherUrl}${AirPollutionRouter.getAirPollution}?${queryParams}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function fetchFutureData(
  lat: number,
  lon: number
): Promise<FutureWeather> {
  const queryParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: AppConstant.appId,
  });

  const res = await fetch(
    `${AppConstant.baseWeatherUrl}${FutureWeatherRouter.getFutureWeather}?${queryParams}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function fetchWeatherData(city: string): Promise<WeatherData> {
  const queryParams = new URLSearchParams({
    q: city,
    appid: AppConstant.appId,
  });

  const res = await fetch(
    `${AppConstant.baseWeatherUrl}${WeatherRouter.getWeather}?${queryParams}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function fetchWeatherDataWithLatLon(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const queryParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: AppConstant.appId,
  });

  const res = await fetch(
    `${AppConstant.baseWeatherUrl}${WeatherRouter.getWeather}?${queryParams}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const kelvinToCelsius = (kelvin: number): string => {
  return (kelvin - 273.15).toFixed(1);
};

const convertTime = (
  time: number | undefined,
  timezoneOffset: number | undefined
): string => {
  const thisTime = new Date((time ?? 0) * 1000);
  const utc = thisTime.getTime() + thisTime.getTimezoneOffset() * 60000;
  const localDate = new Date(utc + (timezoneOffset ?? 0) * 1000);
  return localDate.toLocaleTimeString();
};

const ConvertTimeComponent = ({
  time,
  timezoneOffset,
}: {
  time: number;
  timezoneOffset: number;
}) => {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    setLocalTime(convertTime(time, timezoneOffset));
  }, [time, timezoneOffset]);

  return <span>{localTime}</span>;
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [futureWeatherData, setFutureWeatherData] =
    useState<FutureWeather | null>(null);
  const [airPollutionData, setAirPollutionData] =
    useState<AirQualityData | null>(null);
  const [geocodingData, setGeocodingData] = useState<Geocoding[] | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Geocoding | null>(
    null
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const weatherData = await fetchWeatherData("Chiang mai");
        setWeatherData(weatherData);

        const futureWeatherData = await fetchFutureData(18.75, 99);
        setFutureWeatherData(futureWeatherData);

        const airPollutionData = await fetchAirPollution(18.75, 99);
        setAirPollutionData(airPollutionData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherData(currentLocation?.name ?? "");
        setWeatherData(weatherData);
        if (weatherData == null) {
          const weatherData = await fetchWeatherDataWithLatLon(
            currentLocation?.lat ?? 0,
            currentLocation?.lon ?? 0
          );
          setWeatherData(weatherData);
        }

        const futureWeatherData = await fetchFutureData(
          currentLocation?.lat ?? 0,
          currentLocation?.lon ?? 0
        );
        setFutureWeatherData(futureWeatherData);

        const airPollutionData = await fetchAirPollution(
          currentLocation?.lat ?? 0,
          currentLocation?.lon ?? 0
        );
        setAirPollutionData(airPollutionData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [currentLocation]);

  useEffect(() => {
    const fetchGeo = async () => {
      if (!searchTerm) return;
      try {
        const data = await fetchGeocoding(searchTerm);
        setGeocodingData(data);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchGeo();
  }, [searchTerm]);

  const handleSelect = (location: Geocoding) => {
    setSearchTerm(location.name);
    setIsDropdownVisible(false);
    setCurrentLocation(location);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-secondary text-black">
      <div className="flex flex-row w-full h-14 bg-primary rounded-b-lg justify-end p-4 z-10 shadow-md">
        <div className="relative flex items-center bg-white rounded px-2 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black focus:outline-none pl-2 w-full"
            onBlur={(e) => {
              if (
                !e.relatedTarget ||
                !e.relatedTarget.classList.contains("dropdown-item")
              ) {
                setIsDropdownVisible(false);
              }
            }}
            onFocus={() => searchTerm && setIsDropdownVisible(true)}
          />
          {isDropdownVisible && geocodingData && geocodingData.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 w-full top-8 right-0 max-h-60 overflow-y-auto z-20">
              {geocodingData.map((location, index) => (
                <li
                  key={index}
                  className="dropdown-item px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleSelect(location)}
                >
                  {location.name} ({location.country})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col p-4 items-center justify-between gap-8 w-full">
        <div className="flex flex-col items-center">
          {weatherData && (
            <>
              <div className="flex flex-col mb-8 text-center">
                <div>
                  <h1>{weatherData.name}</h1>
                  <div>{weatherData.sys.country}</div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="h-12 w-12 mr-4">
                  <img
                    src={`weather_${weatherData?.weather[0].icon}.png`}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-bold">{weatherData.weather[0].main}</div>
                  <div>{weatherData.weather[0].description}</div>
                </div>
              </div>
              <div className="font-bold text-2xl">
                {`${kelvinToCelsius(weatherData.main.temp)} °C`}
              </div>
              <div>
                {`สูงสุด: ${kelvinToCelsius(
                  weatherData.main.temp_max
                )} °C ต่ำสุด: ${kelvinToCelsius(weatherData.main.temp_min)} °C`}
              </div>
              <div className="contentTitle">
                {`Feels like ${kelvinToCelsius(
                  weatherData.main.feels_like
                )} °C`}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-row w-1/2 h-48 overflow-x-auto rounded-xl">
          <FutureCard futureWeather={futureWeatherData} />
        </div>

        <div className="flex flex-col items-center justify-center">
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
      </div>
    </main>
  );
};

export default Home;
