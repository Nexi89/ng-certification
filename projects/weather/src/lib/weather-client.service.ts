import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, map, Observable, of } from 'rxjs';
import { LocationData } from './locationData';
import { Weather, WeatherForecast } from './weather';
import { WeatherForecastResponse, WeatherResponse } from './weather-dto';

const WEATHER_API = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = ''

@Injectable({ providedIn: 'root' })
export class WeatherClient {

  constructor(private httpClient: HttpClient) {
  }

  private static mapWeatherResponse(res: WeatherResponse, location: LocationData): Weather {
    const result: Omit<Weather, 'icon'> = {
      temp: Math.round(res.main.temp),
      tempMax: Math.round(res.main.temp_max),
      tempMin: Math.round(res.main.temp_min),
      name: res.name,
      weather: res.weather[0]?.main ?? '',
      location
    };
    return { ...result, icon: WeatherClient.getIcon(result.weather) }
  }

  private static getIcon(weather: string) {
    switch (weather) {
      case 'Clouds':
        return 'assets/clouds.png';
      case 'Rain':
        return 'assets/rain.png';
      case 'Snow':
        return 'assets/snow.png';
      default:
        return 'assets/sun.png';
    }
  }

  private static getDay(dt: number) {
    const dayNumber = new Date(dt).getDay();
    switch (dayNumber) {
      case 0:
        return 'Sunday'
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      default:
        return '';
    }
  }

  getWeather(locations: LocationData[]): Observable<Weather[]> {
    if (!locations.length) {
      return of([])
    }
    return combineLatest(locations.map(l => this.getWeatherForLocation(l))).pipe(map(ls => ls.filter((l): l is Weather => !!l)))
  }

  getWeatherForLocation({ zipcode, country }: LocationData): Observable<Weather | null> {
    return this.httpClient.get<WeatherResponse>(`${WEATHER_API}weather?zip=${zipcode},${country}&units=imperial&appid=${API_KEY}`).pipe(
      map(res => WeatherClient.mapWeatherResponse(res, { zipcode, country })),
      catchError(() => of(null)),
    )
  }

  getWeatherForecast({ zipcode, country }: LocationData): Observable<WeatherForecast> {
    return this.httpClient.get<WeatherForecastResponse>(`${WEATHER_API}forecast/daily?zip=${zipcode},${country}&cnt=5&units=imperial&appid=${API_KEY}`).pipe(
      map(res => this.mapWeatherForecastResponse(res, { zipcode, country })))
  }

  private mapWeatherForecastResponse({
                                       list,
                                       city: { name }
                                     }: WeatherForecastResponse, location: LocationData): WeatherForecast {
    return {
      days: list.map(({ dt, weather, temp: { max, min } }) => ({
        day: WeatherClient.getDay(dt * 1000),
        weather: weather[0].main,
        tempMax: Math.round(max),
        tempMin: Math.round(min),
        icon: WeatherClient.getIcon(weather[0].main)
      })),
      name,
      location
    }
  }
}
