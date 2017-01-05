import { Component, Input } from '@angular/core';

import { UserStore } from '../service';

@Component({
  selector: 'app-calendar-hours',
  templateUrl: './calendar-hours.component.html',
  styleUrls: ['./calendar-hours.component.css']
})
export class CalendarHoursComponent {

  @Input()
  public hourInfo = [];

  constructor(
    public userStore: UserStore
  ) {
  }
}
