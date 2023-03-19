import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import styles from './tutorials.module.scss';
import AdminsHomeComponent from "../home";
import Footer from "../../footer";
import TutorialList from "./TutorialList";
import AddTutorialsComponent from "./AddTutorial";
import axios from "axios";

const TutorialsComponent = (props: any) => {

    const [tutorials, setTutorials] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [addTutorialShow, setAddTutorialShow] = useState(false);
    const [addTutorialMode, setAddTutorialMode] = useState(false);
    const [tutorialInfo, setTutorialInfo] = useState([] as any);
    const [exams, setExams] = useState([] as any);

    useEffect(() => {
        const fetchTutorials = async () => {
            const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials.json');
            const responseExams = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/exams.json');

            if (!response.ok || !responseExams.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();
            const responseExamsData = await responseExams.json();

            const loadedTutorials = [];
            const loadedExams = [];

            for (const key in responseData) {
                loadedTutorials.push({
                    id: key,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    creatingDate: responseData[key].creatingDate,
                    topic: responseData[key].topic,
                });
            }

            for (const key in responseExamsData) {
                loadedExams.push({
                    id: key,
                    type: responseExamsData[key].type,
                    numberOfQuestions: responseExamsData[key].noq,
                    time: responseExamsData[key].time,
                    questions: responseExamsData[key].questions,
                });
            }

            setTutorials(loadedTutorials);
            setExams(loadedExams);
            setIsLoading(false);
        }
        fetchTutorials().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, []);

    async function addTutorialHandler(tutorial: any) {
        const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials.json', {
            method: 'POST',
            body: JSON.stringify(tutorial),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddTutorialShow(false);
    }

    async function editTutorialHandler(tutorial: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(tutorial),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddTutorialShow(false);
    }

    const deletingTutorials = (tutorialInfo: any) => {
        fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}.json`, {
            method: 'DELETE',
        }).then(response => {
            setTutorials((prevTutorials: any) =>
                prevTutorials.filter((tutorial: any) => tutorial.id !== tutorialInfo.id)
            )
        });
        const thisExam = exams.filter((exam: any) => {
            return `${exam.type}`.toLowerCase() === `${tutorialInfo.title}`.toLowerCase();
        });
        fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/exams/${thisExam.map((exam: any) => exam.id)}.json`, {
            method: 'DELETE',
        }).then(response => {
            setExams((prevExams: any) =>
                prevExams.filter((exam: any) => exam.id !== thisExam.map((exam: any) => exam.id))
            )
        });
    }

    const cancel = () => {
        setAddTutorialShow(false);
        setAddTutorialMode(false);
    }

    const edit = (tutorialInfo: any) => {
        setAddTutorialShow(true);
        setTutorialInfo(tutorialInfo);
        console.log(tutorialInfo)
    }

    return (
        <Box>
            <AdminsHomeComponent />
            {!addTutorialShow &&
                <Grid>
                    <Grid className={styles.bigTitle}>Tutorials</Grid>
                    {!isLoading && !httpError && tutorials.length > 0 &&
                        <Grid>
                            <table className={styles.listTable}>
                                <thead className={styles.theadList}>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Creating Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutorials.map((tutorial: any) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <TutorialList
                                            key={tutorial.id}
                                            id={tutorial.id}
                                            title={tutorial.title}
                                            creatingDate={tutorial.creatingDate}
                                            author={tutorial.author}
                                            topic={tutorial.topic}
                                            edit={edit}
                                            onRemoveItem={deletingTutorials}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <Grid style={{ textAlign: 'center' }}>
                                <button onClick={() => { setAddTutorialShow(true); setAddTutorialMode(true) }} className={styles.btnAddTutorial}>Add New Tutorial</button>
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
                    {tutorials.length === 0 && !isLoading && !httpError &&
                        <Grid>
                            <section className={styles.noTutorials}>
                                No Tutorials Yet..
                            </section>
                            <Grid style={{ textAlign: 'center' }}>
                                <button onClick={() => { setAddTutorialShow(true); setAddTutorialMode(true) }} className={styles.btnAddTutorial}>Add New Tutorial</button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            }
            {addTutorialShow &&
                <Grid>
                    <AddTutorialsComponent
                        onAdd={addTutorialHandler}
                        onEdit={editTutorialHandler}
                        tutorialList={tutorials}
                        cancel={cancel}
                        tutorialInfo={tutorialInfo}
                        addTutorialMode={addTutorialMode} />
                </Grid>
            }
        </Box>
    )
}

export default TutorialsComponent;