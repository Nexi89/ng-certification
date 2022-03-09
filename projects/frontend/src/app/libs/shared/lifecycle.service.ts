import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export class LifecycleService implements OnDestroy {
  destroy = new Subject<void>();

  constructor() {
    this.takeUntilDestroy.bind(this);
  }

  takeUntilDestroy = <T>(obs: Observable<T>): Observable<T> => {
    return obs.pipe(takeUntil(this.destroy))
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
