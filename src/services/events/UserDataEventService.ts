import { doc, DocumentReference, getFirestore, updateDoc } from "@firebase/firestore"
import _ from "lodash"
import { FirebaseConverter } from "../../firebase/firebaseConverter"
import { UserData } from "../../models/UserData"

const converter = new FirebaseConverter<UserData>()


const getDocumentReference = (userId: string): DocumentReference<UserData> => doc(getFirestore(), `users/${userId}`).withConverter(converter)


export const updateUserDataDocument = async (userData: UserData): Promise<void> => {
        const docRef = getDocumentReference(userData.uid)
        return updateDoc(docRef, _.omit(userData, ['security_role']))
}

