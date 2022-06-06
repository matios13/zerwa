import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";
import { FirebaseConverter } from "../../firebase/firebaseConverter";
import { ClimbingEvent } from "../../models/ClimbingEvent";
export class EventFirebaseConverter extends FirebaseConverter<ClimbingEvent>{

    private convertDate(date: number | string): number {
        return typeof date == "string" ? date = Date.parse(date) : date;
    }
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): ClimbingEvent {
        let event = snapshot.data() as ClimbingEvent
        event.startDate = this.convertDate(event.startDate)
        event.endDate = this.convertDate(event.endDate)
        return event;

    }

}