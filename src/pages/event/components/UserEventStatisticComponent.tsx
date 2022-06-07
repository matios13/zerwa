import { Button, Collapse, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { FC, useState } from "react"
import { ClimbingEvent, getDifficultyFor } from "../../../models/ClimbingEvent"
import { UserClimbingEvent, UserRouteStatus } from "../../../models/UserClimbingEvent"
import _ from "lodash";
import { EventProgresBar } from "../../../components/Routes/EventProgresBar"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
type Props = {
    event: ClimbingEvent,
    userEvent: UserClimbingEvent
}

export const UserEventStatisticComponent: FC<Props> = ({ event, userEvent }) => {
    const [collapsed, setCollapsed] = useState(true);
    var checkedRoutes = event.routes.filter(r => userEvent.climbingRoutes.find(cr => cr.id === r.id)?.status === UserRouteStatus.DONE)
    var dificulties = getDifficultyFor(event.type)

    var doneInGrade = _(checkedRoutes).groupBy(r => r.dificulty).map((r, d) => ({
        dificulty: d,
        points: _.sumBy(r, "points")
    })).value();

    var maxInGrade = _(event.routes).groupBy(r => r.dificulty).map((r, d) => ({
        dificulty: d,
        points: _.sumBy(r, "points")
    })).value();


    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <Typography align="center" variant="h6" m={2} >Suma punktów : {userEvent?.sumOfPoints} / {event.routes.reduce((sum, r) => r.points + sum, 0)}</Typography>
            <Button color="secondary" sx={{mb: 2}} onClick={() => setCollapsed(!collapsed)}>Statystyki {collapsed ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</Button>
            <Collapse in={!collapsed}>
                <Grid container spacing={2} mb={2} alignItems="center"
                    justifyContent="center" >
                    {maxInGrade.map(r => (
                        <Grid item xs={6} sm={6} md={4} lg={3} key={`difficulty-progress-bar-${r.dificulty}`}>
                            <EventProgresBar max={r.points} done={doneInGrade.find(d => d.dificulty === r.dificulty)?.points || 0} label={r.dificulty} colour={dificulties.find(d => d.difficulty === r.dificulty)?.colour} />
                        </Grid>
                    ))}
                </Grid>
            </Collapse>
        </Box>
    )
}