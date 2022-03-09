import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationData, locationEquals } from './locationData';

const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

const LOCATION_KEY = 'locations'

@Injectable({ providedIn: 'root' })
export class PersistenceService {
  private locations: BehaviorSubject<LocationData[]>;

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {
    const loadedData = this.storage.getItem(LOCATION_KEY);
    const locations: LocationData[] = loadedData ? JSON.parse(loadedData) : [];
    this.locations = new BehaviorSubject<LocationData[]>(locations)
  }

  storeLocation(location: LocationData) {
    let newLocations = this.locations.getValue()
    if (!this.isDuplicate(location)) {
      newLocations = newLocations.concat(location);
    }
    this.storage.setItem(LOCATION_KEY, JSON.stringify(newLocations));
    this.locations.next(newLocations);
  }

  getLocations() {
    return this.locations.asObservable();
  }

  delete(location: LocationData) {
    const newLocations = this.locations.getValue().filter(l => !locationEquals(location)(l));
    this.storage.setItem(LOCATION_KEY, JSON.stringify(newLocations))
    this.locations.next(newLocations);
  }

  private isDuplicate(location: LocationData): boolean {
    return !!this.locations.getValue().find(locationEquals(location));
  }
}
