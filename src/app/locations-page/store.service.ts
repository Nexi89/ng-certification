import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

const LOCATION_KEY = 'ffs-location'

@Injectable({ providedIn: 'root' })
export class StoreService {
  private locations: BehaviorSubject<number[]>;

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {
    const loadedData = this.storage.getItem(LOCATION_KEY);
    const locations: number[] = loadedData ? JSON.parse(loadedData) : [];
    this.locations = new BehaviorSubject<number[]>(locations)
  }

  storeLocation(location: number) {
    const uniqueLocations = new Set(this.locations.getValue()).add(location);
    this.locations.next([...uniqueLocations]);
    this.storage.setItem(LOCATION_KEY, JSON.stringify(this.locations.getValue()));
  }

  getLocations() {
    return this.locations.asObservable()
  }

  delete(location: number) {
    const locations = new Set(this.locations.getValue());
    locations.delete(location);
    this.locations.next([...locations])
    this.storage.setItem(LOCATION_KEY, JSON.stringify(this.locations.getValue()))
  }
}
