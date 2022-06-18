import { Box, Button, Collapse, Grid, Typography } from "@mui/material"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../firebase/firebaseAuth"
import { UserClimbingEvent } from "../../../models/UserClimbingEvent"
import { getSexAsLetter } from "../../../models/UserData"
import { EditUserEventDetailsComponent } from "./EditUserEventDetailsComponent"

type Props = {
    userEvent: UserClimbingEvent
    handleUpdate: (userEvent: UserClimbingEvent) => void
}
export const UserEventDetailsComponent: FC<Props> = ({ userEvent, handleUpdate }) => {
    const navigate = useNavigate()
    const { userData } = useAuth()
    const [editingMode, setEditingMode] = useState(false)
    if (!userData) {
        return <></>
    }
    if (userData && !userData.birthYear || !userData.name || !userData.sex) {
        return (
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <Typography color="error">Uzupełnij swoje dane!</Typography>
                </Grid>
                <Grid item>
                    <Button onClick={() => navigate("/user-details")}>Edytuj dane</Button>
                </Grid>
            </Grid>)
    }
    return (
        <Box display="flex" flexDirection="column" alignContent="center">
            <Typography align="center" variant="h6">Twoje dane:</Typography>
            <Typography align="center" m={2}>{userData.name}   {userData.birthYear ? userData.birthYear : "brak roku urodzin"}   {getSexAsLetter(userData.sex)}</Typography>
            <Collapse in={!editingMode}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                        <Typography align="center">Kategoria:  {userEvent.category} Sekcja:  {userEvent.isSection ? "TAK: " + userEvent.section : "NIE"}</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => setEditingMode(true)}>Edytuj</Button>
                    </Grid>
                </Grid>
            </Collapse>
            <Collapse in={editingMode}>
                <EditUserEventDetailsComponent userEvent={userEvent} handleUpdate={(ue) => {
                    handleUpdate(ue)
                    setEditingMode(false)
                }} />
            </Collapse>
        </Box>)
}