import { Button } from "@mui/material";
import { Fragment } from "react";
import { AppBarComponent } from "../../components/AppBarComponent";
import { useAuth } from "../../firebase/firebaseAuth";

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