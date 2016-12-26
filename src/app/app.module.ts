import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { CalendarCellDayComponent } from './calendar-cell-day/calendar-cell-day.component';
import { CalendarHoursComponent } from './calendar-hours/calendar-hours.component';

import { UserStore, DateService, CalendarService } from './service';
import { stateAndDispatcher } from './state/state';
import { CalendarRequirementsFormComponent } from './calendar-requirements-form/calendar-requirements-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarFormComponent,
    CalendarCellComponent,
    CalendarCellDayComponent,
    CalendarHoursComponent,
    CalendarRequirementsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UserStore,
    DateService,
    CalendarService,
    stateAndDispatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
