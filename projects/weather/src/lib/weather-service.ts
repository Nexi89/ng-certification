import { Injectable } from '@angular/core';
import { first, interval, map, Observable, shareReplay, startWith, switchMap } from 'rxjs';
import { environment } from '../../../frontend/src/environments/environment';
import { LocationData, locationEquals } from './locationData';
import { PersistenceService } from './persistence-service';
import { Weather, WeatherForecast } from './weather';
import { WeatherClient } from './weather-client.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private updatedWeather$ = interval(environment.refreshInterval).pipe(
    startWith(0),
    switchMap(() => this.storeService.getLocations()),
    switchMap(locations => {
      return this.weatherService.getWeather(locations)
    }),
    shareReplay(1)
  );

  constructor(private weatherService: WeatherClient, private storeService: PersistenceService) {
  }

  addLocation(location: LocationData): Observable<Weather> {
    console.log('location', location)
    this.storeService.storeLocation(location);
    return this.getAllWeatherInformation().pipe(
      first(),
      map(array => {
        const weather = array.find(w => locationEquals(w.location)(location));
        if (weather) {
          return weather;
        }
        throw new Error('city not found');
      })
    )
  }

  removeLocation(location: LocationData) {
    this.storeService.delete(location)
  }

  getAllWeatherInformation(): Observable<Weather[]> {
    return this.updatedWeather$;
  }

  getWeatherForecast(location: LocationData): Observable<WeatherForecast> {
    return interval(environment.refreshInterval).pipe(
      startWith(0),
      switchMap(() => this.weatherService.getWeatherForecast(location))
    );
  }
}
