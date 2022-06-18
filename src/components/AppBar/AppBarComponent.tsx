import { AccountCircle } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../firebase/firebaseAuth";
import { SecurityRole } from "../../models/UserData";

export const AppBarComponent = () => {
    const { signOut, userData, user } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar >
                <Typography variant="h6" color="inherit" component="div" onClick={() => navigate("/")}>
                    Baldomania
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        edge="end"
                    >
                        {user?.photoURL && <Avatar alt="USER" src={user.photoURL} />}
                        {!user?.photoURL &&
                            <AccountCircle />
                        }
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem color="secondary" onClick={() => navigate("/user-details")}>Moje dane</MenuItem>
                        <MenuItem color="secondary" onClick={signOut}>Wyloguj</MenuItem>
                        {userData?.security_role === SecurityRole.ADMIN && <MenuItem onClick={() => navigate("/admin")}>Admin</MenuItem>}
                    </Menu>
                </div>

            </Toolbar>
        </AppBar>
    )
}