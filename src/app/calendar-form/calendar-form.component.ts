import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html'
})
export class CalendarFormComponent implements OnInit {

  public month: Date;

  @Output()
  public generateCells = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }
}
