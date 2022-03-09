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
    if (!this.isDuplicate(location)) {
      const newLocations = this.locations.getValue().concat(location);
      this.locations.next(newLocations);
      this.storage.setItem(LOCATION_KEY, JSON.stringify(newLocations));
    }
  }

  getLocations() {
    return this.locations.asObservable();
  }

  delete(location: LocationData) {
    const newLocations = this.locations.getValue().filter(l => !locationEquals(location)(l));
    this.locations.next(newLocations);
    this.storage.setItem(LOCATION_KEY, JSON.stringify(newLocations))
  }

  private isDuplicate(location: LocationData): boolean {
    return !!this.locations.getValue().find(locationEquals(location));
  }
}
