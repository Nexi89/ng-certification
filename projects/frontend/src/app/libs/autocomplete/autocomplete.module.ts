import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutocompleteControlValueAccessorDirective } from './autocomplete-control-value-accessor.directive';
import { AutocompleteItemComponent } from './autocomplete-item/autocomplete-item.component';
import { AutocompleteComponent } from './autocomplete.component';


@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteItemComponent,
    AutocompleteControlValueAccessorDirective,
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    AutocompleteComponent,
    AutocompleteControlValueAccessorDirective
  ]
})
export class AutocompleteModule {
}
