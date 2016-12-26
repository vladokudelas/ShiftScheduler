import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  private holidays: moment.Moment[] = [
    moment(new Date(2017, 0, 1)),
    moment(new Date(2017, 3, 14)),
    moment(new Date(2017, 3, 17)),
    moment(new Date(2017, 4, 1)),
    moment(new Date(2017, 4, 8)),
    moment(new Date(2017, 6, 5)),
    moment(new Date(2017, 6, 6)),
    moment(new Date(2017, 8, 28)),
    moment(new Date(2017, 9, 28)),
    moment(new Date(2017, 10, 17)),
    moment(new Date(2017, 11, 24)),
    moment(new Date(2017, 11, 25)),
    moment(new Date(2017, 11, 26))
  ];

  constructor() {
  }

  public isWeekendOrHoliday(date: moment.Moment): boolean {
    return this.isWeekend(date) || this.isHoliday(date);
  }

  public isWeekend(date: moment.Moment): boolean {
    return date.weekday() === 6 || date.weekday() === 0;
  }

  public isHoliday(date: moment.Moment): boolean {
    return this.holidays.filter(h => h.isSame(date, 'day')).length > 0;
  }

  // tyzden 17.5
  // piatok 15.5
  // sobota 26
  // nedela 27
  public getShiftHours(date: moment.Moment): number {
    return 2;
  }
}
