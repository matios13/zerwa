export enum UserRouteStatus {
    NOTHING = "NOTHING",
    DONE = "DONE",
    LATER = "LATER",
    NEVER = "NEVER",
}
type StatusLabelAndColour = {
    status: UserRouteStatus,
    label: string,
    color: string,
}

export const getAllUserRouteStatus = (): StatusLabelAndColour[] => {
    return [
        {
            status: UserRouteStatus.NOTHING,
            label: "Nie wykonano",
            color: "white",
        },
        {
            status: UserRouteStatus.DONE,
            label: "Zrobione",
            color: "#81b29a",
        },
        {
            status: UserRouteStatus.LATER,
            label: "Na później",
            color: "#f2cc8f",
        },
        {
            status: UserRouteStatus.NEVER,
            label: "Raczej nigdy",
            color: "#e07a5f",
        },
    ]
}
export type UserClimbingRoute = {
    id: number,
    status: UserRouteStatus,
}

export class UserClimbingEvent {
    constructor(
        public eventId: string,
        public climbingRoutes: UserClimbingRoute[] = [],
        public sumOfPoints: number = 0,
    ) { }
}