import { HourInfo } from '../model/hour-info';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observer } from 'rxjs';
import { List } from 'immutable';


import { CalendarCell, Calendar, highPriority, vacationReqType, Requirement, IRequirement, Weekdays } from '../model';
import { DateService } from './date.service';
import { UserStore, workUserMarianaId } from './user.store';
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

      if (d.weekday() === Weekdays.Monday) {
        week = [];
        result.push(week);
      }
    }

    console.log(JSON.stringify(result, null, 2));
    return new Calendar(result);
  }

  public generateAutoRequirements(selectedMonth: moment.Moment, calendar: Calendar, idHolder: any, existingRequirements: List<Requirement>): Requirement[] {
    let result: Requirement[] = [];
    calendar.getAllDays().forEach(d => {
      // Rule for mariana Sunday and Monday free
      if (selectedMonth && d.date.month() === selectedMonth.month() && (d.isSunday || d.day === Weekdays.Monday)) {

        let isFound = false;
        existingRequirements.forEach(r => {
          isFound = isFound || (r.workUser.id === workUserMarianaId && r.date.isSame(d.date, 'day'))
        });

        if (!isFound) {
          result.push(new Requirement(<IRequirement>{
            id: idHolder.id++,
            date: d.date,
            workUser: this.userStore.getById(workUserMarianaId),
            priority: highPriority,
            requirementType: vacationReqType
          }));
        }
      }
    });

    return result;
  }

  public calculateHours(selectedMonth: moment.Moment, calendar: Calendar, requirements: List<Requirement>): HourInfo[] {
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

  public setRequirementsInCalendar(selectedMonth: moment.Moment, calendar: Calendar, requirements: List<Requirement>): Calendar {
    calendar.getAllDays().forEach(d => d.requirements = null);
    let calendarMap = calendar.getMap();
    requirements.forEach(r => {
      if (r.date.month() === selectedMonth.month()) {
        let dateStr = r.date.format(CalendarCell.DateStringFormat);
        if (calendarMap.hasOwnProperty(dateStr)) {
          calendarMap[dateStr].requirements = calendarMap[dateStr].requirements || [];
          calendarMap[dateStr].requirements.push(r);
        } else {
          console.error(`Not found date in calendar for requirement ${dateStr}`);
        }
      }
    });

    return calendar;
  }
}
