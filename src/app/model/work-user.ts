export interface IWorkUser {
    id: number;
    name: string;
    shortcut: string;
    colorCss: string;
}

export class WorkUser implements IWorkUser {
    id: number;
    name: string;
    colorCss: string;
    shortcut: string;

    constructor(props: IWorkUser) {
        this.id = props.id;
        this.name = props.name;
        this.colorCss = props.colorCss;
        this.shortcut = props.shortcut;
    }
}
