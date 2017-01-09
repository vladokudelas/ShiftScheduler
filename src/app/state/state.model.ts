import { List } from 'immutable';
import * as moment from 'moment';

import { CalendarCell, Requirement, HourInfo } from '../model';

export const initAppState = <AppState>{
    selectedMonth: null,
    calendar: [],
    hourInfo: [],
    requirements: null
};

export interface AppState {
    selectedMonth: moment.Moment,
    calendar: CalendarCell[][];
    hourInfo: HourInfo[];
    requirements: List<Requirement>;
}
