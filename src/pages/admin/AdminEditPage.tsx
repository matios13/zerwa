import { Button, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Fragment, useEffect, useState } from "react"
import { AppBarComponent } from "../../components/AppBar/AppBarComponent"
import { ClimbingRoute } from "../../models/ClimbigRoute"
import { ClimbingEvent } from "../../models/ClimbingEvent"
import { listAllEvents, updateEvent } from "../../services/events/EventService"
import { CreateNewEvent } from "./components/CreateNewEvent"
import { EditEventComponent } from "./components/EditEventComponent"

export const AdminEditPage: React.FC = () => {
    const [createNew, setCreateNew] = useState(false)
    const [events, setEvents] = useState<ClimbingEvent[]>([])
    const [selectedEventIndex, setSelectedEventIndex] = useState<number>()
    const handleSaveNewEvent = (name: String) => {
        setCreateNew(false)
        listAllEvents().then(events => {
            setEvents(events)
            const foundEventIndex = events.findIndex(event => event.name === name)
            if (foundEventIndex) {
                setSelectedEventIndex(foundEventIndex)
            }
        });
    }

    useEffect(() => {
        listAllEvents().then((snapshots) => {
            setEvents(snapshots)
        })
    }, [])

    const updateRoutesArray = (updatedRoute: ClimbingRoute): ClimbingRoute[] => {
        if (selectedEventIndex !== undefined) {
            const routes = events[selectedEventIndex].routes
            const routeToUpdate = routes.find(r => r.id === updatedRoute.id)
            if (routeToUpdate) {
                return routes.map(r => {
                    if (r.id === updatedRoute.id) {
                        return updatedRoute
                    }
                    return r
                })
            } else {
                return routes.concat(updatedRoute)
            }
        }
        return []
    }
    const handeUpdateRoute = (route: ClimbingRoute) => {
        if (selectedEventIndex !== undefined) {
            const updatedRoutes = updateRoutesArray(route)
            const updatedEvent = { ...events[selectedEventIndex], routes: updatedRoutes }
            setEvents(events.map((event, index) => {
                if (index === selectedEventIndex) {
                    return updatedEvent
                }
                return event
            }))
            updateEvent(updatedEvent);
        } else {
            console.error("no selected event")
        }
    }
    
    return (
        <Fragment>
            <AppBarComponent />
            <Box
                sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <Typography variant="h2" mb={2}>Wydarzenie</Typography>
                {!createNew &&
                    <Box sx={{ alignItems: "center", m: 1, display: "flex", flexDirection: "column" }}>
                        <Button color="secondary" onClick={() => setCreateNew(true)}>Stwórz nowe</Button>
                        <Select
                            sx={{ width: 300 }}
                            value={selectedEventIndex !== undefined ? events[selectedEventIndex].name : ""}
                            label="Wydarzenie">
                            {events.map((event, index) => <MenuItem onClick={() => setSelectedEventIndex(index)} key={event.name} value={event.name}>{event.name}</MenuItem>)}
                        </Select>
                    </Box>
                }
                {createNew && (<CreateNewEvent handleSaveNewEvent={handleSaveNewEvent} />)}
                {!createNew && selectedEventIndex !== undefined && <EditEventComponent updateRoute={handeUpdateRoute} event={events[selectedEventIndex]}></EditEventComponent>}
            </Box>

        </Fragment>)
}
