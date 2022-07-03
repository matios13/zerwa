import { Edit } from "@mui/icons-material";
import { IconButton, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ClimbingEvent } from "../../../models/ClimbingEvent";
import { dateAsString } from "../../../services/time/TimeService";
import { CreateNewEvent } from "./CreateNewEvent";

type Props = {
    event: ClimbingEvent,
    refreshEvent: () => void
}


export const EventInfoComponent: React.FC<Props> = ({ event, refreshEvent }) => {


    const [isEditing, setEditing] = useState(false);

    const handleEdit = () => {
        setEditing(false);
        refreshEvent();

    }

    if (!isEditing) {
        return (
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography align="center" variant="h6" >{event.name}</Typography>
                    <IconButton color="secondary" onClick={() => setEditing(!isEditing)}> <Edit /></IconButton>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
                    {event.resultsLink && <Link target="_blank" href={event.resultsLink}>Wyniki</Link>}
                    {!event.resultsLink && <Typography variant="caption" >Brak linku z wynikami</Typography>}
                    {event.moreInfoLink && <Link target="_blank" href={event.moreInfoLink}>Więcej informacji</Link>}
                    {!event.moreInfoLink && <Typography variant="caption" >Brak linku z informacjami</Typography>}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
                    <Typography>Data rozpoczęcia : <br /> {dateAsString(event.startDate)}</Typography>
                    <Typography>Data zakończenia : <br /> {dateAsString(event.endDate)} </Typography>
                </Box>
            </Box>)
    } else {
        return (
            <CreateNewEvent handleSaveNewEvent={handleEdit} updateMode={true} event={event} />
        )
    }
}
