import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { RoutesGrid } from "../../../components/Routes/RoutesGrid";
import { ClimbingRoute } from '../../../models/ClimbigRoute';
import { ClimbingEvent, getDifficultyFor } from "../../../models/ClimbingEvent";
import { UserClimbingEvent } from "../../../models/UserClimbingEvent";
import { getAllUserEvents } from "../../../services/events/UserEventService";
import { dateAsString } from "../../../services/time/TimeService";
import { ViewEventResultsComponent } from "./ViewEventResultsComponent";

type Props = {
    event: ClimbingEvent
    updateRoute: (route: ClimbingRoute) => void
}

type AnchorAndId = {
    anchor: HTMLElement,
    id: number
}
export const EditEventComponent: React.FC<Props> = ({ event, updateRoute }) => {

    const dificulties = getDifficultyFor(event.type);
    const [anchorAndId, setAnchorAndId] = useState<null | AnchorAndId>(null);
    const [isEditing, setEditing] = useState(true);
    const [climbingEvents, setClimbingEvents] = useState<UserClimbingEvent[]>()

    useEffect(() => {
        getAllUserEvents(event.name).then(setClimbingEvents) 
    }, [event])


    const handleMenu = (htmlEvent: React.MouseEvent<HTMLElement>, routeId?: number) => {
        setAnchorAndId({
            anchor: htmlEvent.currentTarget,
            id: routeId || event.routes.length + 1
        });
    };

    const handleClose = () => {
        setAnchorAndId(null);
    };

    const updateOrCreateRoute = (dificulty: string) => {
        if (anchorAndId) {
            var climbingRoute = new ClimbingRoute(anchorAndId?.id, dificulty);
            updateRoute(climbingRoute);
            setAnchorAndId(null);
        } else {
            console.error("no anchor");
        }

    }
    //TODO edycja dat i nazwy
    return (
        <Box width="80%" >
            <Menu
                id="menu-appbar"
                anchorEl={anchorAndId?.anchor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorAndId)}
                onClose={handleClose}
            >
                {dificulties.map(d => <MenuItem key={"dificulty-" + d.difficulty} sx={{ backgroundColor: d.colour ? d.colour : "white" }} onClick={() => updateOrCreateRoute(d.difficulty)}>{d.difficulty}</MenuItem>)}
            </Menu>
            <Typography align="center" variant="h6" >{event.name}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
                <Typography>Data rozpoczęcia : <br /> {dateAsString(event.startDate)}</Typography>
                <Typography>Data zakończenia : <br /> {dateAsString(event.endDate)} </Typography>
            </Box>
            <Box justifyContent="center" display="flex">
                <Button variant="outlined" onClick={() => setEditing(!isEditing)}>{isEditing ? "Wyniki" : "edycja"}</Button>
            </Box>

            {isEditing &&
                <RoutesGrid dificulties={dificulties} routes={event.routes} handleMenu={handleMenu} addNewRouteButton={true} />
            }
            {!isEditing && climbingEvents &&
                <ViewEventResultsComponent event={event} climbingEvents={climbingEvents} />
            }

        </Box>)
}
