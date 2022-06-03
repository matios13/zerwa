import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../firebase/firebaseAuth";
import { AppBar } from '@mui/material';
import { Fragment } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBarComponent } from "../../components/AppBarComponent";

export const Hompepage = () => {
    const { user, signOut } = useAuth();
    
    return (
        <Fragment>
            <AppBarComponent/>
            <div>
                <span>You are logged in as {user?.email}</span>
                <Button onClick={signOut}>Sign out</Button>
            </div>
        </Fragment >
    )
}