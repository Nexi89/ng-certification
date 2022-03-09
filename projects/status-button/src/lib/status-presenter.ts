import { Observable } from 'rxjs';

export interface StatusPresenter {
  startTask: Observable<void>;
  resetTime?: number;

  setStatus(status: Status): void;
}

export type Status = 'default' | 'pending' | 'failure' | 'success';
