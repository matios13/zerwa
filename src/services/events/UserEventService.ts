import { collection, doc, DocumentReference, getDoc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc } from "@firebase/firestore"
import { FirebaseConverter } from "../../firebase/firebaseConverter"
import { UserClimbingEvent } from "../../models/UserClimbingEvent"

const converter = new FirebaseConverter<UserClimbingEvent>()


const getDocumentReference = (eventId: string, userId: string): DocumentReference<UserClimbingEvent> => doc(getFirestore(), `climbingEvents/${eventId}/userEvents/${userId}`).withConverter(converter)
const getOldDocumentReference = (eventId: string, userId: string): DocumentReference<UserClimbingEvent> => doc(getFirestore(), `users/${userId}/userEvents/${eventId}`).withConverter(converter)

const copyUserClimbingEventFromOldPlace = async (eventId: string, userId: string): Promise<UserClimbingEvent | null> => {
    const documentRef = getOldDocumentReference(eventId, userId)

    const document = await getDoc(documentRef);

    if (document.exists()) {
        const userEventData = document.data()
        if (!userEventData.userId) {
            userEventData.userId = userId
        }
        await setDoc(getDocumentReference(eventId, userId), userEventData)
        return userEventData
    } else {
        return null;
    }

}

export const findUserEventWithId = async (id: string, userId: string): Promise<UserClimbingEvent | null> => {
    const documentRef = getDocumentReference(id, userId)
    const document = await getDoc(documentRef);
    if (document.exists()) {
        return document.data()
    } else {
        return copyUserClimbingEventFromOldPlace(id, userId);
    }
}

export const updateUserEvent = async (userClimbingEvent: UserClimbingEvent, uid: string): Promise<void> => {
    const documentRef = getDocumentReference(userClimbingEvent.eventId, uid);
    try {
        return updateDoc(documentRef, userClimbingEvent)
    } catch (e) {
        console.error(e)
        throw new Error(`Wydarzenie o nazwie ${userClimbingEvent.eventId} nie istnieje`);
    }

}

export const createNewUserEvent = async (climbingEvent: UserClimbingEvent): Promise<void> => {
    const event = await findUserEventWithId(climbingEvent.eventId, climbingEvent.userId);
    if (!event) {
        const documentRef = getDocumentReference(climbingEvent.eventId, climbingEvent.userId);
        return setDoc(documentRef, climbingEvent)
    } else {
        throw new Error(`Użytkownik o id ${climbingEvent.userId} posiada juz wydażenie  o nazwie ${event.eventId} `);
    }
}

export const getAllUserEvents = async (eventId: string): Promise<UserClimbingEvent[]> => {
    const documentRef = collection(getFirestore(), `climbingEvents/${eventId}/userEvents/`).withConverter(converter)
    const q = query(documentRef, orderBy("sumOfPoints", "desc"))
    const documents = await getDocs(q)
    return documents.docs.map(doc => doc.data())
}