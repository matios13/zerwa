import { CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system";

type LoadingProps = {
    message: string;
}

export const LoadingComponent = ({ message }: LoadingProps) => {
    return (
        <Box p={2} sx={{
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'column'
        }}>
            <Typography m={2}>{message}</Typography>
            <CircularProgress /> 
        </Box> )
}