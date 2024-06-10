import AppConstant from "@/src/client/constants/app-constants";
import { Geocoding } from "@/src/server/models/geocoding-model";
import GeocodingRouter from "@/src/client/router/geocoding_router";
import { RestError } from "@/src/server/models/rest-error";

interface GeocodingProps {
  q: string;
}

export async function GET({ q }: GeocodingProps): Promise<Geocoding[]> {
  try {
    const queryParams = new URLSearchParams({
      q: q,
      limit: AppConstant.limitGeocoding,
      appid: AppConstant.appId,
    });

    const fetchData = await fetch(
      `${AppConstant.baseWeatherUrl}${GeocodingRouter.geocodingURL}?${queryParams}`
    );
    if (!fetchData.ok) {
      throw new Error("Failed to fetch data");
    }
    return fetchData.json();
  } catch (err) {
    throw RestError.notFound;
  }
}
