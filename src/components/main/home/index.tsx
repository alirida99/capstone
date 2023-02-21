import { useRouter } from "next/router";
import React, { useState } from "react"
import { useAuth } from "../../../../context/AuthContext";
import Header from "../../../common/Header/Header";
import { ThemeProvider } from '@mui/system';
import { Button, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import theme from "../../../styles/theme"
import Banner from '../../../components/main/banner';
import SlideShow from '../../../components/main/slideShow';
import Footer from '../../../components/main/footer';
import AppBar from '../../../components/main/appBar';
import TutorialMenu from '../../../components/main/tutorialMenu';

import { ListItemIcon, ListItemButton } from "@mui/material";
import { AppbarContainer, MyList } from "../../../styles/appBar";
import SearchIcon from "@mui/icons-material/Search"
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import ContactIcon from "@mui/icons-material/ContactMail";
import AdminIcon from "@mui/icons-material/VerifiedUser";
import UserIcon from "@mui/icons-material/Login";
import { BannerContainer, BannerContent, BannerTitle } from "../../../styles/banner";
import { useTheme } from "@mui/material/styles";
import QuizIcon from '@mui/icons-material/Quiz';
import Image from "next/image";
import PromptLogin from "../../../common/PromptLogin";

const HomeComponent = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    // const [tutorials, setTutorials] = useState(false);
    const [tutorialsShow, setTutorialsShow] = useState(false);
    const [showLoginModale, setshowLoginModale] = React.useState(false);

    useEffect(() => {
        document.title = "E-Board - Home"
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="xl"
                sx={{
                    background: '#fff'
                }}
            >
                {/* <AppBar /> */}

                <AppbarContainer>
                    <PromptLogin title="Sign in to explore the EBoard World" open={showLoginModale}
                        handleClose={() => { setshowLoginModale(false) }} />
                    {/* < img style={{ width: 200, height: 60 }} src="/images/eboardlogo.jpg" /> */}
                    <Image src='/images/eboardlogo.jpg' width={200} height={60} alt="logo" />

                    <MyList type="row">

                        {/* <ListItemButton onClick={() => (alert('You must Login'))} >
                    <ListItemIcon>
                        <SearchIcon />
                        <label >Search</label>
                    </ListItemIcon>
                </ListItemButton> */}

                        <ListItemButton > <ListItemIcon><HomeIcon /></ListItemIcon>Home </ListItemButton>
                        <ListItemButton
                            // onClick={() => setTutorialsShow(!tutorialsShow)}
                            onClick={() => { setshowLoginModale(true) }}
                        > <ListItemIcon><BookIcon /></ListItemIcon>Tutorials </ListItemButton>
                        <ListItemButton onClick={() => { setshowLoginModale(true) }}> <ListItemIcon ><QuizIcon /></ListItemIcon>Exercises </ListItemButton>
                        <ListItemButton href="/admins/adminsLogin"> <ListItemIcon><AdminIcon /></ListItemIcon>Admin </ListItemButton>
                        <ListItemButton href="/logIn"> <ListItemIcon><UserIcon /></ListItemIcon>User </ListItemButton>
                    </MyList>

                </AppbarContainer>

                {!tutorialsShow
                    ?
                    <Grid>
                        < Banner />
                        <SlideShow />
                    </Grid>
                    :
                    <TutorialMenu />
                }
                <Footer />
            </Container>
        </ThemeProvider>
    );
}

export default HomeComponent;