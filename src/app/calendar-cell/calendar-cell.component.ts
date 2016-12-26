import { Component, OnInit, Input } from '@angular/core';
import { List } from 'immutable';
import * as moment from 'moment';

import { CalendarCell } from '../model/calendar-cell';

import { UserStore, DateService } from '../service';
import { WorkUser } from '../model';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.css']
})
export class CalendarCellComponent implements OnInit {

  @Input()
  public day: CalendarCell = new CalendarCell(undefined, undefined);

  public workUsers: List<WorkUser> = List<WorkUser>();

  constructor(
    public userStore: UserStore,
    public dateService: DateService) {
  }

  ngOnInit() {
    this.workUsers = this.userStore.getWorkers();
  }
}
