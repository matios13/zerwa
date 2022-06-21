
export enum SecurityRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum Sex {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export const getSexAsLetter = (sex: Sex | undefined) => {
    switch (sex) {
        case Sex.FEMALE: return "K"
        case Sex.MALE: return "M"
        default: return "brak danych"
    }
}

export class UserData {
    constructor(
        public uid: string,
        public name?: string,
        public email?: string,
        public birthYear: number = 0,
        public sex?: Sex,
        public eventIds: string[] = [],
        readonly security_role = SecurityRole.USER
    ) { }

}