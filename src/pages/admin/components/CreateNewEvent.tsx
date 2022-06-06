import { Button, Grid, TextField, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from "@mui/system"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import { ClimbingEvent } from "../../../models/ClimbingEvent"
import { createNewEvent } from "../../../services/events/EventService"




type Props = {
    handleSaveNewEvent: (name: string) => void
}
export const CreateNewEvent: React.FC<Props> = ({ handleSaveNewEvent }) => {

    const [climbingEvent, setClimbingEvent] = useState(new ClimbingEvent("", Date.now(), Date.now(), []))
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string>()
    const isNameToShort = () => {
        return climbingEvent.name.length < 3
    }
    const largeScreen = useMediaQuery(useTheme().breakpoints.up('md'));
    const saveIfValuesAreNotEmpty = () => {
        setError(undefined)
        if (!isNameToShort() && climbingEvent.startDate && climbingEvent.endDate) {
            setSaving(true)
            createNewEvent(climbingEvent).then(() => {
                setSaving(false)
                handleSaveNewEvent(climbingEvent.name)
            }).catch(error => {
                setError(error.message)
            });
        }
        else {
            setError("Nazwa musi mieć conajmniej 3 znaki a daty muszą być wybrane")
        }
    }
    return (
        <Box component="form" sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" direction={largeScreen ? "row" : "column"} sx={{
                '& .MuiTextField-root': { m: 2, width: 300 },
            }}>
                <Grid item xs={8} md={4} justifyContent="center" alignItems="center" >
                    <TextField
                        error={isNameToShort()}
                        label="Nazwa"
                        id="event-name"
                        value={climbingEvent.name}
                        helperText={isNameToShort() ? "Nazwa musi mieć conajmniej 3 znaki" : ""}
                        onChange={(e) => setClimbingEvent({ ...climbingEvent, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={8} md={4}>
                    <DatePicker
                        label="Data rozpoczęcia"
                        value={climbingEvent.startDate}
                        inputFormat="dd.MM.yyyy"
                        onChange={(date) => {
                            if (date) setClimbingEvent({ ...climbingEvent, startDate: date })
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={8} md={4}>
                    <DatePicker
                        label="Data zakończenia"
                        value={climbingEvent.endDate}
                        inputFormat="dd.MM.yyyy"
                        onChange={(date) => {
                            if (date) setClimbingEvent({ ...climbingEvent, endDate: date })
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" disabled={saving} sx={{ p: 2, pr: 4, pl: 4 }} onClick={() => saveIfValuesAreNotEmpty()}>Zapisz</Button>
            <Typography color="error" sx={{ display: "block", mt: 2 }}>{error || ""}</Typography>
            <Typography>{saving ? "Zapisywanie..." : ""}</Typography>

        </Box>
    )
}