import { Button, Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { FC, useEffect, useState } from "react"
import { DifficvultyCategory, UserClimbingEvent } from "../../../models/UserClimbingEvent"

type Props = {
    userEvent: UserClimbingEvent
    handleUpdate: (userEvent: UserClimbingEvent) => void
}
export const EditUserEventDetailsComponent: FC<Props> = ({ userEvent, handleUpdate }) => {

    const [newUserEvent, setNewUserEvent] = useState(userEvent)
    const [error, setError] = useState<String>()
    useEffect(() => {
        setNewUserEvent(userEvent)
    }, [userEvent])

    const handleSectionChange = (section: string)=> {
        setNewUserEvent({ ...newUserEvent, section})
        if(section.length<5 && newUserEvent.isSection){
            setError("Dzień i godzina muszą mieć conajmniej 5 znaków")
        }else{
            setError(undefined)
        }
    }
    return (
        <Grid container justifyContent="center" justifyItems="center" spacing={2} alignItems="center">
            <Grid xs={6} md={2} item>
                <Box display="flex" justifyContent="end" >
                    <Select
                        label="Kategoria"
                        id="user-event-category"
                        value={userEvent.category}
                        onChange={(e) => setNewUserEvent({ ...newUserEvent, category: (e.target.value as DifficvultyCategory) })}
                    >
                        <MenuItem value={DifficvultyCategory.LIGHT}>LIGHT</MenuItem>
                        <MenuItem value={DifficvultyCategory.PRO}>PRO</MenuItem>
                    </Select>
                </Box>
            </Grid>
            <Grid xs={6} md={1} item>
                <FormControlLabel labelPlacement="start" control={
                    <Checkbox checked={newUserEvent.isSection} onChange={() => setNewUserEvent({ ...newUserEvent, isSection: !newUserEvent.isSection })} />
                } label="Sekcja" />

            </Grid>
            {newUserEvent.isSection && (
                <Grid xs={12} md={7} item justifyContent="center" justifyItems="center" alignItems="center">
                    <Box display="flex" justifyContent="center" >
                        <TextField
                            sx={{ width: 300 }}
                            error={!!error}
                            helperText={error}
                            label="Dzień i godzina sekcji"
                            id="event-name"
                            value={newUserEvent.section}
                            onChange={(e) => handleSectionChange(e.target.value)}
                        />
                    </Box>
                </Grid>
            )}
            <Grid item xs={12} md={2}>
                <Box display="flex" justifyContent="center" >
                    <Button disabled={!!error} onClick={() => handleUpdate(newUserEvent)}>Zapisz</Button>
                </Box>
            </Grid>
        </Grid>
    )
}