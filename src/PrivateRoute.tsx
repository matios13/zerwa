import React, { useContext, ReactNode, Children } from "react";
import { Route, RouteProps, useNavigate, Navigate } from "react-router-dom";
import { LoadingComponent } from "./components/LoadingComponent";
import { useAuth } from "./firebase/firebaseAuth";
import { SecurityRole } from "./models/UserData";

type Props = { role?: SecurityRole, children: ReactNode };
const PrivateRoute: React.FC<Props> = (props) => {
    const { user, userData } = useAuth()
    let navigate = useNavigate()
    console.log("currentUser", user);
    if (!user) {
        console.log("move login");
        return <Navigate to="/login" replace />;
    } else if (!userData) {
        return <LoadingComponent message="Loading user" />;
    } else if (props.role && userData?.security_role !== props.role) {
        console.log("move to / user " + userData);
        navigate('/')
    }
    return <>{props.children}</>;
};
export default PrivateRoute;