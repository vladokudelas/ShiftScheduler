import { WorkUser } from './work-user';

export class HourInfo {
    
    constructor(
        public workUser: WorkUser,
        public hours: number,
        public vacationDays: number
    ) {
    }
}
