import { Record } from 'immutable';

export interface IWorkUser {
    id: number;
    name: string;
    shortcut: string;
    colorCss: string;
}

const WorkUserRecord = Record(<IWorkUser>{
    id: undefined,
    name: undefined,
    shortcut: undefined,
    colorCss: undefined
});

export class WorkUser extends WorkUserRecord implements IWorkUser {
    id: number;
    name: string;
    colorCss: string;
    shortcut: string;

    constructor(props: IWorkUser) {
        super(props);
    }
}
