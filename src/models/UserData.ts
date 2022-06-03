
export enum SecurityRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
export class UserData  {
    constructor(
        public uid: string,
        public name: string|null,
        public email: string|null,
        readonly security_role = SecurityRole.USER,
    ){}
}