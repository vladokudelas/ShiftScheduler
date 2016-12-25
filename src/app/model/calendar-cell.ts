import * as moment from 'moment';

export class CalendarCell {

    public get dateString(): string {
        return this.date.format('D.M.YYYY');
    }

    public get isWeekendOrHoliday(): boolean {
        if (!this.date) {
            return false;
        }

        return this.date.weekday() === 0 || this.date.weekday() === 6;
    }

    public get isEditable(): boolean {
        return this.day !== undefined;
    }

    constructor(public day: number, public date: moment.Moment) {
    }
}