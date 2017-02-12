import * as moment from 'moment';

import { WorkUser } from './work-user';
import { RequirementType, requirementTypes } from './requirement-type';

export interface IRequirement {
    id: number;
    date: moment.Moment;
    workUser: WorkUser;
    requirementType: RequirementType;
}

export class Requirement implements IRequirement {
    id: number;
    date: moment.Moment;
    workUser: WorkUser;
    requirementType: RequirementType;

    constructor(props: IRequirement) {
        this.id = props.id;
        this.date = props.date;
        this.workUser = props.workUser;
        this.requirementType = props.requirementType;
    }

    public get dateDisplay(): string {
        return this.date.format('DD.MM.YYYY');
    }
}
