import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, filter, map, Observable, of } from 'rxjs';
import { Weather, WeatherForecast } from './weather';
import { WeatherForecastResponse, WeatherResponse } from './weather-dto';

const WEATHER_API = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = ''


@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private httpClient: HttpClient) {
  }

  getWeather(location: number): Observable<Weather>
  getWeather(locations: number[]): Observable<Weather[]>
  getWeather(locationOrLocations: number | number[]): Observable<Weather> | Observable<Weather[]> {
    if (Array.isArray(locationOrLocations)) {
      if (!locationOrLocations.length) {
        return of([])
      }
      return combineLatest(locationOrLocations.map(l => this.getWeatherForLocation(l)))
    }
    return this.getWeatherForLocation(locationOrLocations)
  }

  getWeatherForecast(zipcode: number) {
    return this.httpClient.get<WeatherForecastResponse>(`${WEATHER_API}forecast/daily?zip=${zipcode},us&cnt=5&units=imperial&appid=${API_KEY}`).pipe(
      map(res => this.mapWeatherForecastResponse(res, zipcode)))
  }

  private getWeatherForLocation(location: number): Observable<Weather> {
    return this.httpClient.get<WeatherResponse>(`${WEATHER_API}weather?zip=${location},us&units=imperial&appid=${API_KEY}`).pipe(
      catchError(() => of(null)),
      filter((l): l is WeatherResponse => l !== null),
      map(res => this.mapWeatherResponse(res, location)))
  }

  private mapWeatherResponse(res: WeatherResponse, location: number): Weather {
    const result: Omit<Weather, 'icon'> = {
      temp: Math.round(res.main.temp),
      tempMax: Math.round(res.main.temp_max),
      tempMin: Math.round(res.main.temp_min),
      name: res.name,
      weather: res.weather[0]?.main ?? '',
      location
    };
    return { ...result, icon: this.getIcon(result.weather) }
  }

  private getIcon(weather: string) {
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

  private mapWeatherForecastResponse({
                                       list,
                                       city: { name }
                                     }: WeatherForecastResponse, location: number): WeatherForecast {
    const result: WeatherForecast = {
      days: list.map(({ dt, weather, temp: { max, min } }) => ({
        day: this.getDay(dt * 1000),
        weather: weather[0].main,
        tempMax: Math.round(max),
        tempMin: Math.round(min),
        icon: this.getIcon(weather[0].main)
      })),
      name,
      location
    };
    return result
  }

  private getDay(dt: number) {
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
}
