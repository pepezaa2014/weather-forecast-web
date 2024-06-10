import { AQI } from "../../client/constants/aqi";

interface Coord {
  lon: number;
  lat: number;
}

interface Main {
  aqi: AQI;
}

interface Components {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface List {
  main: Main;
  components: Components;
  dt: number;
}

export interface AirPollutionData {
  coord: Coord;
  list: List[];
}
