import { Box, Link, Typography } from "@mui/material"
import { FC } from "react"
import { ClimbingEvent } from "../../../models/ClimbingEvent"
import { checkIfDateWasInPast, dateAsString } from "../../../services/time/TimeService"

type Props = {
    event: ClimbingEvent,
    menuElement: React.ReactElement
}

export const EventResultComponent: FC<Props> = ({ event, menuElement }) => {

    return (
        <>
            {!checkIfDateWasInPast(event.endDate) &&
                (<>
                    {menuElement}
                    <Typography align="center" variant="h6" m={1} >{event.name}</Typography>
                    <Typography align="center" m={1} >Pamiętaj o wypełnieniu kartki i oddaniu jej na zerwie!</Typography>
                </>
                )}

            {checkIfDateWasInPast(event.endDate) && <Typography variant="h6" align="center">Wydarzenie zakończone{!event.resultsLink && ", wyniki wkrótce"}</Typography>}
            
            <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2, mt: 2 }}>
                {event.resultsLink && <Link target="_blank" href={event.resultsLink}>Wyniki</Link>}
                {event.moreInfoLink && <Link target="_blank" href={event.moreInfoLink}>Więcej informacji</Link>}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2, mt: 2 }}>
                <Typography>{dateAsString(event.startDate)} - {dateAsString(event.endDate)}</Typography>
            </Box>
        </>

    )
}