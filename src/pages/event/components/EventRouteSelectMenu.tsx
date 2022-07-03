import { Menu, MenuItem } from "@mui/material"
import { FC } from "react"
import { getAllUserRouteStatus, UserRouteStatus } from "../../../models/UserClimbingEvent"

type Props = {
    anchor?: HTMLElement,
    handleClose: () => void,
    setStatusOnRoute: (status: UserRouteStatus) => void
}

export const EventRouteSelectMenu: FC<Props> = ({ anchor, handleClose, setStatusOnRoute }) => {

    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchor)}
            onClose={handleClose}
        >
            {
                getAllUserRouteStatus().map(status => <MenuItem key={"status-" + status.status} sx={{ backgroundColor: status.color }} onClick={() => setStatusOnRoute(status.status)}>{status.label}</MenuItem>)
            }
        </Menu>
    )
}