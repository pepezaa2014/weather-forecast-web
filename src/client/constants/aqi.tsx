export enum AQI {
  Good = 1,
  Fair = 2,
  Moderate = 3,
  Poor = 4,
  VeryPoor = 5,
}

export const AQIMap: { [key: number]: string } = {
  [AQI.Good]: "Good",
  [AQI.Fair]: "Fair",
  [AQI.Moderate]: "Moderate",
  [AQI.Poor]: "Poor",
  [AQI.VeryPoor]: "Very Poor",
};
