import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AutocompleteInput, AutocompleteItem } from './autocomplete-item/autocomplete-item';

@Component({
  selector: 'ffs-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('dropdown') dropdown?: ElementRef;
  @Input() placeholder = 'Type to search...'
  @Input() items: AutocompleteInput[] = []
  visibleItems: AutocompleteItem[] = []

  selected$ = new BehaviorSubject<AutocompleteInput | null>(null);

  private _input = '';

  get input(): string {
    return this._input;
  }

  set input(value: string) {
    this._input = value;
    this.visibleItems = this.getVisibleItems(this.items, value);
  }

  ngOnInit(): void {
    this.visibleItems = this.getVisibleItems(this.items, this.input);
  }

  getVisibleItems(regions: AutocompleteInput[], searchString: string): AutocompleteItem[] {
    return regions.map(({ label, value }) => {
      const regExp = new RegExp(`(?<a>${searchString})+(?<b>^${searchString})*`, 'ig')
      return {
        value,
        html: this.input ? label.replace(regExp, '<strong>$<a></strong>$<b>') : label,
        label
      }
    }).filter(({ html }) => !searchString || html.includes('<strong>'));
  }

  itemSelected({ label, value }: AutocompleteItem) {
    this.input = label
    this.selected$.next({ label, value });
  }
}
