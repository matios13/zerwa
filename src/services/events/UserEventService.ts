import { doc, DocumentReference, getDoc, getFirestore, setDoc } from "@firebase/firestore"
import { FirebaseConverter } from "../../firebase/firebaseConverter"
import { UserClimbingEvent } from "../../models/UserClimbingEvent"

const converter = new FirebaseConverter<UserClimbingEvent>()


const getDocumentReference = (eventId: string, userId: string): DocumentReference<UserClimbingEvent> => doc(getFirestore(), `users/${userId}/userEvents/${eventId}`).withConverter(converter)

export const findUserEventWithId = async (id: string, userId: string): Promise<UserClimbingEvent | null> => {

    const documentRef = getDocumentReference(id, userId)
    const document = await getDoc(documentRef);
    if (document.exists()) {
        return document.data()
    } else {
        return null;
    }
}

export const updateUserEvent = async (userClimbingEvent: UserClimbingEvent, uid: string): Promise<void> => {
    const event = await findUserEventWithId(userClimbingEvent.eventId, uid);
    if (event) {
        const documentRef = getDocumentReference(userClimbingEvent.eventId, uid);
        return setDoc(documentRef, userClimbingEvent)
    } else {
        throw new Error(`Wydarzenie o nazwie ${userClimbingEvent.eventId} nie istnieje`);
    }
}

export const createNewUserEvent = async (climbingEvent: UserClimbingEvent, uid: string): Promise<void> => {
    const event = await findUserEventWithId(climbingEvent.eventId, uid);
    if (!event) {
        const documentRef = getDocumentReference(climbingEvent.eventId, uid);
        return setDoc(documentRef, climbingEvent)
    } else {
        throw new Error(`Użytkownik o id ${uid} posiada juz wydażenie  o nazwie ${event.eventId} `);
    }
}