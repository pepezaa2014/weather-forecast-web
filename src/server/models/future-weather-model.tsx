import WeatherData from "./weather-model";

interface Coord {
  lat?: number;
  lon?: number;
}

interface City {
  id?: number;
  name?: string;
  coord?: Coord;
  country?: string;
  population?: number;
  timezone?: number;
  sunrise?: number;
  sunset?: number;
}

interface FutureWeather {
  cod?: string;
  message?: number;
  cnt?: number;
  list?: WeatherData[];
  city?: City;
}

export default FutureWeather;
