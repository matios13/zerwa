import { Button, Grid, TextField, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from "@mui/system"
import { DatePicker } from "@mui/x-date-pickers"
import { isNumber } from "lodash"
import { DateTime } from "luxon"
import { useState } from "react"
import { ClimbingEvent } from "../../../models/ClimbingEvent"
import { createNewEvent, updateEvent } from "../../../services/events/EventService"
import { dateFromNumber } from "../../../services/time/TimeService"




type Props = {
    handleSaveNewEvent: (name: string) => void,
    updateMode: boolean,
    event?: ClimbingEvent
}
export const CreateNewEvent: React.FC<Props> = ({ handleSaveNewEvent, updateMode, event }) => {

    const [climbingEvent, setClimbingEvent] = useState(event || new ClimbingEvent("", Date.now(), Date.now(), []))
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
            if (updateMode) {
                updateEvent(climbingEvent).then(() => {
                    setSaving(false)
                    handleSaveNewEvent(climbingEvent.name)
                }).catch(error => {
                    setError(error.message)
                })
            } else {
                createNewEvent(climbingEvent).then(() => {
                    setSaving(false)
                    handleSaveNewEvent(climbingEvent.name)
                }).catch(error => {
                    setError(error.message)
                });
            }
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
                {!updateMode &&
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
                }
                <Grid item xs={8} md={4}>
                    <DatePicker
                        label="Data rozpoczęcia"
                        value={toDate(climbingEvent.startDate)}
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
                        value={toDate(climbingEvent.endDate)}
                        inputFormat="dd.MM.yyyy"
                        onChange={(date) => {
                            if (date) setClimbingEvent({ ...climbingEvent, endDate: date })
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={8} md={4} justifyContent="center" alignItems="center" >
                    <TextField
                        label="Link do informacji"
                        id="event-info-link"
                        type={"url"}
                        value={climbingEvent.moreInfoLink}
                        onChange={(e) => setClimbingEvent({ ...climbingEvent, moreInfoLink: e.target.value })}
                    />
                </Grid>
                <Grid item xs={8} md={4} justifyContent="center" alignItems="center" >
                    <TextField
                        label="Link do wyników"
                        id="event-results-link"
                        type={"url"}
                        value={climbingEvent.resultsLink}
                        onChange={(e) => setClimbingEvent({ ...climbingEvent, resultsLink: e.target.value })}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" disabled={saving} sx={{ p: 2, pr: 4, pl: 4 }} onClick={() => saveIfValuesAreNotEmpty()}>Zapisz</Button>
            <Typography color="error" sx={{ display: "block", mt: 2 }}>{error || ""}</Typography>
            <Typography>{saving ? "Zapisywanie..." : ""}</Typography>

        </Box>
    )
}

const toDate = (date: number | DateTime | undefined): any => isNumber(date) ? DateTime.fromMillis(date) : date