import { Component, OnInit, Inject } from '@angular/core';
import { Observer } from 'rxjs';
import * as moment from 'moment';

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

  public date;
  public workUser: WorkUser;
  public requirementType: RequirementType = requirementTypes[0];
  public _requirementTypes = requirementTypes;

  constructor(
    public userStore: UserStore,
    @Inject(dispatcherToken) private dispatcher: Observer<Action>
  ) {
  }

  ngOnInit() {
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

  public addRequirement() {
    this.dispatcher.next(new AddRequirementAction(moment(this.date), this.workUser, this.requirementType));
    this.reset();
  }

  private reset() {
    this.date = undefined;
    this.requirementType = requirementTypes[0];
    this.workUser = undefined;
  }
}
