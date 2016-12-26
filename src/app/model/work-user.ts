import { Record } from 'immutable';

export interface IWorkUser {
    id: number;
    name: string;
}

const WorkUserRecord = Record(<IWorkUser>{
    id: undefined,
    name: undefined
});

export class WorkUser extends WorkUserRecord implements IWorkUser {
    id: number;
    name: string;

    constructor(props: IWorkUser) {
        super(props);
    }
}
