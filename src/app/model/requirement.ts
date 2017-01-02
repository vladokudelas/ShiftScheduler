import { Record } from 'immutable';
import * as moment from 'moment';

import { WorkUser } from './work-user';
import { RequirementType, requirementTypes } from './requirement-type';
import { Priority, lowPriority } from './priority';

export interface IRequirement {
    id: number,
    date: moment.Moment;
    priority: Priority;
    workUser: WorkUser;
    requirementType: RequirementType;
}

const RequirementRecord = Record(<IRequirement>{
    id: 0,
    date: undefined,
    priority: lowPriority,
    workUser: undefined,
    requirementType: requirementTypes[0]
});

export class Requirement extends RequirementRecord implements IRequirement {
    id: number;
    date: moment.Moment;
    priority: Priority;
    workUser: WorkUser;
    requirementType: RequirementType;

    constructor(props: IRequirement) {
        super(props);
    }

    public get dateDisplay(): string {
        return this.date.format('DD.MM.YYYY');
    }
}
