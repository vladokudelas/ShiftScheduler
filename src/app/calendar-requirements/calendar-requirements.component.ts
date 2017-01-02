import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { AppState, stateToken, dispatcherToken, Action, RemoveRequirementAction } from '../state';
import { Requirement } from '../model';

@Component({
  selector: 'app-calendar-requirements',
  templateUrl: './calendar-requirements.component.html',
  styleUrls: ['./calendar-requirements.component.css']
})
export class CalendarRequirementsComponent implements OnInit {

  public rows: Array<Requirement> = [];

  constructor(
    @Inject(stateToken) private state: Observable<AppState>,
    @Inject(dispatcherToken) private dispatcher: Observer<Action>
  ) {
  }

  ngOnInit() {
    this.state.subscribe(s => {
      this.rows = s.requirements.toArray();
    });
  }

  public removeRequirement(id: number) {
    this.dispatcher.next(new RemoveRequirementAction(id));
  }
}
