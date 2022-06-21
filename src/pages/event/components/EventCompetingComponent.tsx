import { Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../../components/LoadingComponent";
import { RoutesGrid } from "../../../components/Routes/RoutesGrid";
import { useAuth } from "../../../firebase/firebaseAuth";
import { ClimbingEvent, getDifficultyFor } from "../../../models/ClimbingEvent";
import { getAllUserRouteStatus, UserClimbingEvent, UserClimbingRoute, UserRouteStatus } from "../../../models/UserClimbingEvent";
import { UserData } from "../../../models/UserData";
import { createNewUserEvent, findUserEventWithId, updateUserEvent } from "../../../services/events/UserEventService";
import { dateAsString } from "../../../services/time/TimeService";
import { UserEventDetailsComponent } from "./UserEventDetailsComponent";
import { UserEventStatisticComponent } from "./UserEventStatisticComponent";
type Props = {
    event: ClimbingEvent
}

type AnchorAndId = {
    anchor: HTMLElement,
    id: number
}

export const EventCompetingComponent: React.FC<Props> = ({ event }) => {
    const dificulties = getDifficultyFor(event.type);
    const { user, userData, updateUserData } = useAuth()
    const [userClimbingEvent, setUserClimbingEvent] = useState<UserClimbingEvent>();
    const [anchorAndId, setAnchorAndId] = useState<null | AnchorAndId>(null);
    const [loading, setLoading] = useState(true);
    const handleMenu = (htmlEvent: React.MouseEvent<HTMLElement>, routeId?: number) => {
        setAnchorAndId({
            anchor: htmlEvent.currentTarget,
            id: routeId || event.routes.length + 1
        });
    };

    useEffect(() => {
        if (user && event && userData) {
            if (!userClimbingEvent) {
                findUserEventWithId(event.name, user.uid)
                    .then(
                        (userClimbingEvent) => {
                            if (userClimbingEvent) {
                                setUserClimbingEvent(userClimbingEvent)
                            } else {
                                const newUserClimbingEvent = new UserClimbingEvent(event.name, user.uid, userData.name, userData.email, userData.birthYear)
                                createNewUserEvent(newUserClimbingEvent)
                                    .then(() => setUserClimbingEvent(newUserClimbingEvent))
                            }
                        }
                    ).then(() => setLoading(false))
            } else {
                addEventToUserListIfNotExists(event.name, userData)
                addUserDetailsToEventIfDifferent(userData, userClimbingEvent)
            }
        }
    }, [event, user, userData, userClimbingEvent]);

    const addEventToUserListIfNotExists = (eventId: string, userData: UserData) => {
        if (!(userData.eventIds && userData.eventIds.includes(eventId))) {
            const newUserData = _.clone(userData)
            newUserData.eventIds = _.union(newUserData.eventIds, [event.name])
            updateUserData(newUserData)
        }
    }
    const addUserDetailsToEventIfDifferent = (userData: UserData, userClimbingEvent: UserClimbingEvent) => {
        if (userData.name !== userClimbingEvent.name || userData.email !== userClimbingEvent.email || userData.birthYear !== userClimbingEvent.birthYear) {
            handleUpdateUserEvent({ ...userClimbingEvent, name: userData.name, email: userData.email, birthYear: userData.birthYear })
        }
    }
    const handleClose = () => {
        setAnchorAndId(null);
    };

    const recalculateScore = (userClimbingEvent: UserClimbingEvent): number => userClimbingEvent.climbingRoutes.filter(cr => cr.status === UserRouteStatus.DONE).reduce((sum, cr) => sum + (event.routes.find(r => r.id === cr.id)?.points || 0), 0);

    const updateRoutesArray = (status: UserRouteStatus): UserClimbingRoute[] => {
        if (anchorAndId && userClimbingEvent) {
            const foundRoute = userClimbingEvent.climbingRoutes.find(r => r.id === anchorAndId.id)
            if (foundRoute) {
                return userClimbingEvent.climbingRoutes.map(r => {
                    if (r.id === anchorAndId.id) {
                        return { ...r, status }
                    }
                    return r;
                })
            } else {
                return userClimbingEvent.climbingRoutes.concat({ id: anchorAndId.id, status })
            }
        }
        return []
    }
    const setStatusOnRoute = (status: UserRouteStatus) => {
        if (userClimbingEvent && anchorAndId && user) {
            const updatedRoute = updateRoutesArray(status);
            const newUserClimbingEvent = { ...userClimbingEvent, climbingRoutes: updatedRoute }
            newUserClimbingEvent.sumOfPoints = recalculateScore(newUserClimbingEvent);
            handleUpdateUserEvent(newUserClimbingEvent)
            handleClose()
        }
    }
    const handleUpdateUserEvent = (userEvent: UserClimbingEvent) => {
        if (user) {
            updateUserEvent(userEvent, user.uid)
            setUserClimbingEvent(userEvent)
        }
    }

    const getColorForId = (id: number): string => {
        if (userClimbingEvent) {
            const foundRoute = userClimbingEvent.climbingRoutes.find(r => r.id === id)
            if (foundRoute) {
                return getAllUserRouteStatus().find(r => r.status === foundRoute.status)?.color || "white";
            }
        }
        return 'white'
    }

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
                {
                    getAllUserRouteStatus().map(status => <MenuItem key={"status-" + status.status} sx={{ backgroundColor: status.color }} onClick={() => setStatusOnRoute(status.status)}>{status.label}</MenuItem>)
                }
            </Menu>

            <Typography align="center" variant="h6" m={1} >{event.name}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2, mt: 2 }}>
                <Typography>{dateAsString(event.startDate)} - {dateAsString(event.endDate)}</Typography>
            </Box>
            {userClimbingEvent && !loading &&
                <>
                    <UserEventDetailsComponent userEvent={userClimbingEvent} handleUpdate={handleUpdateUserEvent} />
                    <UserEventStatisticComponent event={event} userEvent={userClimbingEvent} />
                    <RoutesGrid dificulties={dificulties} routes={event.routes} handleMenu={handleMenu} getColorForId={getColorForId} addNewRouteButton={false} />
                </>}
            {(!userClimbingEvent || loading) && <LoadingComponent message="Ładowanie" />}


        </Box>)
}
