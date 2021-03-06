
export interface RequirementType {
    value: number;
    display: string;
}

export const freeReqType = <RequirementType>{ value: 1, display: 'Free' };
export const workReqType = <RequirementType>{ value: 2, display: 'Work' };
export const vacationReqType = <RequirementType>{ value: 3, display: 'Vacation' };

export const requirementTypes = [
    freeReqType,
    workReqType,
    vacationReqType
];
