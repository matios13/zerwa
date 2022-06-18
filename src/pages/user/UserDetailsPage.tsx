import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from '../../components/LoadingComponent';
import { useAuth } from "../../firebase/firebaseAuth";
import { Sex } from '../../models/UserData';

export const UserDetailsPage: FC = () => {
    const { userData, updateUserData } = useAuth()
    const navigate = useNavigate()

    const [data, setData] = useState(userData)
    const [isSaving, setSaving] = useState(false)
    const [error, setError] = useState<string>()

    const saveIfValuesAreNotEmpty = () => {
        if (data?.name && data?.birthYear && data?.sex) {
            setSaving(true)
            updateUserData(data).then(() => setSaving(false)).then(() => navigate("/"))
        } else {
            setError("Wypełnij wszystkie pola")
        }
    }

    useEffect(() => {
        setData(userData)
    }, [userData])

    const handleBirthYearChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.validationMessage) {
            setError(e.target.validationMessage)
        } else if (data) {
            setError(undefined)
            setData({ ...data, birthYear: parseInt(e.target.value) })
        }
    }

    if (data) {
        return (
            <>
                <Box component="form" sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
                    <Typography align="center" variant="h3" >Twoje dane</Typography>
                    <Grid container spacing={2} justifyItems="center" justifyContent="center" alignItems="center" sx={{
                        '& .MuiTextField-root': { m: 2, },
                    }}>
                        <Grid item xs={12} md={4} >
                            <Box display="flex" justifyContent="center">
                                <TextField
                                    error={!!error && !data.name}
                                    sx={{ width: 300 }}
                                    label="Imię i Nazwisko"
                                    id="event-name"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <TextField
                                error={!!error && !data.birthYear}
                                label="Rok urodzenia"
                                id="birth-year"
                                value={data.birthYear}
                                onChange={handleBirthYearChange}
                                inputProps={{
                                    type: 'number',
                                    min: 0,
                                    max: new Date().getFullYear(),
                                    step: 1,
                                    maxLength: 4,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
                            <Select
                                error={!!error && !data.sex}
                                label="Płeć"
                                id="user-sex"
                                value={data.sex}
                                onChange={(e) => setData({ ...data, sex: (e.target.value as Sex) })}
                            >
                                <MenuItem value={Sex.MALE}>Mężczyzna</MenuItem>
                                <MenuItem value={Sex.FEMALE}>Kobieta</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Button variant="contained" disabled={isSaving} sx={{ p: 2, pr: 4, pl: 4 }} onClick={() => saveIfValuesAreNotEmpty()}>Zapisz</Button>
                    <Typography color="error" sx={{ display: "block", mt: 2 }}>{error || ""}</Typography>
                    <Typography>{isSaving ? "Zapisywanie..." : ""}</Typography>
                </Box>
            </>
        )
    } else {
        return <LoadingComponent message='Ładowanie danych' />
    }
};