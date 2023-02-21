import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme";

export const BannerContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0px 0px',
    background: Colors.primary, //black
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
    }


}));
//image style
export const BannerImage = styled('img')(({ src, theme }) => ({
    src: `url(${src})`,
    width: '1010px',
    [theme.breakpoints.down('md')]: {
        width: '350px'
    },
    [theme.breakpoints.down('sm')]: {
        width: '320px',
        height: '300px'
    }




}));
export const BannerContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '30px',
    maxWidth: 420,
    // padding: '30px',
    color: Colors.white,
}));
export const BannerTitle = styled(Typography)(({ theme }) => ({
    lineHeight: 1.5,
    fontSize: '72px',
    marginBottom: '20px',
    color: Colors.white,
    [theme.breakpoints.down('sm')]: {
        fontSize: '42px',

    }



}));
export const BannerDescription = styled(Typography)(({ theme }) => ({
    lineHeight: 1.25,
    letterSpacing: 1.25,
    marginBottom: '3em',
    color: Colors.white,

    [theme.breakpoints.down('md')]: {
        lineHeight: 1.15,
        letterSpacing: 1.15,
        marginBottom: '1.5em',
    }



}));