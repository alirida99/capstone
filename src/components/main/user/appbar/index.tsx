import { useRouter } from 'next/router';
import { useAuth } from "../../../../../context/AuthContext";

import { ListItemIcon, ListItemButton, ThemeProvider, Container } from "@mui/material";
import { AppbarContainer, MyList } from "../../../../styles/appBar";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileIcon from '@mui/icons-material/AssignmentInd';
import Image from "next/image";


function UserAppbar() { //update profile information form 
    const { user, logout } = useAuth();
    const router = useRouter()


    return (
        <>
            <Container
                maxWidth="xl"
                sx={{
                    background: '#fff'
                }}
            >
                <AppbarContainer>
                    <Image src='/images/eboardlogo.jpg' width={200} height={60} alt="logo" />
                    <MyList type='row'>
                        <ListItemButton onClick={() => { router.push('/user/userHome') }}> <ListItemIcon><HomeIcon /></ListItemIcon>Home </ListItemButton>
                        <ListItemButton
                            onClick={() => { router.push('/user/userProfile') }}
                        > <ListItemIcon><ProfileIcon /></ListItemIcon>Profile </ListItemButton>
                        <ListItemButton
                            onClick={() => { router.push('/user/userTutorialList') }}
                        > <ListItemIcon><BookIcon /></ListItemIcon>Tutorials </ListItemButton>
                        <ListItemButton onClick={() => { router.push('/user/userExamList') }}> <ListItemIcon ><QuizIcon /></ListItemIcon>Exams </ListItemButton>
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
            </Container>

        </>


    );

}
export default UserAppbar;