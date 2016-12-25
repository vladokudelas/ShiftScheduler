import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input()
  public calendar = [];
  public days = ['Pondelok', 'Utorok', 'Streda', 'Stvrtok', 'Piatok', 'Sobota', 'Nedela'];

  constructor() { }

  ngOnInit() {
  }

}
