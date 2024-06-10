import AppConstant from "@/src/client/constants/app-constants";
import FutureWeather from "@/src/server/models/future-weather-model";
import FutureWeatherRouter from "@/src/client/router/future_weather_router";
import { RestError } from "@/src/server/models/rest-error";

interface FutureProps {
  lat: number;
  lon: number;
}

export async function GET({ lat, lon }: FutureProps): Promise<FutureWeather> {
  try {
    const queryParams = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      appid: AppConstant.appId,
    });

    const fetchData = await fetch(
      `${AppConstant.baseWeatherUrl}${FutureWeatherRouter.getFutureWeather}?${queryParams}`
    );
    if (!fetchData.ok) {
      throw new Error("Failed to fetch data");
    }
    return await fetchData.json();
  } catch (err) {
    throw RestError.notFound;
  }
}
