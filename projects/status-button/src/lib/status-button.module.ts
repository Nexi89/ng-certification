import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultStatusButtonComponent } from './default-status-button.component';
import { StatusButtonComponent } from './status-button.component';


@NgModule({
  declarations: [
    StatusButtonComponent,
    DefaultStatusButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusButtonComponent,
  ]
})
export class StatusButtonModule {
}
