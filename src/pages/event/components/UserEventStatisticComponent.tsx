import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { FC } from "react"
import { ClimbingEvent } from "../../../models/ClimbingEvent"
import { UserClimbingEvent } from "../../../models/UserClimbingEvent"

type Props = {
    event: ClimbingEvent,
    userEvent: UserClimbingEvent
}

export const UserEventStatisticComponent: FC<Props> = ({ event, userEvent }) => {
    return (
        <Box>
            <Typography align="center" variant="h6" m={2} >Suma punktów : {userEvent?.sumOfPoints} / {event.routes.reduce((sum, r) => r.points + sum, 0)}</Typography>
        </Box>
    )
}