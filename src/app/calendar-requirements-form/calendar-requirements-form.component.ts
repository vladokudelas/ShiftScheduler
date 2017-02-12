import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { Observer } from 'rxjs';
import * as moment from 'moment';

import { MultidatepickerComponent } from '../multidatepicker/multidatepicker.component';
import { UserStore } from '../service';
import { WorkUser, requirementTypes, RequirementType } from '../model';
import { Action, dispatcherToken, AddRequirementAction } from '../state';

@Component({
  selector: 'app-calendar-requirements-form',
  templateUrl: './calendar-requirements-form.component.html',
  styleUrls: ['./calendar-requirements-form.component.css']
})
export class CalendarRequirementsFormComponent implements OnInit {

  public workUsers: WorkUser[] = [];

  public workUser: WorkUser;
  public requirementType: RequirementType = requirementTypes[0];
  public _requirementTypes = requirementTypes;

  @Input() public selectedMonth: moment.Moment;
  @ViewChild('multiDatePicker') multiDatePicker: MultidatepickerComponent;

  constructor(
    public userStore: UserStore,
    @Inject(dispatcherToken) private dispatcher: Observer<Action>
  ) {
  }

  public ngOnInit() {
    this.workUsers = this.userStore.getWorkers();
  }

  public setWorkUser(workUserId: string) {
    if (workUserId === '0') {
      this.workUser = undefined;
    }

    this.workUser = this.workUsers.find(d => (d.id + '') === workUserId);
  }

  public setRequirementType(typeValue: string) {
    let type = typeValue + '';
    if (type === '1') {
      this.requirementType = requirementTypes[0];
    } else if (type === '2') {
      this.requirementType = requirementTypes[1];
    } else {
      this.requirementType = requirementTypes[2];
    }
  }

  public isDateSelected(): boolean {
    return this.multiDatePicker.getValue() && this.multiDatePicker.getValue().length > 0;
  }

  public addRequirement() {
    const dates = [];
    this.multiDatePicker.getValue().forEach(d => dates.push(moment(d)));

    this.dispatcher.next(new AddRequirementAction(dates, this.workUser, this.requirementType));
    this.reset();
  }

  private reset() {
    this.multiDatePicker.writeValue(undefined);
    this.requirementType = requirementTypes[0];
    this.workUser = undefined;
  }
}
