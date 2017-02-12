import * as moment from 'moment';

import { Calendar, Requirement, HourInfo, workReqType, freeReqType, vacationReqType, CalendarCell } from '../model';
import { UserStore, DateService } from '../service';

export const initAppState = <AppState>{
    selectedMonth: null,
    calendar: null,
    hourInfo: [],
    requirements: null,
    workUserFilter: {}
};

export class AppState {
    public selectedMonth: moment.Moment;
    public calendar: Calendar;
    public hourInfo: HourInfo[];
    public requirements: Requirement[];
    public workUserFilter: any;

    constructor(obj?: any, userStore?: UserStore) {
        if (obj) {
            if (obj.selectedMonth) {
                this.selectedMonth = moment(obj.selectedMonth);
            }
            if (obj.requirements) {
                this.requirements = obj.requirements.map(r => {
                    return new Requirement({
                        id: r.id,
                        date: moment(r.date),
                        workUser: userStore.getById(r.workUser.id),
                        requirementType: r.requirementType.value === 1
                            ? freeReqType
                            : r.requirementType.value === 2
                                ? workReqType
                                : vacationReqType
                    });
                });
            }
            if (obj.calendar) {
                if (obj.calendar.calendar) {
                    let cells = [];
                    obj.calendar.calendar.forEach(w => {
                        let week = [];
                        w.forEach(d => {
                            let c = new CalendarCell(d.day, moment(d.date));
                            c.isHoliday = d.isHoliday;
                            c.shiftHours = d.shiftHours;
                            if (d.workUser) {
                                c.workUser = userStore.getById(d.workUser.id);
                            }
                            c.markInvalid = d.markInvalid;
                            c.invalidMessages = d.invalidMessages;
                            c.redIcon = d.redIcon;
                            c.greenIcon = d.greenIcon;
                            c.requirements = [];
                            if (d.requirements) {
                                d.requirements.forEach(dr => {
                                    let fr = this.requirements.find(r => r.id === dr.id);
                                    c.requirements.push(fr);
                                });
                            }
                            week.push(c);
                        });

                        cells.push(week);
                    });

                    this.calendar = new Calendar(cells);
                }
            }
            if (obj.hourInfo) {
                this.hourInfo = (<Array<HourInfo>>obj.hourInfo).map(hi => {
                    return new HourInfo(
                        userStore.getById(hi.workUser.id),
                        hi.hours,
                        hi.vacationDays
                    );
                });
            }
            if (obj.workUserFilter) { this.workUserFilter = obj.workUserFilter; }
        }
    }
}
