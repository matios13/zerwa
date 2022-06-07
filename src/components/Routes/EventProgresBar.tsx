import { Avatar, LinearProgress, linearProgressClasses, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import chroma from "chroma-js";
import { FC } from "react";

type Props = {
    label: string,
    done: number,
    max: number,
    colour?: string
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
    },
}));

export const EventProgresBar: FC<Props> = ({ label, done, max, colour }) => {

    var percentage = Math.round((done / max) * 100)

    const textColour = colour ? chroma(colour).luminance() > 0.5 ? "black" : "white" : "white"

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 1 }}>
                <Avatar sx={{ backgroundColor: colour, color: textColour, height: 20, width: 20 }}>{label}</Avatar>
            </Box>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress variant="determinate" value={percentage} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${done}/${max}`}</Typography>
            </Box>
        </Box>

    )
}