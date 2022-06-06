import { MenuItem, Select } from "@mui/material"
import { Box } from "@mui/system"
import { Fragment, useEffect, useState } from "react"
import { ClimbingEvent } from "../../models/ClimbingEvent"
import { listAllEvents } from "../../services/events/EventService"
import { EventCompetingComponent } from "./components/EventCompetingComponent"


export const EventCompletingPage: React.FC = () => {
    const [events, setEvents] = useState<ClimbingEvent[]>([])
    const [selectedEventIndex, setSelectedEventIndex] = useState<number>()
    useEffect(() => {
        listAllEvents().then((snapshots) => {
            setEvents(snapshots)
        })
    }, [])

    useEffect(() => {
        if (!selectedEventIndex && events.length > 0) {
            setSelectedEventIndex(0)
        }
    }, [events, selectedEventIndex])

    return (
        <Fragment>
            <Box
                sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <Box sx={{ alignItems: "center", m: 1, display: "flex", flexDirection: "column" }}>
                    <Select
                        sx={{ width: 300 }}
                        value={selectedEventIndex !== undefined ? events[selectedEventIndex].name : ""}
                        label="Wydarzenie">
                        {events.map((event, index) => <MenuItem onClick={() => setSelectedEventIndex(index)} key={event.name} value={event.name}>{event.name}</MenuItem>)}
                    </Select>
                </Box>
                {selectedEventIndex !== undefined &&
                    <EventCompetingComponent event={events[selectedEventIndex]} />
                }
            </Box>

        </Fragment>)
}
