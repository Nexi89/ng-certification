import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LocationData } from './locationData';
import { WeatherService } from './weather-service';

@Injectable({
  providedIn: 'root'
})
export class RemoveUnknownCitiesService implements HttpInterceptor {

  constructor(private weatherService: WeatherService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      if (
        error instanceof HttpErrorResponse
        && (error?.error?.message === 'city not found' || error?.error?.message === 'invalid zip code')
        && error.url
      ) {
        const match = /zip=(\d+),(\w{2})/.exec(error.url);
        if (match) {
          const location: LocationData = { zipcode: match[1], country: match[2] }
          this.weatherService.removeLocation(location)
        }
      }
      return throwError(error)
    }));
  }
}
