import { List } from 'immutable';

import { CalendarCell } from '../model';

export const initAppState = <AppState>{
    calendar: []
};

export interface AppState {
    calendar: CalendarCell[];
}
