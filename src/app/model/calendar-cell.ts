import * as moment from 'moment';

import { DateService } from '../service/date.service';

export class CalendarCell {

    public get dateString(): string {
        return this.date.format('D.M.YYYY');
    }

    public get isEditable(): boolean {
        return this.day !== undefined;
    }

    public isWeekend: boolean = false;
    public isHoliday: boolean = false;
    public shiftHours: number = 0;

    constructor(
        public day: number,
        public date: moment.Moment,
        dateService?: DateService) {

        if (dateService) {
            this.isWeekend = dateService.isWeekend(date);
            this.isHoliday = dateService.isHoliday(date);
            this.shiftHours = dateService.getShiftHours(date);
        }
    }
}
