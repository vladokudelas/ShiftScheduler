
export interface RequirementType {
    value: number;
    display: string;
}

export const requirementTypes = [
    <RequirementType>{ value: 1, display: 'Free' },
    <RequirementType>{ value: 2, display: 'Work' }
];
