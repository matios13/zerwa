import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";
export class FirebaseConverter<T>{
    toFirestore(modelObject: T): DocumentData {
        return JSON.parse(JSON.stringify(modelObject)); // we need to use JSON.parse as this is recomended (and only way) to do deep clonning hhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

    }
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T {
        let data = snapshot.data() as T
        return data as T
    }
}