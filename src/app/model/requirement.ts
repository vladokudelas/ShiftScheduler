import * as moment from 'moment';

import { WorkUser } from './work-user';
import { RequirementType, requirementTypes } from './requirement-type';
import { Priority, lowPriority } from './priority';

export interface IRequirement {
    id: number;
    date: moment.Moment;
    priority: Priority;
    workUser: WorkUser;
    requirementType: RequirementType;
}

export class Requirement implements IRequirement {
    id: number;
    date: moment.Moment;
    priority: Priority;
    workUser: WorkUser;
    requirementType: RequirementType;

    constructor(props: IRequirement) {
        this.id = props.id;
        this.date = props.date;
        this.priority = props.priority;
        this.workUser = props.workUser;
        this.requirementType = props.requirementType;
    }

    public get dateDisplay(): string {
        return this.date.format('DD.MM.YYYY');
    }
}
