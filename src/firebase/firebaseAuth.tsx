import { logEvent } from "@firebase/analytics";
import {
    getAuth, GoogleAuthProvider, signInWithPopup,
    signOut as logout,
    User
} from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent";
import { UserData } from "../models/UserData";
import { updateUserDataDocument } from "../services/events/UserDataEventService";
import { analytics, firebaseApp } from "./firebase";
import { FirebaseConverter } from "./firebaseConverter";


type AuthContextType = {
    user: User | null,
    userData?: UserData
    signInWithGoogle: () => void,
    signOut: () => void,
    updateUserData: (userData: UserData) => Promise<void>

}
const AuthContext = createContext<AuthContextType>({ user: null, signInWithGoogle: () => { }, signOut: () => { }, updateUserData: () => Promise.reject() });


export const useAuth = () => {
    return useContext(AuthContext);
};
type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData>();
    const [isLoading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const db = getFirestore(firebaseApp);
    const users = collection(db, "users")

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
            setLoading(false)
            setUser(user);
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            getOrCreateuserData()
        }
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if (isLoading) {
            logEvent(analytics, "login")
        }
    }, [isLoading])

    const signInWithGoogle = async () => {
        signInWithPopup(getAuth(firebaseApp), googleProvider);
    };

    const updateUserData = async (userData: UserData): Promise<void> => {
        if (user) {
            return updateUserDataDocument(userData).then(() => setUserData(userData))
        } else {
            return Promise.reject("there is no current user in session")
        }
    }
    async function getOrCreateuserData() {
        try {
            if (user) {
                const docRef = doc(users, user.uid).withConverter(new FirebaseConverter<UserData>())
                var userData = (await getDoc(docRef)).data();
                if (!userData) {
                    await updateUserData(new UserData(user.uid, user.displayName || undefined, user.email || undefined))
                } else {
                    setUserData(userData)
                }

            }
        }
        catch (err: any) {
            console.error(err);
        }
    }
    const signOut = () => {
        logout(getAuth(firebaseApp));
    };
    return (
        <AuthContext.Provider value={{ user, userData, signInWithGoogle, signOut, updateUserData }}>
            {!isLoading && children}
            {isLoading && <LoadingComponent message="Ładowanie" />}
        </AuthContext.Provider>
    );
}
