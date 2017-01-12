import { Component, OnInit, Input } from '@angular/core';

import { CalendarCell } from '../model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input()
  public requirements;

  @Input()
  public calendar = null;

  @Input()
  public workUserFilter = {};

  public days = ['Pondelok', 'Utorok', 'Streda', 'Stvrtok', 'Piatok', 'Sobota', 'Nedela'];

  public get isEmpty(): boolean {
    return !this.calendar || this.calendar.calendar.length === 0;
  }

  constructor() { }

  public ngOnInit() {
  }

  public getCellClass(day: CalendarCell) {
    if (Object.getOwnPropertyNames(this.workUserFilter).length === 0) {
      return { opac: false };
    }

    return {
      opac: day.isEditable && day.isWorkUserAssigned && !this.workUserFilter.hasOwnProperty(day.workUser.id)
    };
  }

}
