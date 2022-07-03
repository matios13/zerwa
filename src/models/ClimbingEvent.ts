import { ClimbingRoute } from "./ClimbigRoute";

export enum ClimbigEventType {
    BOULDER = "BOULDER",
    WALL = "WALL"
}
export type Difficulty = { difficulty: string, colour?: string };

export const getDifficultyFor = (routeType: ClimbigEventType): Difficulty[] => {
    switch (routeType) {
        case ClimbigEventType.BOULDER:
            return [
                { difficulty: "1", colour: "#ededed" },
                { difficulty: "2", colour: "#99d1cf" },
                { difficulty: "3", colour: "#2B93C7" },
                { difficulty: "4", colour: "#B6B4D9" },
                { difficulty: "5", colour: "#7A5EAF" },
                { difficulty: "6", colour: "#F4C236" },
                { difficulty: "7", colour: "#DA516A" },
                { difficulty: "8", colour: "#313235" }];
        case ClimbigEventType.WALL:
            return [
                { difficulty: "4a" },
                { difficulty: "4b" },
                { difficulty: "4c" },
                { difficulty: "5a" },
                { difficulty: "5b" },
                { difficulty: "5c" },
                { difficulty: "6a" },
                { difficulty: "6a+" },
                { difficulty: "6b" },
                { difficulty: "6b+" },
                { difficulty: "6c" },
                { difficulty: "6c+" },
                { difficulty: "7a" },
                { difficulty: "7a+" },
                { difficulty: "7b" },
                { difficulty: "7b+" },
                { difficulty: "7c" },
                { difficulty: "7c+" },
                { difficulty: "8a" },
                { difficulty: "8a+" },
                { difficulty: "8b" },
                { difficulty: "8b+" },
                { difficulty: "8c" },
                { difficulty: "8c+" },
                { difficulty: "9a" },
                { difficulty: "9a+" },
                { difficulty: "9b" },
                { difficulty: "9b+" },
                { difficulty: "9c" },
                { difficulty: "9c+" },
            ]
        default:
            return [];
    }
}
export class ClimbingEvent {
    constructor(
        public name: string,
        public startDate: number,
        public endDate: number,
        public routes: Array<ClimbingRoute>,
        public moreInfoLink?: string,
        public resultsLink?: string,
        public type: ClimbigEventType= ClimbigEventType.BOULDER,

    ) { }
}