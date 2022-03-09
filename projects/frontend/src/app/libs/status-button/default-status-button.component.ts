import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { Status } from './status-presenter';
import { StatusConsumer } from './status-service';

@Component({
  selector: 'ffs-default-status-button',
  templateUrl: './default-status-button.component.html'
})
export class DefaultStatusButtonComponent {
  status$ = of<Status>('default');

  @Input() set statusConsumer(consumer: StatusConsumer) {
    this.status$ = consumer.getStatus;
    this.startTask = () => consumer.startTask();
    consumer.setResetTime(500);
  }

  startTask = () => {
  }
}
