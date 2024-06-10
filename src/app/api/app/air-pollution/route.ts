import AppConstant from "@/src/client/constants/app-constants";
import { AirPollutionData } from "@/src/server/models/air-pollution";
import AirPollutionRouter from "@/src/client/router/air_pollution_router";
import { RestError } from "@/src/server/models/rest-error";

interface AirPollutionProps {
  lat: number;
  lon: number;
}

export async function GET({
  lat,
  lon,
}: AirPollutionProps): Promise<AirPollutionData> {
  try {
    const queryParams = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      appid: AppConstant.appId,
    });

    const fetchData = await fetch(
      `${AppConstant.baseWeatherUrl}${AirPollutionRouter.getAirPollution}?${queryParams}`
    );

    if (!fetchData.ok) {
      throw new Error("Failed to fetch data");
    }

    return await fetchData.json();
  } catch (err: unknown) {
    throw RestError.notFound;
  }
}
