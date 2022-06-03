import { Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
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
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Paper elevation={8}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        m:3
                    }}
                >
                    <Typography component="h1" variant="h5" m={3}>
                        Baldomania
                    </Typography>
                    <GoogleButton
                        onClick={() => {
                            console.log("jolo");
                            signInWithGoogle()
                        }} label="Kontynuuj przez Google" />
                </Box>
            </Paper>
        </Box>
        // <div className="login">
        //     <div className="login__container">
        //         <GoogleButton
        //         onClick={() => {
        //                 console.log("jolo");
        //                 signInWithGoogle()
        //             }}>
        //                 Kontynuuj przez Google
        //         </GoogleButton>

        //     </div>
        // </div>
    );
}
export default Login;