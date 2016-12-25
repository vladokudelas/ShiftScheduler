import { Component } from '@angular/core';

import * as moment from 'moment';

import {CalendarCell} from './model/calendar-cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app works!';

  calendar = [];

  public generateCells(month: Date) {
    console.log(`generate cells ${month}`);

    let m = moment(new Date(month)).date(1);
    let fridayBefore = moment(m).add(-m.day() + 1 - 3, 'day');

    this.calendar = [];
    let firstWeek = [
      new CalendarCell(undefined, moment(fridayBefore).add(-4, 'day')),
      new CalendarCell(undefined, moment(fridayBefore).add(-3, 'day')),
      new CalendarCell(undefined, moment(fridayBefore).add(-2, 'day')),
      new CalendarCell(undefined, moment(fridayBefore).add(-1, 'day')),
      new CalendarCell(5, fridayBefore),
      new CalendarCell(6, moment(fridayBefore).add(1, 'day')),
      new CalendarCell(0, moment(fridayBefore).add(2, 'day'))
    ];
    this.calendar.push(firstWeek);

    let d = moment(fridayBefore).add(3, 'day');
    let week = [];
    this.calendar.push(week);
    while (d.month() === (m.month() - 1) || d.month() === m.month()) {
      week.push(new CalendarCell(d.weekday(), moment(d)));
      d.add(1, 'day');

      if (d.weekday() === 1) {
        week = [];
        this.calendar.push(week);
      }
    }

    console.log(JSON.stringify(this.calendar, null, 2));
  }
}
