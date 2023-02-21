import { useRouter } from "next/router";
import React, { useState } from "react"
import { useAuth } from "../../../../../context/AuthContext";
import Header from "../../../../common/Header/Header";
import { ThemeProvider } from '@mui/system';
import { Button, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import theme from "../../../../styles/theme"
import Banner from '../../../../components/main/banner';
import SlideShow from '../../../../components/main/slideShow';
import Footer from '../../../../components/main/footer';
import AppBar from '../../../../components/main/appBar';
import TutorialMenu from '../../../../components/main/tutorialMenu';

import { ListItemIcon, ListItemButton } from "@mui/material";
import { AppbarContainer, MyList } from "../../../../styles/appBar";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from "next/image";
import ExercisesForm from "../exercises";
import TutorialsComponent from "../tutorials";

const AdminsHomeComponent = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    // const [tutorialsShow, setTutorialsShow] = useState(false);
    // const [exercisesShow, setExercisesShow] = useState(false);

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
                <AppbarContainer>
                    <Image src='/images/eboardlogo.jpg' width={200} height={60} alt="logo" />
                    <MyList type="row">
                        <ListItemButton onClick={() => { router.push('/admins/adminsHome') }}> <ListItemIcon><HomeIcon /></ListItemIcon>Home </ListItemButton>
                        <ListItemButton
                            onClick={() => { router.push('/admins/tutorials') }}
                        > <ListItemIcon><BookIcon /></ListItemIcon>Tutorials </ListItemButton>
                        <ListItemButton onClick={() => { router.push('/admins/exercises') }}> <ListItemIcon ><QuizIcon /></ListItemIcon>Exams </ListItemButton>
                        {user ?
                            <ListItemButton onClick={() => {
                                logout()
                                router.push('/')
                            }}> <ListItemIcon><LogoutIcon /></ListItemIcon>Logout </ListItemButton>
                            :
                            <></>
                        }
                    </MyList>

                </AppbarContainer>
                {/* {tutorialsShow &&
                    <TutorialsComponent />
                }
                {exercisesShow &&
                    <ExercisesForm />
                } */}
                {/* <Footer /> */}
            </Container>
        </ThemeProvider>
    );
}

export default AdminsHomeComponent;