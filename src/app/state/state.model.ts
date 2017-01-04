import { List } from 'immutable';

import { CalendarCell, Requirement } from '../model';

export const initAppState = <AppState>{
    calendar: [],
    requirements: null
};

export interface AppState {
    calendar: CalendarCell[][];
    requirements: List<Requirement>;
}
