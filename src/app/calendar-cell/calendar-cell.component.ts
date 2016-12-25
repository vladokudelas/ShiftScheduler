import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { CalendarCell } from '../model/calendar-cell';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.css']
})
export class CalendarCellComponent implements OnInit {

  @Input()
  public day: CalendarCell = new CalendarCell(undefined, undefined);

  constructor() {
  }

  ngOnInit() {
  }
}
