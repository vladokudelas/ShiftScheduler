import { highPriority, mediumPriority } from './model/priority';
import { Component, Inject, OnInit, AfterContentInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import * as moment from 'moment';
import { List } from 'immutable';

import { Calendar } from './model';
import { dispatcherToken, stateToken, Action, AppState } from './state';
import * as Actions from './state/actions';

import { requirementTypes, WorkUser, Requirement } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app works!';

  public calendar: Calendar = null;
  public hourInfo = [];
  public requirements = List<Requirement>();
  public workUserFilter = {};
  public selectedMonth: moment.Moment = null;
  public renderMonth = null;

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
      this.workUserFilter = s.workUserFilter;
      this.selectedMonth = s.selectedMonth;

      if (this.selectedMonth) {
        this.renderMonth = this.selectedMonth.format('YYYY-MM');
      }
    });
    this.dispatcher.next(new Actions.EmptyAction());
  }

  public generateCells(month: Date) {
    console.log(`generate cells ${month}`);

    let m = moment(new Date(month)).date(1);
    this.dispatcher.next(new Actions.GenerateCalendarAction(m));
  }

  public print() {
    $('.no-print').hide();
    window.print();
    $('.no-print').show();
  }

  public save() {
    this.dispatcher.next(new Actions.SaveAction());
  }

  public load() {
    $("#fileLoader").click();
  }

  public loadFileSelected(evt) {
    var f = evt.target.files[0];

    if (f) {
      var r = new FileReader();
      r.onload = (e) => {
        var contents = (<any>e.target).result;
        this.dispatcher.next(new Actions.LoadAction(contents));
      };
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }
}
