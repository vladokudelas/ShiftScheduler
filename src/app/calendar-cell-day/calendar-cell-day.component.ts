import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-cell-day',
  templateUrl: './calendar-cell-day.component.html',
  styleUrls: ['./calendar-cell-day.component.css']
})
export class CalendarCellDayComponent implements OnInit {

  @Input()
  public day;

  constructor() { }

  ngOnInit() {
  }

}
