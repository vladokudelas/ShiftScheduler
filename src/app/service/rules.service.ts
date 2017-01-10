import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { UserStore } from './user.store';
import { CalendarCell, Calendar, Weekdays } from '../model';

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

}
