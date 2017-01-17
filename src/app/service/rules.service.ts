import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { List } from 'immutable';

import { UserStore } from './user.store';
import { CalendarCell, Calendar, Weekdays, Requirement, workReqType, vacationReqType, freeReqType } from '../model';

@Injectable()
export class RulesService {

  constructor(
    private userStore: UserStore
  ) {

  }

  public setWorkUserToCell(workUserId: number, cell: CalendarCell, calendar: Calendar) {
    if (workUserId > 0) {
      cell.workUser = this.userStore.getById(workUserId);
      if (cell.isFriday || cell.isSunday) {
        let dateToAssign = null;
        if (cell.isSunday) {
          dateToAssign = moment(cell.date).add(-2, 'day');
        }

        if (cell.isFriday) {
          dateToAssign = moment(cell.date).add(2, 'day');
        }

        dateToAssign = dateToAssign.month() === cell.date.month() ? dateToAssign : null;
        if (dateToAssign) {
          let cellToAssign = calendar.getCellForDate(dateToAssign);
          if (cellToAssign && !cellToAssign.isWorkUserAssigned) {
            cellToAssign.workUser = cell.workUser;
          }
        }
      }
    } else {
      cell.workUser = undefined;
    }
  }

  public assignWorkUsersAccordingToRequirements(calendar: Calendar, requirements: List<Requirement>) {
    requirements.forEach(r => {
      if (r.requirementType.value === workReqType.value) {
        let day = calendar.getCellForDate(r.date);
        if (day && day.isEditable) {
          day.workUser = r.workUser;
        }
      }
    });
  }

  public checkCalendarCellValidity(selectedMonth: moment.Moment, calendar: Calendar): Calendar {

    calendar.getAllDays().forEach(d => {
      d.invalidMessages = null;
      d.markInvalid = false;
      d.redIcon = false;
      d.greenIcon = false;

      if (d.isEditable && d.requirements && d.isWorkUserAssigned) {
        d.requirements.forEach(r => {
          // Check vacation requirements
          if (r.requirementType.value === vacationReqType.value && r.workUser.id === d.workUser.id) {
            d.markInvalid = true;
            d.invalidMessages = d.invalidMessages || [];
            d.invalidMessages.push(`${r.workUser.name} ma pozadavek ${r.requirementType.display}`);
          }
          // Check work requirement is fulfilled 
          if (r.requirementType.value === workReqType.value && r.workUser.id === d.workUser.id) {
            d.greenIcon = true;
          }
          // Check free requirement has collision
          if (r.requirementType.value === freeReqType.value && r.workUser.id === d.workUser.id) {
            d.redIcon = true;
            d.invalidMessages = d.invalidMessages || [];
            d.invalidMessages.push(`${r.workUser.name} ma pozadavek ${r.requirementType.display}`);
          }
        });
      }
    });

    return calendar;
  }
}
