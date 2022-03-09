import { Component, Input } from '@angular/core';
import { AutocompleteItem } from './autocomplete-item';

@Component({
  selector: 'ffs-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrls: ['./autocomplete-item.component.scss']
})
export class AutocompleteItemComponent {
  @Input() item?: AutocompleteItem
}
