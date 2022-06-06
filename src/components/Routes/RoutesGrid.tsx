import { Card, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FC } from "react";
import { ClimbingRoute } from "../../models/ClimbigRoute";
import { Difficulty } from "../../models/ClimbingEvent";
import { CustomColorBadge } from "../CustomBadge/CustomColorBadge";
const blockSize: number = 50;

const Item = styled(Card)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    variant: "outlined",
    width: blockSize,
    height: blockSize,
}));

type Props = { routes: ClimbingRoute[], dificulties: Difficulty[], handleMenu: (event: React.MouseEvent<HTMLElement>, id?: number) => void }

export const RoutesGrid: FC<Props> = ({ routes, dificulties, handleMenu }) => {
    console.log(dificulties)
    return (
        <Grid container spacing={0.5} >
            {routes.map((route, index) => (
                <Grid item key={"eventRoute-" + index} xs={3} md={2}>
                    <Item onClick={(event) => handleMenu(event, route.id)}>
                        <CustomColorBadge backgroudColor={dificulties.find((d) => d.difficulty === route.dificulty)?.colour} badgeContent={route.dificulty}>
                            <Typography variant='h6' sx={{ p: 0.5 }}>{route.id}</Typography>
                        </CustomColorBadge>
                    </Item>
                </Grid>
            ))}

            <Grid item xs={3} md={2}>
                <Item onClick={(event) => handleMenu(event)} color="primary">
                    <Typography variant='h6' sx={{ lineHeight: `${blockSize}px` }}>+</Typography>
                </Item>
            </Grid>
        </Grid>
    )
}