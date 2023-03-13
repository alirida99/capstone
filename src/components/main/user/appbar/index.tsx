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
import { useContext, useEffect, useState } from 'react';
import AppContext from '@/components/AppContext/AppContext';
import React from 'react';


function UserAppbar() { //update profile information form 
    const { user, logout } = useAuth();
    const router = useRouter();

    const [users, setUsers] = useState([] as any);
    const [myUser, setMyUser] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [thissUser, setThisUser] = useState([] as any);
    const context = useContext(AppContext);

    const thisUser = users.filter((user: any) => {
        return user.email === `${thissUser.map((email: any) => email.userEmail)}`;
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json');
            const responseUser = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/currentUser.json');

            if (!response.ok || !responseUser.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();
            const responseUserData = await responseUser.json();

            const loadedCurrentUser = [];
            const loadedUsers = [];

            for (const key in responseData) {
                loadedUsers.push({
                    id: key,
                    firstName: responseData[key].firstName,
                    familyName: responseData[key].familyName,
                    email: responseData[key].email,
                    phoneNumber: responseData[key].phoneNumber,
                    age: responseData[key].age,
                    password: responseData[key].password,
                });
            }
            for (const key in responseUserData) {
                loadedCurrentUser.push({
                    id: key,
                    userEmail: responseUserData[key].userEmail,
                });
            }
            setThisUser(loadedCurrentUser)
            setUsers(loadedUsers);
            setMyUser(thisUser)
            setIsLoading(false);
        }
        fetchUsers().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, [thisUser]);

    const deleteUser = (userID: any) => {
        fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/currentUser.json`, {
            method: 'DELETE',
        }).then(response => {
            setThisUser((prevUsers: any) =>
                prevUsers.filter((user: any) => user.id !== userID)
            )
        });
    }


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
                        <ListItemButton onClick={() => {
                            router.push('/user/userHome')
                        }}> <ListItemIcon><HomeIcon /></ListItemIcon>Home </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                router.push({
                                    pathname: '/user/userProfile',
                                    query: {
                                        user: myUser
                                    }
                                })
                            }}
                        > <ListItemIcon><ProfileIcon /></ListItemIcon>Profile </ListItemButton>
                        <ListItemButton
                            onClick={() => {
                                router.push({
                                    pathname: '/user/userTutorialList',
                                    query: {
                                        user: myUser
                                    }
                                })
                            }}
                        > <ListItemIcon><BookIcon /></ListItemIcon>Tutorials </ListItemButton>
                        <ListItemButton onClick={() => {
                            router.push({
                                pathname: '/user/userExamList',
                                query: {
                                    user: `${myUser.map((user: any) => user.id)}`
                                }
                            })
                        }}> <ListItemIcon ><QuizIcon /></ListItemIcon>Exams </ListItemButton>
                        {/* {user ? */}
                        <ListItemButton onClick={() => {
                            logout()
                            router.push('/')
                            deleteUser(`${thissUser.map((user: any) => user.id)}`)
                        }}> <ListItemIcon><LogoutIcon /></ListItemIcon>Logout </ListItemButton>
                        {/* : */}
                        <></>
                        {/* } */}
                    </MyList>

                </AppbarContainer>
            </Container>

        </>


    );

}
export default UserAppbar;