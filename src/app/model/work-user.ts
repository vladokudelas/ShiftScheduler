import { Record } from 'immutable';

export interface IWorkUser {
    id: number;
    name: string;
    colorCss: string;
}

const WorkUserRecord = Record(<IWorkUser>{
    id: undefined,
    name: undefined,
    colorCss: undefined
});

export class WorkUser extends WorkUserRecord implements IWorkUser {
    id: number;
    name: string;
    colorCss: string;

    constructor(props: IWorkUser) {
        super(props);
    }
}
