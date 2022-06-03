import { Button } from "@mui/material";
import { useAuth } from "../../firebase/firebaseAuth";

export const Hompepage = () => {
    const { user, signOut} = useAuth();
    return(
        <div>
            <span>You are logged in as {user?.email}</span>
            <Button onClick={signOut}>Sign out</Button>
        </div>
    )
}