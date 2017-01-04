
export interface Priority {
    value: number;
    display: string;
}

export const lowPriority = <Priority>{ value: 1, display: 'Low' };
export const mediumPriority = <Priority>{ value: 2, display: 'Medium' };
export const highPriority = <Priority>{ value: 3, display: 'High' };

export const priorities = [
    lowPriority,
    mediumPriority,
    highPriority
];