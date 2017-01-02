import { List } from 'immutable';

import { CalendarCell, Requirement } from '../model';

export const initAppState = <AppState>{
    calendar: [],
    requirements: []
};

export interface AppState {
    calendar: CalendarCell[];
    requirements: Requirement[];
}
