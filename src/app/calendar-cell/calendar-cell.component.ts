import { Component, OnInit, Input } from '@angular/core';
import { List } from 'immutable';
import * as moment from 'moment';

import { CalendarCell } from '../model/calendar-cell';

import { UserStore, DateService } from '../service';
import { WorkUser, Requirement } from '../model';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.css']
})
export class CalendarCellComponent implements OnInit {

  @Input()
  public day: CalendarCell = new CalendarCell(undefined, undefined);

  @Input()
  private requirements: Requirement[] = [];

  public workUsers: List<WorkUser> = List<WorkUser>();

  constructor(
    public userStore: UserStore,
    public dateService: DateService) {
  }

  public ngOnInit() {
    this.workUsers = this.userStore.getWorkers();

    this.requirements.forEach(r => {
      if (r.date.isSame(this.day.date, 'day')) {
        let idx = this.workUsers.findIndex(w => w.id === r.workUser.id);
        if (idx > 0) {
          this.workUsers = this.workUsers.remove(idx)
        }
      }
    });
  }

  public setWorkUser(workUserIdStr: string) {
    let workUserId = Number(workUserIdStr);
    if (workUserId > 0) {
      this.day.workUser = this.userStore.getById(workUserId);
    } else {
      this.day.workUser = undefined;
    }
  }
}
