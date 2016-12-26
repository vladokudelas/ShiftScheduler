import * as moment from 'moment';

import { RequirementType, WorkUser } from '../model';

export enum ActionType {
    Empty = 0,
    GenerateCalendar = 1,
    AddRequirement = 2
}

export class BaseAction {
    constructor(public type: ActionType) { }
}

export class EmptyAction extends BaseAction {
    constructor() {
        super(ActionType.Empty);
    }
}

export class GenerateCalendarAction extends BaseAction {
    constructor(public month: moment.Moment) {
        super(ActionType.GenerateCalendar);
    }
}

export class AddRequirementAction extends BaseAction {
    constructor(
        public date: moment.Moment,
        public workUser: WorkUser,
        public priority: number,
        public requirementType: RequirementType
    ) {
        super(ActionType.AddRequirement);
    }
}

export type Action = GenerateCalendarAction
    | EmptyAction
    | AddRequirementAction;
