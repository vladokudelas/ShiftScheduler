import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html'
})
export class CalendarFormComponent implements OnInit {

  @Input()
  public month: Date;

  @Output()
  public generateCells = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }
}
