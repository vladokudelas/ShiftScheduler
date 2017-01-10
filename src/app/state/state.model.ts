import { List } from 'immutable';
import * as moment from 'moment';

import { Calendar, Requirement, HourInfo } from '../model';

export const initAppState = <AppState>{
    selectedMonth: null,
    calendar: null,
    hourInfo: [],
    requirements: null
};

export interface AppState {
    selectedMonth: moment.Moment;
    calendar: Calendar;
    hourInfo: HourInfo[];
    requirements: List<Requirement>;
}
