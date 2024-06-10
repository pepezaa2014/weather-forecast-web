import AppConstant from "@/src/client/constants/app-constants";
import WeatherData from "@/src/server/models/weather-model";
import WeatherRouter from "@/src/client/router/weather_router";
import { RestError } from "@/src/server/models/rest-error";

interface WeatherDataProps {
  city?: string;
  lat?: number;
  lon?: number;
}

export async function GET({
  city,
  lat,
  lon,
}: WeatherDataProps): Promise<WeatherData> {
  let queryParams: URLSearchParams;

  try {
    if (city != null) {
      queryParams = new URLSearchParams({
        q: city,
        appid: AppConstant.appId,
      });
    } else if (lat != null && lon != null) {
      queryParams = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        appid: AppConstant.appId,
      });
    } else {
      throw new Error("Either city or both lat and lon must be provided");
    }

    const fetchData = await fetch(
      `${AppConstant.baseWeatherUrl}${WeatherRouter.getWeather}?${queryParams}`
    );
    if (!fetchData.ok) {
      throw new Error("Failed to fetch data");
    }
    return fetchData.json();
  } catch (err) {
    throw RestError.notFound;
  }
}
