
export enum SecurityRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum Sex {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export class UserData  {
    constructor(
        public uid: string,
        public name: string|null,
        public email: string|null,
        public birthYear?: number|null,
        public sex?: Sex,
        readonly security_role = SecurityRole.USER,
    ){}
}