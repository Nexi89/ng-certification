export interface Weather {
  temp: number,
  tempMax: number,
  tempMin: number,
  name: string,
  weather: string,
  icon: string
  location: number
}

export interface WeatherForecast {
  name: string
  days: {
    day: string
    tempMax: number;
    tempMin: number;
    weather: string
    icon: string
  }[]
  location: number
}
