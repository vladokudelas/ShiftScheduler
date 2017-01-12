import { Component, OnInit, Inject } from '@angular/core';
import { List } from 'immutable';
import { Observer, Observable } from 'rxjs';

import { UserStore } from '../service';
import { WorkUser } from '../model';
import { dispatcherToken, Action, ToggleWorkUserFilterAction } from '../state';

@Component({
  selector: 'app-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.css']
})
export class CalendarFilterComponent implements OnInit {

  public workUsers: List<WorkUser> = List<WorkUser>();

  constructor(
    public userStore: UserStore,
    @Inject(dispatcherToken) private dispatcher: Observer<Action>
  ) {

  }

  public ngOnInit() {
    this.workUsers = this.userStore.getWorkers();
  }

  public workUserClicked(workUser: WorkUser, checked: boolean) {
    this.dispatcher.next(new ToggleWorkUserFilterAction(workUser));
  }
}