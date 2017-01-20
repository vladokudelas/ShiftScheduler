import { Action, ChangeShiftHoursAction, ChangeWorkUserAction } from '../state/actions';
import { Observer } from 'rxjs/Rx';
import { dispatcherToken } from '../state';
import { Component, Inject, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { CalendarCell } from '../model/calendar-cell';

import { UserStore, DateService } from '../service';
import { WorkUser, Requirement, vacationReqType } from '../model';
import { RemoveRequirementAction } from '../state';

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

  public workUsers: WorkUser[] = [];

  constructor(
    public userStore: UserStore,
    public dateService: DateService,
    @Inject(dispatcherToken) private dispatcher: Observer<Action>) {
  }

  public ngOnInit() {
    this.workUsers = this.userStore.getWorkers();
  }

  public removeRequirement(id: number) {
    this.dispatcher.next(new RemoveRequirementAction(id));
  }

  public setWorkUser(workUserIdStr: string) {
    let workUserId = Number(workUserIdStr);
    this.dispatcher.next(new ChangeWorkUserAction(this.day, workUserId));
  }

  public setShiftHours(shiftHoursStr: string) {
    let shiftHours = Number(shiftHoursStr);
    this.dispatcher.next(new ChangeShiftHoursAction(this.day, shiftHours));
  }
}
