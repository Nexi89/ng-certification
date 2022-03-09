import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Status } from './status-presenter';

@Injectable({ providedIn: 'root' })
class StatusService {
  createStatus() {
    const state = new StatusState();
    return {
      statusConsumer: new StatusConsumer(state),
      statusProvider: new StatusProvider(state)
    }
  }
}

class StatusConsumer {
  get getStatus(): Observable<Status> {
    return this.statusState.status.asObservable();
  }

  constructor(private statusState: StatusState) {
  }

  setResetTime(time: number): void {
    this.statusState.resetTime = time
  }

  startTask(): void {
    this.statusState.task.next();
  }
}

class StatusProvider {
  constructor(private statusState: StatusState) {
  }

  getStatus(): Observable<Status> {
    return this.statusState.status.asObservable();
  }

  setStatus(status: Status): void {
    this.statusState.status.next(status);
  }

  getResetTime() {
    return this.statusState.resetTime;
  }

  taskStarted(): Observable<void> {
    return this.statusState.task.asObservable()
  }
}

class StatusState {
  status = new BehaviorSubject<Status>('default');
  resetTime = 500;
  task = new ReplaySubject<void>(1);
}

export {
  StatusService,
  type StatusConsumer,
  type StatusProvider
}
