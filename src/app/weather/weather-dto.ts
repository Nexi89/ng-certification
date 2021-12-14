export interface WeatherResponse {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  }
  name: string;
  weather: [{ main: string }]
}

export interface WeatherForecastResponse {
  city: {
    name: string
  }
  list: {
    dt: number
    temp: {
      max: number;
      min: number;
    }
    weather: [{ main: string }]
  }[]
}
