import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc } from "@firebase/firestore"
import { ClimbingEvent } from "../../models/ClimbingEvent"
import { dateFromNumber } from "../time/TimeService"
import { EventFirebaseConverter } from "./EventFirebaseConverter"

const climbingEvents = collection(getFirestore(), "climbingEvents").withConverter(new EventFirebaseConverter())

export const listAllEvents = async (): Promise<ClimbingEvent[]> => {
    var documents = await getDocs(query(climbingEvents, orderBy("startDate", "desc")))
    return documents.docs.map(document => document.data())
}
export const findEventWithName = async (name: string): Promise<ClimbingEvent | null> => {
    const documentRef = doc(climbingEvents, name);
    const document = await getDoc(documentRef);
    if (document.exists()) {
        return document.data()
    } else {
        return null;
    }
}

export const updateEvent = async (climbingEvent: ClimbingEvent): Promise<void> => {
    const event = await findEventWithName(climbingEvent.name);
    if (event) {
        const documentRef = doc(climbingEvents, climbingEvent.name)
        return setDoc(documentRef, climbingEvent)
    } else {
        throw new Error(`Wydarzenie o nazwie ${climbingEvent.name} nie istnieje`);
    }
}
export const createNewEvent = async (climbingEvent: ClimbingEvent): Promise<void> => {
    const event = await findEventWithName(climbingEvent.name);
    if (!event) {
        const documentRef = doc(climbingEvents, climbingEvent.name)
        return setDoc(documentRef, climbingEvent)
    } else {
        throw new Error(`Wydarzenie o nazwie ${event.name} już istnieje, rozpoczyna się ${dateFromNumber(event.startDate)} i kończy ${dateFromNumber(event.endDate)}`);
    }
}