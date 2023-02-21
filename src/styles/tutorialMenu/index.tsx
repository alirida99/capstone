import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme";

export const MenuTitle = styled(Typography)(({ theme }) => ({
    lineHeight: 1.5,
    fontSize: '45px',
    marginBottom: '20px',
    color: Colors.secondary,
    border: '1px double',
    [theme.breakpoints.down('sm')]: {
        fontSize: '42px',

    }
}));

export const TutorialTypes = styled(Typography)(() => ({
    textTransform: "uppercase",
    marginBottom: "1em",
    color: Colors.secondary,

}));
export const TutorialAlert = styled(Typography)(({ theme }) => ({
    lineHeight: 1.25,
    letterSpacing: 1.25,
    marginBottom: '3em',
    color: Colors.danger,

    [theme.breakpoints.down('md')]: {
        lineHeight: 1.15,
        letterSpacing: 1.15,
        marginBottom: '1.5em',
    }



}));