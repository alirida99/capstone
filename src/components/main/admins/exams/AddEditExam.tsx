import React, { useEffect, useState } from "react";
import styles from './exams.module.scss';
import { Autocomplete, Box, Chip, Grid, MenuItem, Select, Stack, TextField } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import FormikField from "../../../general/Layouts/TextField/FormikField";
import AddQuestions from "./AddQuestions";
import { LoadingButton } from "@mui/lab";

const AddEditExam = (props: any) => {
    const addExamMode = props.addExamMode;
    const examInfo = props.examsInfo;
    const [tutorials, setTutorials] = useState([] as any);
    const [questions, setQuestions] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [showAddQuestions, setAddQuestions] = useState(false);
    const [index, setIndex] = useState("")

    useEffect(() => {
        const fetchTutorials = async () => {
            const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials.json');
            const responseQuestions = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/exams/${examInfo.id}/questions.json`);

            if (!response.ok && !responseQuestions.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();
            const responseDataQues = await responseQuestions.json();

            const loadedTutorials = [];
            const loadedQuestions = [];

            for (const key in responseData) {
                loadedTutorials.push({
                    id: key,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    creatingDate: responseData[key].creatingDate,
                    topic: responseData[key].topic,
                });
            }
            for (const key in responseDataQues) {
                loadedQuestions.push({
                    id: key,
                    grade: responseDataQues[key].grade,
                    sentence1: responseDataQues[key].sentence1,
                    sentence2: responseDataQues[key].sentence2,
                    trueAnswer: responseDataQues[key].trueAnswer,
                    type: responseDataQues[key].type,
                    options: responseDataQues[key].options,
                });
            }
            setTutorials(loadedTutorials);
            setQuestions(loadedQuestions)
            setIsLoading(false);
        }
        fetchTutorials().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, [examInfo.id, questions]);

    const qTypee = questions.map((question: any) => {
        return question.type
    })
    const [question, setQuestion] = useState([] as any)

    const initialValues = {
        id: Math.random(),
        type: addExamMode ? "" : examInfo.type,
        noq: addExamMode ? "" : examInfo.noq,
        time: addExamMode ? "" : examInfo.time,
        qType: addExamMode ? "" : "",
        qSentence1: addExamMode ? "" : "",
        qSentence2: addExamMode ? "" : "",
        qTrueAnswer: addExamMode ? "" : "",
        qOptions: addExamMode ? [] : [],
        qGrade: addExamMode ? "" : "",
    };
    const validationSchema = Yup.object().shape({
        type: Yup.string()
            .required('Type is required!'),
        noq: Yup.string()
            .required('Number Of Questions is required!'),
        time: Yup.string()
            .required('Time is required!'),
        qType: Yup.string()
            .required('Question Type is required!'),
        qSentence1: Yup.string()
            .required('First Sentence is required!'),
        qSentence2: Yup.string()
            .required('Second Sentence is required!'),
        qOptions: Yup.array()
            .transform(function (value, originalValue) {
                if (this.isType(value) && value !== null) {
                    return value;
                }
                return originalValue ? originalValue.split(/[\s,]+/) : [];
            })
            .required("Options are required!"),
        qTrueAnswer: Yup.string()
            .required('True answer is required!'),
        qGrade: Yup.string()
            .required('Grade is required!'),
    })
    function onSubmit(values: any) {
        const exam = {
            type: values.type,
            noq: values.noq,
            time: values.time,
            questions: [
                {
                    type: values.qType,
                    sentence1: values.qSentence1,
                    sentence2: values.qSentence2,
                    trueAnswer: values.qTrueAnswer,
                    options: values.qOptions,
                    grade: values.qGrade,
                }
            ]
        }
        console.log("--------------")
        console.log(exam);
        props.onAdd(exam);
    }

    function onEditSubmit(values: any) {
        console.log("--------------")
        const exam = {
            type: values.type,
            noq: values.noq,
            time: values.time,
            questions: [
                {
                    type: values.qType,
                    sentence1: values.qSentence1,
                    sentence2: values.qSentence2,
                    trueAnswer: values.qTrueAnswer,
                    options: values.qOptions,
                    grade: values.qGrade,
                }
            ]
        }
        console.log(exam);
        props.onEdit(exam);
    }
    const cancel = () => {
        setAddQuestions(false);
    }
    async function addQuestionHandler(question: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/exams/${examInfo.id}/questions.json`, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddQuestions(false);
    }
    function onQuesSubmit(values: any) {
        const question = {
            type: values.qType,
            sentence1: values.qSentence1,
            sentence2: values.qSentence2,
            trueAnswer: values.qTrueAnswer,
            options: values.qOptions,
            grade: values.qGrade,
        }
        console.log("--------------")
        console.log(question);
        addQuestionHandler(question);
    }
    const deletingQuestion = (quesId: any) => {
        fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/exams/${examInfo.id}/questions/${quesId}.json`, {
            method: 'DELETE',
        }).then(response => {
            setQuestions((prevQues: any) =>
                prevQues.filter((question: any) => question.id !== quesId)
            )
        });
    }

    const filtered = tutorials.filter((tutorial: any) => !props.exams.some((exam: any) => exam.type === tutorial.title))

    return (
        <Box>
            <Grid container>
                <Grid className={styles.create} xs={12}>{addExamMode ? 'Add New Exam' : 'Edit Exam'}</Grid>
                <Grid xs={12} className={styles.TutorialTitle}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={
                            addExamMode && onSubmit ||
                            !addExamMode && !showAddQuestions && onEditSubmit ||
                            !addExamMode && showAddQuestions && onQuesSubmit
                        }>
                        {({ errors, touched, isSubmitting, values, setFieldValue, handleBlur, handleChange }) => {
                            return (
                                <Form>
                                    {!showAddQuestions &&
                                        <Grid>
                                            <Grid container>
                                                <Grid item xs={0.5}></Grid>
                                                <Grid item xs={3}>
                                                    <Grid item xs={12} paddingBottom={0} sx={{
                                                        width: "100%",
                                                        height: '63px',
                                                    }}>
                                                        <span style={{
                                                            width: "98px",
                                                            height: "20px",
                                                            fontSize: "16px",
                                                            lineHeight: "1.25",
                                                        }}>Exam Type</span>
                                                        <Select
                                                            id="type"
                                                            name="type"
                                                            placeholder="Select your exam Type"
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                marginTop: "20px",
                                                                "& .MuiOutlinedInput-root": {
                                                                    height: { xs: "44px", lg: "64px" },
                                                                    padding: {
                                                                        xs: "10px 0 10px 0",
                                                                        lg: "20px 0 20px 0",
                                                                    },
                                                                    borderRadius: { xs: "8px", lg: "10px" },
                                                                    color: { xs: "#3b3b3b" },
                                                                    fontSize: { xs: "16px", lg: "18px" },
                                                                },
                                                            }}
                                                            value={values.type}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={
                                                                ((errors.type as unknown) as boolean) &&
                                                                ((touched.type as unknown) as boolean)
                                                            }
                                                        >
                                                            <MenuItem disabled value="">--Select your exam type--</MenuItem>
                                                            {addExamMode && filtered.map((tutorial: any) => {
                                                                return (
                                                                    <MenuItem key={tutorial.title} value={tutorial.title}>
                                                                        {tutorial.title}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                            )}
                                                            {!addExamMode && tutorials.map((tutorial: any) => {
                                                                return (
                                                                    <MenuItem key={tutorial.title} value={tutorial.title}>
                                                                        {tutorial.title}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                            )}
                                                        </Select>
                                                        {((errors.type as unknown) as boolean) &&
                                                            ((touched.type as unknown) as boolean) ? (
                                                            <ErrorMessage name={"type"}>
                                                                {(msg) => (
                                                                    <div className={styles.errorStyle}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        ) : null}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={3}>
                                                    <Grid item xs={12} paddingBottom={0} sx={{
                                                        width: "100%",
                                                        height: "100px",
                                                    }}>
                                                        <span style={{
                                                            width: "98px",
                                                            height: "20px",
                                                            fontSize: "16px",
                                                            lineHeight: "1.25",
                                                        }}>Number Of Questions</span>
                                                        <FormikField
                                                            name="noq"
                                                            placeholder={"Number Of Questions"}
                                                            // defaultValue={addExamMode ? '' : tutorialInfo.noq}
                                                            value={values.noq}
                                                            type="number"
                                                            error={
                                                                ((errors.noq as unknown) as boolean) &&
                                                                ((touched.noq as unknown) as boolean)
                                                            }
                                                            sx={{
                                                                marginTop: "20px",
                                                                "& .MuiOutlinedInput-root": {
                                                                    height: { xs: "44px", lg: "64px" },
                                                                    padding: {
                                                                        xs: "10px 0 10px 0",
                                                                        lg: "20px 0 20px 0",
                                                                    },
                                                                    borderRadius: { xs: "8px", lg: "10px" },
                                                                    color: { xs: "#3b3b3b" },
                                                                    fontSize: { xs: "16px", lg: "18px" },
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={3}>
                                                    <Grid item xs={12} paddingBottom={0} sx={{
                                                        width: "100%",
                                                        height: "100px",
                                                    }}>
                                                        <span style={{
                                                            width: "98px",
                                                            height: "20px",
                                                            fontSize: "16px",
                                                            lineHeight: "1.25",
                                                        }}>Time Of Exam(in minutes)</span>
                                                        <FormikField
                                                            name="time"
                                                            placeholder={"Time on minutes"}
                                                            // defaultValue={addExamMode ? '' : tutorialInfo.time}
                                                            value={values.time}
                                                            type="number"
                                                            error={
                                                                ((errors.time as unknown) as boolean) &&
                                                                ((touched.time as unknown) as boolean)
                                                            }
                                                            sx={{
                                                                marginTop: "20px",
                                                                "& .MuiOutlinedInput-root": {
                                                                    height: { xs: "44px", lg: "64px" },
                                                                    padding: {
                                                                        xs: "10px 0 10px 0",
                                                                        lg: "20px 0 20px 0",
                                                                    },
                                                                    borderRadius: { xs: "8px", lg: "10px" },
                                                                    color: { xs: "#3b3b3b" },
                                                                    fontSize: { xs: "16px", lg: "18px" },
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={0.5}></Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid>
                                                    <Grid className={styles.addMore}>{!props.showAddQuestions ? "Questions" : "Add New Question"}</Grid>
                                                </Grid>
                                                {addExamMode &&
                                                    <Grid>
                                                        <Grid>
                                                            <AddQuestions
                                                                errors={errors}
                                                                touched={touched}
                                                                values={values}
                                                                setFieldValue={setFieldValue}
                                                                handleChange={handleChange}
                                                                handleBlur={handleBlur}
                                                                addExamMode={addExamMode}
                                                                cancel={cancel}
                                                                showAddQuestions={showAddQuestions}
                                                                isSubmitting={isSubmitting}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                }
                                                {!addExamMode &&
                                                    <Grid>
                                                        {questions && questions.map((question: any, i: any) => {
                                                            setIndex(i + 1)
                                                            return (
                                                                <Grid key={question.id}>
                                                                    <AddQuestions
                                                                        index={i + 1}
                                                                        id={question.id}
                                                                        question={question}
                                                                        errors={errors}
                                                                        touched={touched}
                                                                        values={values}
                                                                        setFieldValue={setFieldValue}
                                                                        handleChange={handleChange}
                                                                        handleBlur={handleBlur}
                                                                        showAddQuestions={showAddQuestions}
                                                                        addExamMode={addExamMode}
                                                                        isSubmitting={isSubmitting}
                                                                        deletingQuestion={deletingQuestion}
                                                                    />
                                                                </Grid>
                                                            )
                                                        }
                                                            // }
                                                        )}
                                                        {index < values.noq &&
                                                            <Grid className={styles.submitting}>
                                                                <button className={styles.btnSave}
                                                                    onClick={() => setAddQuestions(true)}>
                                                                    Add Question
                                                                </button>
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Grid>
                                    }
                                    {showAddQuestions &&
                                        <Grid>
                                            <Grid>
                                                <Grid>
                                                    <Grid className={styles.addMore}>{"Add New Question"}</Grid>
                                                </Grid>
                                                <AddQuestions
                                                    errors={errors}
                                                    touched={touched}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    addExamMode={addExamMode}
                                                    cancel={cancel}
                                                    showAddQuestions={showAddQuestions}
                                                    isSubmitting={isSubmitting}
                                                />
                                            </Grid>
                                            <Grid className={styles.submitting}>
                                                <button type="submit" className={styles.btnSave} disabled={isSubmitting}>
                                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                    ADD
                                                </button>
                                                <button className={styles.btnCancel} onClick={cancel}>Cancel</button>
                                            </Grid>
                                        </Grid>
                                    }
                                    {!showAddQuestions &&
                                        <Grid className={styles.submitting}>
                                            <button type="submit" className={styles.btnSave} disabled={isSubmitting}>
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                {addExamMode ? "Create" : "Save"}
                                            </button>
                                            <button className={styles.btnCancel} onClick={props.cancel}>Cancel</button>
                                        </Grid>
                                    }
                                </Form>
                            );
                        }}
                    </Formik>
                </Grid>
            </Grid>
            {/* {showAddQuestions &&
                <AddQuestions />
            } */}
        </Box >
    )
}

export default AddEditExam;