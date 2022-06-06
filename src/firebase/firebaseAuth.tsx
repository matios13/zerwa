import { logEvent } from "@firebase/analytics";
import {
    getAuth, GoogleAuthProvider, signInWithPopup,
    signOut as logout,
    User
} from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent";
import { UserData } from "../models/UserData";
import { analytics, firebaseApp } from "./firebase";
import { FirebaseConverter } from "./firebaseConverter";


type AuthContextType = {
    user: User | null,
    userData?: UserData
    signInWithGoogle: () => void,
    signOut: () => void

}
const AuthContext = createContext<AuthContextType>({ user: null, signInWithGoogle: () => { }, signOut: () => { } });

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
    async function getOrCreateuserData() {
        try {
            if (user) {
                const users = collection(db, "users")
                const docRef = doc(users, user.uid).withConverter(new FirebaseConverter<UserData>())
                var userData = (await getDoc(docRef)).data();
                if (!userData) {
                    userData = new UserData(user.uid, user.displayName, user.email)
                    await setDoc(docRef, userData);
                }
                setUserData(userData)
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
        <AuthContext.Provider value={{ user, userData, signInWithGoogle, signOut }}>
            {!isLoading && children}
            {isLoading && <LoadingComponent message="Ładowanie" />}
        </AuthContext.Provider>
    );
}
