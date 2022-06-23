import { logEvent } from "@firebase/analytics";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import { analytics } from "../../firebase/firebase";
import { useAuth } from "../../firebase/firebaseAuth";

export const Login = () => {
    const { user, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        logEvent(analytics, "page_view")
    }, []);
    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);
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
                        m: 3
                    }}
                >
                    <Typography component="h1" variant="h5" m={3}>
                        Baldomania
                    </Typography>
                    <GoogleButton
                        onClick={() => {
                            signInWithGoogle()
                        }} label="Kontynuuj przez Google" />
                </Box>
            </Paper>
        </Box>
    );
}
export default Login;