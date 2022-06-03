import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LoadingComponent } from "./components/LoadingComponent";
import { useAuth } from "./firebase/firebaseAuth";
import { SecurityRole } from "./models/UserData";

type Props = { role?: SecurityRole, children: ReactNode };
const PrivateRoute: React.FC<Props> = (props) => {
    const { user, userData } = useAuth()
    console.log("currentUser", user);
    if (!user) {
        console.log("move login");
        return <Navigate to="/login" replace />;
    } else if (!userData) {
        return <LoadingComponent message="Ładowanie" />;
    } else if (props.role && userData?.security_role !== props.role) {
        console.log("move to / user " + userData);
        return <Navigate to="/" replace />;
    }
    return <>{props.children}</>;
};
export default PrivateRoute;