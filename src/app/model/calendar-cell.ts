import * as moment from 'moment';

import { DateService } from '../service/date.service';
import { WorkUser } from './work-user';
import { Weekdays } from './weekdays';

export class CalendarCell {

    public get dateString(): string {
        return this.date.format('D.M.YYYY');
    }

    private get isDayDefined(): boolean {
        return this.day !== undefined && this.day !== null;
    }

    public get isEditable(): boolean {
        return this.isDayDefined;
    }

    public get isFriday(): boolean {
        return this.isDayDefined && this.day === Weekdays.Friday;
    }

    public get isSunday(): boolean {
        return this.isDayDefined && this.day === Weekdays.Sunday;
    }

    public get isWeekend(): boolean {
        return this.isDayDefined && (this.day === Weekdays.Saturday || this.day === Weekdays.Sunday);
    }

    public get isWorkUserAssigned(): boolean {
        return !!this.workUser;
    }

    public get backgroundCss(): any {
        if (this.isDayDefined && this.isWorkUserAssigned) {
            let result = {};
            result[this.workUser.colorCss] = true;
            return result;
        }

        return {};
    }

    public isHoliday: boolean = false;
    public shiftHours: number = 0;
    public workUser: WorkUser = null;

    constructor(
        public day: number,
        public date: moment.Moment,
        dateService?: DateService) {

        if (dateService) {
            this.isHoliday = dateService.isHoliday(date);
            this.shiftHours = dateService.getShiftHours(date);
        }
    }
}
