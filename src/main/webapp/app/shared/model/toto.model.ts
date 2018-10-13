export interface IToto {
    id?: number;
    name?: string;
}

export class Toto implements IToto {
    constructor(public id?: number, public name?: string) {}
}
