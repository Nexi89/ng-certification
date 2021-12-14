import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Weather } from '../weather/weather';
import { WeatherService } from '../weather/weather.service';
import { StoreService } from './store.service';

@Component({
  selector: 'ffs-list-locations',
  template: `
      <ng-container *ngFor="let location of locations | async">
          <ffs-location-item [weather]="location" (close)="delete($event)"
                             (open)="openForecast($event)"></ffs-location-item>
      </ng-container>
  `,
  styles: [`
    :host {
      display: grid;
      grid-gap: var(--ffs-spacing, 0);
    }
  `]
})
export class ListLocationsComponent implements OnInit {
  locations?: Observable<Array<Weather>>;

  constructor(private weatherService: WeatherService, private storageService: StoreService, private router: Router) {
  }

  ngOnInit(): void {
    this.locations = this.storageService.getLocations().pipe(switchMap(locations => {
      return this.weatherService.getWeather(locations)
    }));
  }

  delete(location: number) {
    this.storageService.delete(location)
  }

  openForecast(location: number) {
    this.router.navigate(['forecast', location]).catch(() => {

    })
  }
}
