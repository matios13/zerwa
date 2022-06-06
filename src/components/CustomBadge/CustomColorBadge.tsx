import { Badge } from "@mui/material";
import chroma from "chroma-js";
import { FC, ReactNode } from "react";
type Props = { backgroudColor?: string, children: ReactNode, badgeContent?: string };

export const CustomColorBadge: FC<Props> = ({ children, backgroudColor, badgeContent }) => {
    if (backgroudColor) {
        const textColour = chroma(backgroudColor).luminance() > 0.5 ? "black" : "white";
        return (
            <Badge sx={{
                "& .MuiBadge-badge": {
                    backgroundColor: backgroudColor,
                    color: textColour
                }
            }} badgeContent={badgeContent} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                {children}
            </Badge>
        )
    } else {
        return (
            <Badge color="secondary" badgeContent={badgeContent} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                {children}
            </Badge>
        )
    }
}