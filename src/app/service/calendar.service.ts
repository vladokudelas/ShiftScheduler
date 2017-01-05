import { HourInfo } from '../model/hour-info';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observer } from 'rxjs';
import { List } from 'immutable';


import { CalendarCell, highPriority, vacationReqType, Requirement, IRequirement } from '../model';
import { DateService } from './date.service';
import { UserStore, workUserMarianaId } from './user.store';
import { Action, AddRequirementAction } from '../state';

@Injectable()
export class CalendarService {

  constructor(
    private dateService: DateService,
    private userStore: UserStore) {
  }

  public generateCalendar(month: moment.Moment): CalendarCell[][] {
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

  public generateAutoRequirements(calendar: CalendarCell[][], idHolder: any): Requirement[] {
    let result: Requirement[] = [];
    for (let week of calendar) {
      for (let day of week) {
        if (day.date.weekday() === 0 || day.date.weekday() === 1) {

          result.push(new Requirement(<IRequirement>{
            id: idHolder.id++,
            date: day.date,
            workUser: this.userStore.getById(workUserMarianaId),
            priority: highPriority,
            requirementType: vacationReqType
          }));
        }
      }
    }

    return result;
  }

  public calculateHours(calendar: CalendarCell[][], requirements: List<Requirement>): HourInfo[] {
    let result: HourInfo[] = [];
    this.userStore.getWorkers().forEach(w => {

      let hours = 0;
      calendar.forEach(week => week.forEach(d => {
        if (d.workUser && d.workUser.id && d.workUser.id === w.id) {
          hours += d.shiftHours
        }
      }));
      let vacationDays = 0;
      requirements.forEach(r => {
        if (r.workUser && r.workUser.id === w.id) {
          vacationDays += 1;
        }
      })

      result.push(new HourInfo(w, hours, vacationDays));
    });

    return result;
  }
}
