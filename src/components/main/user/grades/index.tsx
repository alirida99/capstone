import styles from './grades.module.scss'
import Footer from "../../footer";
import UserAppbar from "../appbar";
import Icon from '@mui/material/Icon';
import Back from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function Grades() {
    const router = useRouter();
    const [thisEmail, setThisEmail] = useState([] as any);
    const [users, setUsers] = useState([] as any);
    const [myUser, setMyUser] = useState([] as any);
    const [myGrades, setMyGrades] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    const thisUser = users.filter((user: any) => {
        return user.email === `${thisEmail.map((email: any) => email.userEmail)}`;
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json');
            const responseUser = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/currentUser.json');
            const responseGrades = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users/${myUser.map((user: any) => user.id)}/grades.json`);

            if (!response.ok || !responseUser.ok || !responseGrades.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();
            const responseUserData = await responseUser.json();
            const responseGradesData = await responseGrades.json();

            const loadedUsers = [];
            const loadedCurrentUser = [];
            const loadedGrades = [];

            for (const key in responseData) {
                loadedUsers.push({
                    id: key,
                    firstName: responseData[key].firstName,
                    familyName: responseData[key].familyName,
                    email: responseData[key].email,
                    phoneNumber: responseData[key].phoneNumber,
                    age: responseData[key].age,
                    password: responseData[key].password,
                    grades: responseData[key].grades,
                });
            }
            for (const key in responseUserData) {
                loadedCurrentUser.push({
                    id: key,
                    userEmail: responseUserData[key].userEmail,
                });
            }
            for (const key in responseGradesData) {
                loadedGrades.push({
                    id: key,
                    examTitle: responseGradesData[key].examTitle,
                    gradePercent: responseGradesData[key].gradePercent,
                });
            }

            setMyGrades(loadedGrades);
            setThisEmail(loadedCurrentUser);
            setUsers(loadedUsers);
            setMyUser(thisUser);
            setIsLoading(false);
        }
        fetchUsers().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
        console.log(myGrades)
    }, [myGrades, myUser, thisUser]);

    return (
        <>
            <div style={{
                backgroundImage: "url(/background.jpg)",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',

            }}>
                <UserAppbar />
                <div className={styles.container}>
                    <button className={styles.back} onClick={() => { router.push('/user/userProfile') }}> <Icon><Back /></Icon></button>
                    <h1 className={styles.titletext} >Grades</h1>
                    {!isLoading && !httpError && myGrades?.map((grades: any) => {
                        return (
                            <div className={styles.skillboxtitle} key={grades.id}>
                                <span >{grades.examTitle}</span>
                                <div className={styles.skillboxbar}>
                                    <span className={styles.skillboxper} style={{ width: `${grades.gradePercent}%` }}>
                                        <span className={styles.skillpertooltip}>{grades.gradePercent} %</span>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                    {!httpError && isLoading &&
                        <HourglassTopIcon sx={{ width: '50px', height: '50px', color: 'green' }} />
                    }
                </div><Footer /></div>
        </>

    );
}
export default Grades;