import { HourInfo } from '../model/hour-info';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observer } from 'rxjs';


import { CalendarCell, Calendar, vacationReqType, Requirement, IRequirement, Weekdays } from '../model';
import { DateService } from './date.service';
import { UserStore } from './user.store';
import { Action, AddRequirementAction } from '../state';

@Injectable()
export class CalendarService {

  constructor(
    private dateService: DateService,
    private userStore: UserStore) {
  }

  public generateCalendar(month: moment.Moment): Calendar {
    let fridayBefore = moment(month).add(-month.day() + 1 - 3, 'day');

    let result = [];
    let firstWeek = [
      new CalendarCell(undefined, moment(fridayBefore).add(-4, 'day'), month, this.dateService),
      new CalendarCell(undefined, moment(fridayBefore).add(-3, 'day'), month, this.dateService),
      new CalendarCell(undefined, moment(fridayBefore).add(-2, 'day'), month, this.dateService),
      new CalendarCell(undefined, moment(fridayBefore).add(-1, 'day'), month, this.dateService),
      new CalendarCell(5, fridayBefore, month, this.dateService),
      new CalendarCell(6, moment(fridayBefore).add(1, 'day'), month, this.dateService),
      new CalendarCell(0, moment(fridayBefore).add(2, 'day'), month, this.dateService)
    ];
    result.push(firstWeek);

    let d = moment(fridayBefore).add(3, 'day');
    let week = [];
    result.push(week);
    while (d.month() === (month.month() - 1) || d.month() === month.month()) {
      week.push(new CalendarCell(d.weekday(), moment(d), month, this.dateService));
      d.add(1, 'day');

      if (d.weekday() === Weekdays.Monday) {
        week = [];
        result.push(week);
      }
    }

    console.log(JSON.stringify(result, null, 2));
    return new Calendar(result);
  }

  public generateAutoRequirements(selectedMonth: moment.Moment, calendar: Calendar, idHolder: any, existingRequirements: Requirement[]): Requirement[] {
    let result: Requirement[] = [];

    if (calendar) {
      calendar.getAllDays().forEach(d => {
        
      });
    }

    return result;
  }

  public calculateHours(selectedMonth: moment.Moment, calendar: Calendar, requirements: Requirement[]): HourInfo[] {
    let result: HourInfo[] = [];
    this.userStore.getWorkers().forEach(w => {

      let days = calendar.getAllDays();
      let hours = days.reduce((r, d) => {
        if (d.workUser && d.workUser.id && d.workUser.id === w.id && selectedMonth.month() === d.date.month()) {
          r += d.shiftHours;
        }

        return r;
      }, 0);

      let vacationDays = requirements.reduce((res, req) => {
        if (req.workUser && req.workUser.id === w.id && (!selectedMonth || selectedMonth.month() === req.date.month())) {
          res += 1;
        }

        return res;
      }, 0);

      result.push(new HourInfo(w, hours, vacationDays));
    });

    return result;
  }

  public setRequirementsInCalendar(selectedMonth: moment.Moment, calendar: Calendar, requirements: Requirement[]): Calendar {
    if (calendar) {
      calendar.getAllDays().forEach(d => d.requirements = null);
      let calendarMap = calendar.getMap();
      requirements.forEach(r => {
        if (r.date.month() === selectedMonth.month()) {
          let dateStr = r.date.format(CalendarCell.DateStringFormat);
          if (calendarMap.hasOwnProperty(dateStr)) {
            calendarMap[dateStr].requirements = calendarMap[dateStr].requirements || [];
            calendarMap[dateStr].requirements.push(r);

            calendarMap[dateStr].redIcon = true;
            calendarMap[dateStr].greenIcon = true;
          } else {
            console.error(`Not found date in calendar for requirement ${dateStr}`);
          }
        }
      });
    }

    return calendar;
  }
}
