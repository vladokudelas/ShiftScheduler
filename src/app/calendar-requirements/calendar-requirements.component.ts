import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppState, stateToken } from '../state';

@Component({
  selector: 'app-calendar-requirements',
  templateUrl: './calendar-requirements.component.html',
  styleUrls: ['./calendar-requirements.component.css']
})
export class CalendarRequirementsComponent implements OnInit {

  public rows: Array<any> = [];

  public columns: Array<any> = [
    { title: '', name: 'del' },
    { title: 'Den', name: 'dateDisplay', sorting: true },
    { title: 'Osoba', name: 'workUser.name' },
    { title: 'Priorita', name: 'priority' },
    { title: 'Type.', name: 'requirementType.display' }
  ];

  public config: any = {
    paging: false,
    sorting: { columns: this.columns },
    filtering: { filterString: '', columnName: 'position' }
  };

  constructor(
    @Inject(stateToken) private state: Observable<AppState>
  ) {
  }

  ngOnInit() {
    this.state.subscribe(s => {
      this.rows = s.requirements;
    });
  }

  public onCellClick(event) {
    let tmp = event;
  }
}
