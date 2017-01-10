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

  public isHoliday(date: moment.Moment): boolean {
    return this.holidays.filter(h => h.isSame(date, 'day')).length > 0;
  }

  // tyzden 17.5
  // piatok 15.5
  // sobota 28
  // nedela 26
  public getShiftHours(date: moment.Moment): number {
    // let isFriday = date.weekday() === 5;
    // let tomorrow = moment(date).add(1, 'day');
    // let isHolidayToday = this.isHoliday(date);
    // let isHolidayTomorrow = this.isHoliday(tomorrow);
    // let isWeekendToday = this.isWeekend(date);
    // let isWeekendTomorrow = this.isWeekend(tomorrow);

    switch (date.weekday()) {
      case 5: // Friday
        return 15.5;
      case 6: // Saturday
        return 28;
      case 0: // Sunday
        return 26;
      default:
        return 17.5; // workday
    }
  }
}
