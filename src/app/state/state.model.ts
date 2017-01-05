import { List } from 'immutable';

import { CalendarCell, Requirement, HourInfo } from '../model';

export const initAppState = <AppState>{
    calendar: [],
    hourInfo: [],
    requirements: null
};

export interface AppState {
    calendar: CalendarCell[][];
    hourInfo: HourInfo[];
    requirements: List<Requirement>;
}
