import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CalendarCell } from '../model';
import { DateService } from './date.service';

@Injectable()
export class CalendarService {

  constructor(private dateService: DateService) {
  }

  public generateCalendar(month: moment.Moment): CalendarCell[] {
    let fridayBefore = moment(month).add(-month.day() + 1 - 3, 'day');

    let result = [];
    let firstWeek = [
      new CalendarCell(undefined, moment(fridayBefore).add(-4, 'day'), this.dateService),
      new CalendarCell(undefined, moment(fridayBefore).add(-3, 'day'), this.dateService),
      new CalendarCell(undefined, moment(fridayBefore).add(-2, 'day'), this.dateService),
      new CalendarCell(undefined, moment(fridayBefore).add(-1, 'day'), this.dateService),
      new CalendarCell(5, fridayBefore, this.dateService),
      new CalendarCell(6, moment(fridayBefore).add(1, 'day'), this.dateService),
      new CalendarCell(0, moment(fridayBefore).add(2, 'day'), this.dateService)
    ];
    result.push(firstWeek);

    let d = moment(fridayBefore).add(3, 'day');
    let week = [];
    result.push(week);
    while (d.month() === (month.month() - 1) || d.month() === month.month()) {
      week.push(new CalendarCell(d.weekday(), moment(d), this.dateService));
      d.add(1, 'day');

      if (d.weekday() === 1) {
        week = [];
        result.push(week);
      }
    }

    console.log(JSON.stringify(result, null, 2));
    return result;
  }
}
