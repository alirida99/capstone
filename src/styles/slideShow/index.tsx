
import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../theme";

export const SlideshowContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        padding: "17px 0px 17px 0px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0px 20px 0px",
    overflow: "hidden",
    background: Colors.secondary,
}));

export const MessageTexter = styled(Typography)(({ theme }) => ({
    /*fontFamily: '"Montez", "cursive"',*/


    [theme.breakpoints.up("md")]: {
        fontSize: "3rem",
    },
    color: Colors.white,
    fontSize: "1.5rem",
}));