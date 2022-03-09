import { Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent, ReplaySubject } from 'rxjs';
import { LifecycleService } from '../shared';
import { AutocompleteInput } from './autocomplete-item/autocomplete-item';
import { AutocompleteComponent } from './autocomplete.component';

@Directive({
  selector: 'ffs-autocomplete[formControl],ffs-autocomplete[formControlName],ffs-autocomplete[ngModel]',
  providers: [
    LifecycleService,
    { provide: NG_VALUE_ACCESSOR, useExisting: AutocompleteControlValueAccessorDirective, multi: true }
  ]
})
export class AutocompleteControlValueAccessorDirective implements ControlValueAccessor, OnInit {

  disabled$ = new BehaviorSubject<boolean>(false);
  writeValue$ = new ReplaySubject<AutocompleteInput | null>(1);

  @ViewChild(HTMLButtonElement, { static: true }) set btn(value: ElementRef<HTMLButtonElement>) {
    this.disabled$.pipe(this.lifecycle.takeUntilDestroy).subscribe(disabled => {
      value.nativeElement.disabled = disabled;
    })
  }

  constructor(private lifecycle: LifecycleService, private cmp: AutocompleteComponent, private el: ElementRef) {
  }

  onChange: (value: AutocompleteInput | null) => void = () => {
  }

  onTouch: () => void = () => {
  }

  ngOnInit(): void {
    this.writeValue$.pipe(this.lifecycle.takeUntilDestroy).subscribe(this.selectItem.bind(this));
    this.cmp.selected$.pipe(this.lifecycle.takeUntilDestroy).subscribe(input => this.onChange(input));
    const input: HTMLInputElement | undefined = this.el.nativeElement.querySelector('input');
    input && fromEvent(input, 'blur').pipe(this.lifecycle.takeUntilDestroy).subscribe(() => this.onTouch());
  }

  registerOnChange(fn: (value: AutocompleteInput | null) => void): void {
    this.onChange = (v) => {
      fn(v);
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled$.next(isDisabled);
  }

  writeValue(input: AutocompleteInput | null): void {
    const match = this.cmp.items.find(i => i.value === input?.value && i.label === input?.label) ?? null;
    this.writeValue$.next(match);
  }

  private selectItem(item: AutocompleteInput | null) {
    this.cmp.selected$.next(item);
    this.cmp.input = item?.label ?? '';
  }

}
