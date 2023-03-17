import { Box, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import styles from './tutorials.module.scss';
import AdminsHomeComponent from "../home";
import AddEditTutorialsComponent from "./AddEdit";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Footer from "../../footer";
import FormikField from "../../../general/Layouts/TextField/FormikField";
import AddEditSubComponent from "./AddEditSub";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ViewAllSubs from "./ViewAllSubs";

const AddTutorialsComponent = (props: any) => {
    const addTutorialMode = props.addTutorialMode;
    const [topicInfo, setTopicInfo] = useState([] as any);
    const tutorialInfo = props.tutorialInfo;
    const [topicId, setTopicId] = useState("");

    const [topics, setTopics] = useState([] as any);
    const [subTopics, setSubTopics] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [viewSubtopics, setViewSubtopics] = useState(false);
    const [myTopics, setMyTopics] = useState([] as any)

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic.json`);

            if (!response.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();

            const loadedTutorials = [];

            for (const key in responseData) {
                loadedTutorials.push({
                    id: key,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    creatingDate: responseData[key].creatingDate,
                    subTopic: responseData[key].subTopic,
                });
            }

            setTopics(loadedTutorials);
            setIsLoading(false);
        }
        fetchTopics().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
        console.log(tutorialInfo)
    }, [topicId, topics.id, tutorialInfo]);

    const initialValues = {
        id: Math.random(),
        title: addTutorialMode ? "" : tutorialInfo.title,
        author: addTutorialMode ? "" : tutorialInfo.author,
        creatingDate: addTutorialMode ? "" : tutorialInfo.creatingDate,
        topicTitle: addTutorialMode ? "" : "",
        topicAuthor: addTutorialMode ? "" : "",
        topicCreatingDate: addTutorialMode ? "" : "",
        subTitle: addTutorialMode ? "" : "",
        subDescription: addTutorialMode ? "" : "",
        subExample: addTutorialMode ? "" : "",
    };

    function onSubmit(values: any) {
        const tutorial = {
            title: values.title,
            author: values.author,
            creatingDate: values.creatingDate,
            topic: [
                {
                    title: values.topicTitle,
                    author: values.topicAuthor,
                    creatingDate: values.topicCreatingDate,
                    subTopic: [
                        {
                            title: topics.map((topic: any) => topic.title),
                            description: topics.map((topic: any) => topic.description),
                            example: topics.map((topic: any) => topic.example),
                        }
                    ]
                }
            ]
        }
        console.log(tutorial);
        props.onAdd(tutorial);
    }

    function onEditSubmit(values: any) {
        const tutorial = {
            title: values.title,
            author: values.author,
            creatingDate: values.creatingDate,
            topic: myTopics,
        }
        console.log(tutorial);
        props.onEdit(tutorial);
    }

    const deletingTopics = (topicId: any) => {
        fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topicId}.json`, {
            method: 'DELETE',
        }).then(response => {
            setTopics((prevTopics: any) =>
                prevTopics.filter((topic: any) => topic.id !== topicId)
            )
        });
    }

    async function addTopicHandler(topic: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic.json`, {
            method: 'POST',
            body: JSON.stringify(topic),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddTopicsShow(false);
    }

    async function editTopicHandler(topic: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic.json`, {
            method: 'POST',
            body: JSON.stringify(topic),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddTopicsShow(false);
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required!'),
        author: Yup.string()
            .required('Author is required!'),
        creatingDate: Yup.string()
            .required('Creating Date is required!'),
        topicTitle: Yup.string()
            .required('Title is required!'),
        topicAuthor: Yup.string()
            .required('Author is required!'),
        topicCreatingDate: Yup.string()
            .required('Title is required!'),
    })

    const [addTopicsShow, setAddTopicsShow] = useState(false);
    const [addSubTopicsShow, setAddSubTopicsShow] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const cancel = () => {
        // setTimeout(() => {
        setAddTopicsShow(false);
        setAddMode(false);
        setAddSubTopicsShow(false);
        setViewSubtopics(false)
        // }, 5000);
    }

    return (
        <Box>
            {/* <AdminsHomeComponent /> */}
            {!addTopicsShow && !addSubTopicsShow && !viewSubtopics &&
                <Grid container>
                    <Grid container>
                        <Grid className={styles.create} xs={12}>{addTutorialMode ? 'Add New Tutorial' : 'Edit Tutorial'}</Grid>
                        <Grid xs={12} className={styles.TutorialTitle}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={addTutorialMode ? onSubmit : onEditSubmit}>
                                {({ errors, touched, isSubmitting, values, setFieldValue, handleBlur, handleChange }) => {
                                    return (
                                        <Form>
                                            <Grid container>
                                                <Grid item xs={0.5}></Grid>
                                                <Grid item xs={3}>
                                                    <FormikField
                                                        name="title"
                                                        placeholder={"Title"}
                                                        defaultValue={addTutorialMode ? '' : tutorialInfo.title}
                                                        // value={values.title}
                                                        type="text"
                                                        error={
                                                            ((errors.title as unknown) as boolean) &&
                                                            ((touched.title as unknown) as boolean)
                                                        }
                                                        sx={{
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
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={3}>
                                                    <FormikField
                                                        name="author"
                                                        placeholder={"Author"}
                                                        defaultValue={addTutorialMode ? '' : tutorialInfo.author}
                                                        // value={values.author}
                                                        type="text"
                                                        error={
                                                            ((errors.author as unknown) as boolean) &&
                                                            ((touched.author as unknown) as boolean)
                                                        }
                                                        sx={{
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
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={3}>
                                                    <FormikField
                                                        name="creatingDate"
                                                        placeholder={"Creating Date"}
                                                        defaultValue={addTutorialMode ? '' : tutorialInfo.creatingDate}
                                                        // value={values.creatingDate}
                                                        type="text"
                                                        error={
                                                            ((errors.creatingDate as unknown) as boolean) &&
                                                            ((touched.creatingDate as unknown) as boolean)
                                                        }
                                                        sx={{
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
                                                <Grid item xs={0.5}></Grid>
                                            </Grid>
                                            {addTutorialMode &&
                                                <Grid>
                                                    <Grid className={styles.create}>First Topic</Grid>
                                                    <Grid sx={{ marginBottom: '20px' }}>You can add more after you save...</Grid>
                                                    <Grid container>
                                                        <Grid item xs={0.5}></Grid>
                                                        <Grid item xs={3}>
                                                            <FormikField
                                                                name="topicTitle"
                                                                placeholder={"Title"}
                                                                type="text"
                                                                error={
                                                                    ((errors.topicTitle as unknown) as boolean) &&
                                                                    ((touched.topicTitle as unknown) as boolean)
                                                                }
                                                                sx={{
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
                                                        <Grid item xs={1}></Grid>
                                                        <Grid item xs={3}>
                                                            <FormikField
                                                                name="topicAuthor"
                                                                placeholder={"Author"}
                                                                type="text"
                                                                error={
                                                                    ((errors.topicAuthor as unknown) as boolean) &&
                                                                    ((touched.topicAuthor as unknown) as boolean)
                                                                }
                                                                sx={{
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
                                                        <Grid item xs={1}></Grid>
                                                        <Grid item xs={3}>
                                                            <FormikField
                                                                name="topicCreatingDate"
                                                                placeholder={"Creating Date"}
                                                                type="text"
                                                                error={
                                                                    ((errors.topicCreatingDate as unknown) as boolean) &&
                                                                    ((touched.topicCreatingDate as unknown) as boolean)
                                                                }
                                                                sx={{
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
                                                        <Grid item xs={0.5}></Grid>
                                                    </Grid>
                                                    <Grid className={styles.create}>First Sub-Topic</Grid>
                                                    <Grid sx={{ marginBottom: '20px' }}>You can add more after you save...</Grid>
                                                    <Grid container style={{ textAlign: 'center' }}>
                                                        <Grid item container xs={12} className={styles.subGrid}>
                                                            <Grid item xs={2}>
                                                                <label className={styles.TutorialTitleLetters}>Title</label>
                                                            </Grid>
                                                            <Grid item xs={7} sx={{ textAlign: 'left' }}>
                                                                <FormikField
                                                                    name="subTitle"
                                                                    // label={'title'}
                                                                    placeholder={"Title"}
                                                                    // inputProps={{ style: inpWidth }}
                                                                    type="text"
                                                                    error={
                                                                        ((errors.subTitle as unknown) as boolean) &&
                                                                        ((touched.subTitle as unknown) as boolean)
                                                                    }
                                                                    sx={{
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
                                                        <Grid item container xs={12} className={styles.subGrid}>
                                                            <Grid item xs={2}>
                                                                <label className={styles.TutorialTitleLetters}>Description</label>
                                                            </Grid>
                                                            <Grid item xs={10} sx={{ textAlign: 'left' }}>
                                                                <textarea onChange={handleChange} onBlur={handleBlur} name="subDescription" className={styles.SubTopicDesEx} />
                                                                {((errors.subDescription as unknown) as boolean) &&
                                                                    ((touched.subDescription as unknown) as boolean) ? (
                                                                    <ErrorMessage name={"subDescription"} component="dev">
                                                                        {(msg) => (
                                                                            <div className={styles.errorStyle}>{msg}</div>
                                                                        )}
                                                                    </ErrorMessage>
                                                                ) : null}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item container xs={12} className={styles.subGrid}>
                                                            <Grid item xs={2}>
                                                                <label className={styles.TutorialTitleLetters}>Example</label>
                                                            </Grid>
                                                            <Grid item xs={10} sx={{ textAlign: 'left' }}>
                                                                <textarea onChange={handleChange} onBlur={handleBlur} name="subExample" className={styles.SubTopicDesEx} />
                                                                <ErrorMessage name="subExample" component="div" className="invalid-feedback" />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            }
                                            {!addTutorialMode && topics.length > 0 && !isLoading && !httpError &&
                                                <Grid>
                                                    <Grid className={styles.create}>My Topics</Grid>
                                                    <Grid>
                                                        {topics && topics.map((topic: any, i: any) => {
                                                            setTopicId(topic.id)
                                                            setSubTopics(topic.subTopic)
                                                            const specificTopic = myTopics.find(
                                                                (topics: any) => topics.id === topic.id
                                                            );
                                                            return (
                                                                <Grid style={{ fontSize: "30px", marginBottom: '50px' }} key={topic.id}>
                                                                    <Grid>
                                                                        <Grid className={styles.numero}>{`Topic #${i + 1}`}</Grid>
                                                                    </Grid>
                                                                    <Grid container>
                                                                        <Grid item xs={0.5}></Grid>
                                                                        <Grid item xs={2.5}>
                                                                            <TextField
                                                                                id="topicTitle"
                                                                                name="topicTitle"
                                                                                placeholder={"Title"}
                                                                                defaultValue={addTutorialMode ? '' : topic.title}
                                                                                onChange={handleChange}
                                                                                onBlur={(e: any) => {
                                                                                    if (!specificTopic) {
                                                                                        setMyTopics((current: any) => [...current, { id: topic.id, title: e.target.value, author: '', creatingDate: '', subTopic: topic.subTopic }])
                                                                                    } else {
                                                                                        specificTopic.title = e.target.value
                                                                                    }
                                                                                }}
                                                                                sx={{
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
                                                                                variant="outlined" />
                                                                            {((errors.topicTitle as unknown) as boolean) &&
                                                                                ((touched.topicTitle as unknown) as boolean) ? (
                                                                                <ErrorMessage name={"topicTitle"} component="dev">
                                                                                    {(msg) => (
                                                                                        <div className={styles.errorStyle}>{msg}</div>
                                                                                    )}
                                                                                </ErrorMessage>
                                                                            ) : null}
                                                                            {/* <FormikField
                                                                                name="topicTitle"
                                                                                placeholder={"Title"}
                                                                                type="text"
                                                                                defaultValue={addTutorialMode ? '' : topic.title}
                                                                                // value={values.topicTitle}
                                                                                error={
                                                                                    ((errors.topicTitle as unknown) as boolean) &&
                                                                                    ((touched.topicTitle as unknown) as boolean)
                                                                                }
                                                                                sx={{
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
                                                                            /> */}
                                                                        </Grid>
                                                                        <Grid item xs={1}></Grid>
                                                                        <Grid item xs={2.5}>
                                                                            {/* <FormikField
                                                                                name="topicAuthor"
                                                                                placeholder={"Author"}
                                                                                type="text"
                                                                                defaultValue={addTutorialMode ? '' : topic.author}
                                                                                // value={values.topicAuthor}
                                                                                error={
                                                                                    ((errors.topicAuthor as unknown) as boolean) &&
                                                                                    ((touched.topicAuthor as unknown) as boolean)
                                                                                }
                                                                                sx={{
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
                                                                            /> */}
                                                                            <TextField
                                                                                id="topicAuthor"
                                                                                name="topicAuthor"
                                                                                placeholder={"Author"}
                                                                                defaultValue={addTutorialMode ? '' : topic.author}
                                                                                onChange={handleChange}
                                                                                onBlur={(e: any) => {
                                                                                    if (!specificTopic) {
                                                                                        setMyTopics((current: any) => [...current, { id: topic.id, title: '', author: e.target.value, creatingDate: '', subTopic: topic.subTopic }])
                                                                                    } else {
                                                                                        specificTopic.author = e.target.value
                                                                                    }
                                                                                }}
                                                                                sx={{
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
                                                                                variant="outlined" />
                                                                            {((errors.topicAuthor as unknown) as boolean) &&
                                                                                ((touched.topicAuthor as unknown) as boolean) ? (
                                                                                <ErrorMessage name={"topicAuthor"} component="dev">
                                                                                    {(msg) => (
                                                                                        <div className={styles.errorStyle}>{msg}</div>
                                                                                    )}
                                                                                </ErrorMessage>
                                                                            ) : null}
                                                                        </Grid>
                                                                        <Grid item xs={1}></Grid>
                                                                        <Grid item xs={2.5}>
                                                                            {/* <FormikField
                                                                                name="topicCreatingDate"
                                                                                placeholder={"Creating Date"}
                                                                                type="text"
                                                                                defaultValue={addTutorialMode ? '' : topic.creatingDate}
                                                                                // value={values.topicCreatingDate}
                                                                                error={
                                                                                    ((errors.topicCreatingDate as unknown) as boolean) &&
                                                                                    ((touched.topicCreatingDate as unknown) as boolean)
                                                                                }
                                                                                sx={{
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
                                                                            /> */}
                                                                            <TextField
                                                                                id="topicCreatingDate"
                                                                                name="topicCreatingDate"
                                                                                placeholder={"Creating Date"}
                                                                                defaultValue={addTutorialMode ? '' : topic.creatingDate}
                                                                                onChange={handleChange}
                                                                                onBlur={(e: any) => {
                                                                                    if (!specificTopic) {
                                                                                        setMyTopics((current: any) => [...current, { id: topic.id, title: '', author: '', creatingDate: e.target.value, subTopic: topic.subTopic }])
                                                                                    } else {
                                                                                        specificTopic.creatingDate = e.target.value
                                                                                    }
                                                                                    console.log(myTopics)
                                                                                }}
                                                                                sx={{
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
                                                                                variant="outlined" />
                                                                            {((errors.topicCreatingDate as unknown) as boolean) &&
                                                                                ((touched.topicCreatingDate as unknown) as boolean) ? (
                                                                                <ErrorMessage name={"topicCreatingDate"} component="dev">
                                                                                    {(msg) => (
                                                                                        <div className={styles.errorStyle}>{msg}</div>
                                                                                    )}
                                                                                </ErrorMessage>
                                                                            ) : null}
                                                                        </Grid>
                                                                        <Grid item xs={0.5}></Grid>
                                                                        <Grid item xs={1.5}>
                                                                            <button className={styles.btnCancel} onClick={deletingTopics.bind(this, topic.id)}>
                                                                                Delete
                                                                            </button>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container>
                                                                        <Grid item xs={9}></Grid>
                                                                        <Grid item xs={3}>
                                                                            <button
                                                                                type="button"
                                                                                className={styles.viewAll}
                                                                                onClick={() => {
                                                                                    setViewSubtopics(true);
                                                                                    setAddTopicsShow(false)
                                                                                    setTopicInfo(topic)
                                                                                }}
                                                                            >View All Subtopics<ArrowForwardIcon /></button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            )
                                                        }
                                                        )}
                                                    </Grid>
                                                    <Grid style={{ textAlign: 'center' }}>
                                                        <button onClick={() => { setAddTopicsShow(true); setAddMode(true) }}
                                                            className={styles.btnAddTutorial}>Add Topic</button>
                                                    </Grid>
                                                </Grid>
                                            }
                                            {!addTutorialMode && topics.length === 0 && !isLoading && !httpError &&
                                                <Grid>
                                                    <Grid style={{ textAlign: 'center', marginTop: '50px' }}>
                                                        <Grid sx={{ color: 'red', marginBottom: '50px' }} className={styles.create}>No Topics Yet..</Grid>
                                                        <button onClick={() => { setAddTopicsShow(true); setAddMode(true) }}
                                                            className={styles.btnAddTutorial}>Add Topic</button>
                                                    </Grid>
                                                </Grid>
                                            }
                                            <Grid className={styles.submitting}>
                                                <button type="submit" className={styles.btnSave} disabled={isSubmitting}>
                                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                    Save
                                                </button>
                                                <button className={styles.btnCancel} onClick={props.cancel}>Cancel</button>
                                            </Grid>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Grid>
                    </Grid>
                </Grid>
            }
            {addTopicsShow && !addSubTopicsShow &&
                <Grid>
                    <AddEditTutorialsComponent
                        onAdd={addTopicHandler}
                        onEdit={editTopicHandler}
                        tutorialList={props.tutorialList}
                        isAddMode={addMode}
                        tutorialInfo={tutorialInfo}
                        topicInfo={topics}
                        cancel={cancel} />
                </Grid>
            }
            {!addTopicsShow && viewSubtopics &&
                <ViewAllSubs
                    topicInfo={topicInfo}
                    cancel={cancel}
                    tutorialInfo={tutorialInfo}
                    tutorialList={props.tutorialList}
                />
            }
            <Footer />
        </Box>
    )
}

export default AddTutorialsComponent;