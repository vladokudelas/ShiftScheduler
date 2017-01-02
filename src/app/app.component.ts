import { highPriority, mediumPriority } from './model/priority';
import { Component, Inject, OnInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import * as moment from 'moment';

import { CalendarCell } from './model/calendar-cell';
import { dispatcherToken, stateToken, Action, AppState } from './state';
import * as Actions from './state/actions';

import { requirementTypes, WorkUser } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app works!';

  public calendar = [];

  constructor(
    @Inject(dispatcherToken) private dispatcher: Observer<Action>,
    @Inject(stateToken) private state: Observable<AppState>
  ) {
  }

  public ngOnInit(): void {
    this.state.subscribe(s => {
      this.calendar = s.calendar;
    });
    this.dispatcher.next(new Actions.EmptyAction());

    this.dispatcher.next(new Actions.AddRequirementAction(
      moment(),
      new WorkUser({ id: 4, name: 'Mariana' }),
      mediumPriority,
      requirementTypes[0]));
    this.dispatcher.next(new Actions.AddRequirementAction(
      moment().add(7, 'day'),
      new WorkUser({ id: 1, name: 'Kacenka' }),
      highPriority,
      requirementTypes[1]));
  }

  public generateCells(month: Date) {
    console.log(`generate cells ${month}`);

    let m = moment(new Date(month)).date(1);
    this.dispatcher.next(new Actions.GenerateCalendarAction(m));
  }
}
