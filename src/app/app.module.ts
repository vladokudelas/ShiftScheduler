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

import { UserStore, DateService, CalendarService, RulesService } from './service';
import { stateAndDispatcher } from './state/state';
import { CalendarRequirementsFormComponent } from './calendar-requirements-form/calendar-requirements-form.component';
import { CalendarRequirementsComponent } from './calendar-requirements/calendar-requirements.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PopoverModule } from 'ng2-popover';
import { CalendarFilterComponent } from './calendar-filter/calendar-filter.component';
import { MultidatepickerComponent } from './multidatepicker/multidatepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarFormComponent,
    CalendarCellComponent,
    CalendarCellDayComponent,
    CalendarHoursComponent,
    CalendarRequirementsFormComponent,
    CalendarRequirementsComponent,
    CalendarFilterComponent,
    MultidatepickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    PopoverModule
  ],
  providers: [
    UserStore,
    DateService,
    CalendarService,
    RulesService,
    stateAndDispatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
