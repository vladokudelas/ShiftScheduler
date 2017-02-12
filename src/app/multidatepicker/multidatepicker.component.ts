import { forwardRef, Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultidatepickerComponent),
  multi: true
};

@Component({
  selector: 'multidatepicker',
  template: `<div #input>`,
  providers: [DATE_PICKER_VALUE_ACCESSOR]
})
export class MultidatepickerComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {

  @Input() value = [];
  @Output() dateChange = new EventEmitter();
  @Input() options: any = {};
  @ViewChild('input') input: ElementRef;

  private onTouched = () => { };
  private onChange: (value: string) => void = () => { };

  public writeValue(dates: Array<Date>) {
    this.value = dates;

    if (!dates) {
      this.getElement().multiDatesPicker('resetDates');
    } else {
      this.getElement().multiDatesPicker('addDates', dates);
    }
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public ngAfterViewInit() {
    this.getElement().multiDatesPicker(
      Object.assign({}, this.options, {
        firstDay: 1,
        onSelect: (value) => {
          this.value = value;

          this.onChange(value);

          this.onTouched();

          this.dateChange.next(value);
        }
      }));
  }

  public ngOnDestroy() {
    this.getElement().multiDatesPicker('destroy');
  }

  public setOptions(options: any) {
    this.getElement().multiDatesPicker(options);
  }

  public getValue(): Array<Date> {
    return this.getElement().multiDatesPicker('getDates', 'object');
  }

  private getElement(): any {
    return (<any>jQuery(this.input.nativeElement));
  }
}
