import { Component, Input, ViewContainerRef } from '@angular/core';
import { catchError, defaultIfEmpty, delay, EMPTY, first, last, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { LifecycleService } from '../shared';
import { DefaultStatusButtonComponent } from './default-status-button.component';
import { StatusConsumer, StatusProvider, StatusService } from './status-service';

@Component({
  selector: 'ffs-status-button',
  templateUrl: './status-button.component.html',
  providers: [LifecycleService]
})
export class StatusButtonComponent {
  @Input() task: Observable<unknown> = of(undefined);
  statusConsumer: StatusConsumer;
  statusProvider: StatusProvider;
  private resetTimer = new Subject<void>()
  private _custom = false;

  get custom(): boolean {
    return this._custom;
  }

  @Input() set custom(value: boolean) {
    if (value) {
      this.removeFallback()
    }
    this._custom = value;
  }

  constructor(private viewContainerRef: ViewContainerRef, lifecycle: LifecycleService, statusService: StatusService) {
    const { statusConsumer, statusProvider } = statusService.createStatus();
    this.statusConsumer = statusConsumer;
    this.statusProvider = statusProvider;

    this.setFallback();

    this.resetTimer.pipe(delay(statusProvider.getResetTime()), lifecycle.takeUntilDestroy, switchMap(() => statusProvider.getStatus().pipe(first()))).subscribe(status => {
      if (status === 'success' || status === 'failure') {
        statusProvider.setStatus('default');
      }
    })

    statusProvider.taskStarted().pipe(
      tap(() => {
        statusProvider.setStatus('pending')
      }),
      switchMap(() => this.task.pipe(
        lifecycle.takeUntilDestroy,
        defaultIfEmpty(null),
        last(),
        tap(() => {
          statusProvider.setStatus('success');
          this.resetTimer.next();
        }),
        catchError(() => {
          statusProvider.setStatus('failure');
          this.resetTimer.next();
          return EMPTY;
        })
      ))
    ).subscribe();
  }

  private setFallback() {
    const comp = this.viewContainerRef.createComponent(DefaultStatusButtonComponent);
    comp.instance.statusConsumer = this.statusConsumer;
  }

  private removeFallback() {
    this.viewContainerRef.clear();
  }
}
