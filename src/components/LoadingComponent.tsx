import { CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system";

type LoadingProps = {
    message: string;
}

export const LoadingComponent = ({ message }: LoadingProps) => {
    return (
        <Box p={20} sx={{
            display:'flex',
            alignItems: 'center',
        }}>
            <Typography mr={20}>🏗 {message}</Typography>
            <CircularProgress /> 
        </Box> )
}