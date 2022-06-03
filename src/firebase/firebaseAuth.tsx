import {
    getAuth, GoogleAuthProvider, signInWithPopup,
    signOut as logout,
    User
} from "firebase/auth";
import {
    setDoc, collection, getDoc, getFirestore,
    doc
} from "firebase/firestore";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { UserData } from "../models/UserData";
import { firebaseApp } from "./firebase";
import { FirebaseConverter } from "./firebaseConverter";



type AuthContextType = {
    user: User | null,
    userData?: UserData,
    isAuthenticated: boolean,
    signInWithGoogle: () => void,
    signOut: () => void

}
const AuthContext = createContext<AuthContextType>({ user: null, isAuthenticated: false, signInWithGoogle: () => { }, signOut: () => { } });

export const useAuth = () => {
    return useContext(AuthContext);
};
type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
            setUser(user);
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        getOrCreateuserData().then(()=>setIsAuthenticated(true))
    },[ user ])

    const signInWithGoogle = async () => {
        signInWithPopup(getAuth(firebaseApp), googleProvider);
    };
    const getOrCreateuserData = async () => {
        try {
            if (user) {
                const users = collection(db,"users")
                const docRef= doc(users,user.uid).withConverter(new FirebaseConverter<UserData>())
                var userData = (await getDoc(docRef)).data();
                if (!userData) {
                    userData = new UserData(user.uid, user.displayName, user.email)
                    await setDoc(docRef, userData);
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
        <AuthContext.Provider value={{ user, isAuthenticated, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
