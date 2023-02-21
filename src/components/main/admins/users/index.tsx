import React, { useEffect, useState } from "react";

import styles from './users.module.scss';
import { Box, Grid } from "@mui/material";
import UsersList from "./UsersList";
import AdminsHomeComponent from "../home";
import AddEditUser from "./AddEditUser";

const UsersComponent = () => {
    const [users, setUsers] = useState([] as any);
    const [addUserShow, setAddUserShow] = useState(false);
    const [addUserMode, setAddUserMode] = useState(false);
    const [userInfo, setUserInfo] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json');

            if (!response.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();

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

            setUsers(loadedUsers);
            setIsLoading(false);
        }
        fetchUsers().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, []);

    async function addUserHandler(user: any) {
        const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddUserShow(false);
    }

    async function editUserHandler(user: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users/${userInfo.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddUserShow(false);
    }

    const deletingUsers = (userId: any) => {
        fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: 'DELETE',
        }).then(response => {
            setUsers((prevUsers: any) =>
                prevUsers.filter((user: any) => user.id !== userId)
            )
        });
    }

    const cancel = () => {
        setAddUserShow(false);
        setAddUserMode(false);
    }

    const edit = (userInfo: any) => {
        setAddUserShow(true);
        setUserInfo(userInfo);
        console.log(userInfo)
    }

    return (
        <Box>
            <AdminsHomeComponent />
            {!addUserShow &&
                <Grid>
                    <Grid className={styles.bigTitle}>Users</Grid>
                    {!isLoading && !httpError && users.length > 0 &&
                        <Grid sx={{ padding: '0 100px' }}>
                            <table className={styles.listTable}>
                                <thead className={styles.theadList}>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Age</th>
                                        <th>Phone Number</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: any) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <UsersList
                                            key={user.id}
                                            id={user.id}
                                            email={user.email}
                                            age={user.age}
                                            familyName={user.familyName}
                                            firstName={user.firstName}
                                            password={user.password}
                                            phoneNumber={user.phoneNumber}
                                            edit={edit}
                                            onRemoveItem={deletingUsers}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <Grid style={{ textAlign: 'center' }}>
                                <button onClick={() => { setAddUserShow(true); setAddUserMode(true) }} className={styles.btnAddTutorial}>Add New User</button>
                            </Grid>
                        </Grid>
                    }
                    {isLoading && !httpError &&
                        <section className={styles.loading}>
                            Loading...
                        </section>
                    }
                    {!isLoading && httpError &&
                        <section className={styles.error}>
                            {httpError}
                        </section>
                    }
                    {users.length === 0 && !isLoading && !httpError &&
                        <Grid>
                            <section className={styles.noTutorials}>
                                No Users Yet..
                            </section>
                            <Grid style={{ textAlign: 'center' }}>
                                <button onClick={() => { setAddUserShow(true); setAddUserMode(true) }} className={styles.btnAddTutorial}>Add New User</button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            }
            {addUserShow &&
                <AddEditUser
                    onAdd={addUserHandler}
                    onEdit={editUserHandler}
                    usersList={users}
                    cancel={cancel}
                    userInfo={userInfo}
                    addUserMode={addUserMode}
                />
            }
        </Box>
    );
}

export default UsersComponent;