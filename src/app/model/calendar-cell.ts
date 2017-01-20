import * as moment from 'moment';

import { DateService } from '../service/date.service';
import { WorkUser } from './work-user';
import { Weekdays } from './weekdays';
import { Requirement } from './requirement';

export class CalendarCell {

    public static DateStringFormat = 'D.M.YYYY';

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

    public get requirementsString(): string {
        if (this.requirements) {
            return this.requirements.reduce((res, req) => {
                if (res.indexOf(req.workUser.shortcut) < 0) {
                    if (res.length > 0) {
                        res += ', ';
                    }

                    res += req.workUser.shortcut;
                }

                return res;
            }, '');
        }

        return null;
    }

    public get cssClass(): any {
        return {
            weekend: this.isWeekend,
            holiday: this.isHoliday,
            invalid: this.markInvalid
        };
    }

    public isHoliday: boolean = false;
    public shiftHours: number = 0;
    public workUser: WorkUser = null;
    public requirements: Requirement[] = [];

    public markInvalid: boolean;
    public invalidMessages: string[] = null;
    public redIcon: boolean;
    public greenIcon: boolean;

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
