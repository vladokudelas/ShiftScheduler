import { highPriority, mediumPriority } from './model/priority';
import { Component, Inject, OnInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import * as moment from 'moment';
import { List } from 'immutable';

import { CalendarCell } from './model/calendar-cell';
import { dispatcherToken, stateToken, Action, AppState } from './state';
import * as Actions from './state/actions';

import { requirementTypes, WorkUser, Requirement } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app works!';

  public calendar = [];
  public hourInfo = [];
  public requirements = List<Requirement>();

  constructor(
    @Inject(dispatcherToken) private dispatcher: Observer<Action>,
    @Inject(stateToken) private state: Observable<AppState>
  ) {
  }

  public ngOnInit(): void {
    this.state.subscribe(s => {
      this.calendar = s.calendar;
      this.requirements = s.requirements;
      this.hourInfo = s.hourInfo;
    });
    this.dispatcher.next(new Actions.EmptyAction());
  }

  public generateCells(month: Date) {
    console.log(`generate cells ${month}`);

    let m = moment(new Date(month)).date(1);
    this.dispatcher.next(new Actions.GenerateCalendarAction(m));
  }
}
