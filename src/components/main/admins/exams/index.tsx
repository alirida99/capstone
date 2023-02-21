import React, { useEffect, useState } from "react";
import styles from './exams.module.scss';
import AdminsHomeComponent from "../home";
import { Box, Grid } from "@mui/material";
import ExamsList from "./ExamsList";
import AddEditExam from "./AddEditExam";

const ExamsComponent = () => {
    const [addEditExamsMode, setAddEditExamsMode] = useState(false);
    const [addExamsMode, setAddExamsMode] = useState(false);
    const [exams, setExams] = useState([] as any);
    const [examsInfo, setExamsInfo] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchExams = async () => {
            const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/exams.json');

            if (!response.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();

            const loadedExams = [];

            for (const key in responseData) {
                loadedExams.push({
                    id: key,
                    type: responseData[key].type,
                    numberOfQuestions: responseData[key].noq,
                    time: responseData[key].time,
                    questions: responseData[key].questions,
                });
            }
            setExams(loadedExams);
            setIsLoading(false);
        }
        fetchExams().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, []);

    async function addExamsHandler(exam: any) {
        const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/exams.json', {
            method: 'POST',
            body: JSON.stringify(exam),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddEditExamsMode(false);
        setAddExamsMode(false);
    }

    async function editExamsHandler(exam: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/exams/${examsInfo.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(exam),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddEditExamsMode(false);
        setAddExamsMode(false);
    }

    const deletingExams = (examId: any) => {
        fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/exams/${examId}.json`, {
            method: 'DELETE',
        }).then(response => {
            setExams((prevExams: any) =>
                prevExams.filter((exam: any) => exam.id !== examId)
            )
        });
    }

    const cancel = () => {
        setAddEditExamsMode(false);
        setAddExamsMode(false);
    }

    const edit = (examInfo: any) => {
        setAddExamsMode(false);
        setAddEditExamsMode(true);
        setExamsInfo(examInfo);
    }

    return (
        <>
            <AdminsHomeComponent />
            {!addEditExamsMode &&
                <Box>
                    <Grid className={styles.bigTitle}>Exams</Grid>
                    {!isLoading && !httpError && exams.length > 0 &&
                        <Grid>
                            <table className={styles.listTable}>
                                <thead className={styles.theadList}>
                                    <tr>
                                        <th>Type</th>
                                        <th>Number Of Questions</th>
                                        <th>Timing</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exams.map((exam: any) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <ExamsList
                                            key={exam.id}
                                            id={exam.id}
                                            type={exam.type}
                                            noq={exam.numberOfQuestions}
                                            time={exam.time}
                                            questions={exam.questions}
                                            edit={edit}
                                            onRemoveItem={deletingExams}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <Grid style={{ textAlign: 'center' }}>
                                <button onClick={() => { setAddEditExamsMode(true); setAddExamsMode(true); }} className={styles.btnAddExams}>Add New Exam</button>
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
                    {exams.length === 0 && !isLoading && !httpError &&
                        <Grid>
                            <section className={styles.noExams}>
                                No Exams Yet..
                            </section>
                            <Grid style={{ textAlign: 'center' }}>
                                <button onClick={() => { setAddEditExamsMode(true); setAddExamsMode(true); }} className={styles.btnAddExams}>Add New Exam</button>
                            </Grid>
                        </Grid>
                    }
                </Box>
            }
            {addEditExamsMode &&
                <AddEditExam
                    addExamMode={addExamsMode}
                    onAdd={addExamsHandler}
                    onEdit={editExamsHandler}
                    examsInfo={examsInfo}
                    cancel={cancel}
                />
            }
        </>
    )
}

export default ExamsComponent;