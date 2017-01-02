import { Record } from 'immutable';
import * as moment from 'moment';

import { WorkUser } from './work-user';
import { RequirementType, requirementTypes } from './requirement-type';

export interface IRequirement {
    date: moment.Moment;
    priority: number;
    workUser: WorkUser;
    requirementType: RequirementType;
}

const RequirementRecord = Record(<IRequirement>{
    date: undefined,
    priority: 0,
    workUser: undefined,
    requirementType: requirementTypes[0]
});

export class Requirement extends RequirementRecord implements IRequirement {
    date: moment.Moment;
    priority: number;
    workUser: WorkUser;
    requirementType: RequirementType;

    constructor(props: IRequirement) {
        super(props);
    }

    public get dateDisplay(): string {
        return this.date.format('DD.MM.YYYY');
    }

    public get priorityDisplay(): string {
        switch (this.priority) {
            case 1:
                return 'Low';
            case 2:
                return 'Medium';
            case 3:
                return 'High';
        }

        return 'Unknown';
    }

    public get del(): string {
        return 'Remove';
    }
}
