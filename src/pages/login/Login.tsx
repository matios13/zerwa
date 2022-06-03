import { useEffect } from "react";
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/firebaseAuth";
export const Login = () => {
    const { user, isAuthenticated, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) navigate("/");
    }, [user]);
    return (
        <div className="login">
            <div className="login__container">
                <GoogleButton
                onClick={() => {
                        console.log("jolo");
                        signInWithGoogle()
                    }}>
                        Kontynuuj przez Google
                </GoogleButton>

            </div>
        </div>
    );
}
export default Login;