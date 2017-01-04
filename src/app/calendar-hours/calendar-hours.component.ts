import { Component, OnInit } from '@angular/core';

import { UserStore } from '../service';

@Component({
  selector: 'app-calendar-hours',
  templateUrl: './calendar-hours.component.html',
  styleUrls: ['./calendar-hours.component.css']
})
export class CalendarHoursComponent implements OnInit {

  public rows = [];

  constructor(
    public userStore: UserStore
  ) {
  }

  ngOnInit() {
    this.userStore.getWorkers().forEach(w => {
      this.rows.push({
        workUser: w,
        hours: 0,
        vacationDays: 0
      });
    });
  }
}
