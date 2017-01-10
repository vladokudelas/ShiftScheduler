import * as moment from 'moment';
import { CalendarCell } from './calendar-cell';

export class Calendar {
    public calendar: CalendarCell[][] = [];

    constructor(calendar: CalendarCell[][]) {
        this.calendar = calendar;
    }

    public getAllDays(): CalendarCell[] {
        return this.calendar.reduce((r, w) => r.concat(w), []);
    }

    public getCellForDate(date: moment.Moment): CalendarCell {
        let result = null;
        this.calendar.forEach(w => w.forEach(d => {
            if (d.date.isSame(date)) {
                result = d;
            }
        }));

        return result;
    }
}
