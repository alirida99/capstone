import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import styles from './tutorials.module.scss';
import AdminsHomeComponent from "../home";
import AddEditTutorialsComponent from "./AddEdit";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Footer from "../../footer";
import FormikField from "../../../general/Layouts/TextField/FormikField";
import AddEditSubComponent from "./AddEditSub";

const AddTutorialsComponent = (props: any) => {
    const addTutorialMode = props.addTutorialMode;
    const [topicInfo, setTopicInfo] = useState([] as any);
    const tutorialInfo = props.tutorialInfo;

    const [topics, setTopics] = useState([] as any);
    const [subTopics, setSubTopics] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic.json`);
            const responseSubTopic = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topics.id}/subTopic.json`);

            if (!response.ok || !responseSubTopic.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();
            const responseDataSubTopic = await responseSubTopic.json();

            const loadedTutorials = [];
            const loadedSubTopics = [];

            for (const key in responseData) {
                loadedTutorials.push({
                    id: key,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    creatingDate: responseData[key].creatingDate,
                    subTopic: responseData[key].subTopic,
                });
            }
            for (const key in responseDataSubTopic) {
                loadedSubTopics.push({
                    id: key,
                    title: responseData[key].title,
                    description: responseData[key].description,
                    example: responseData[key].example,
                });
            }
            setTopics(loadedTutorials);
            setSubTopics(loadedSubTopics);
            setIsLoading(false);
        }
        fetchTopics().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
        console.log(tutorialInfo)
    }, [topics.id, tutorialInfo]);

    // const topicTitle = tutorialInfo.topic.map((topic: any) => topic.title);
    const [topicTitles, setTopicTitles] = useState();
    const topicAuthor = () => tutorialInfo.topic?.map((topic: any) => {
        return (
            `${topic.author}`
        )
    });
    const topicCreatingDate = () => tutorialInfo.topic?.map((topic: any) => {
        return (
            `${topic.creatingDate}`
        )
    });
    const subTopicTitle = () => tutorialInfo.topic?.map((topic: any) => {
        const title = topic.subTopic.map((subTopic: any) => {
            return (
                `${subTopic.title}`
            )
        })
        console.log(title)
        return (
            `${title}`
        )
    });
    const subTopicDescription = () => tutorialInfo.topic?.map((topic: any) => {
        const description = topic.subTopic.map((subTopic: any) => {
            return (
                `${subTopic.description}`
            )
        })
        return (
            `${description}`
        )
    });
    const subTopicExample = () => tutorialInfo.topic?.map((topic: any) => {
        const example = topic.subTopic.map((subTopic: any) => {
            return (
                `${subTopic.example}`
            )
        })
        return (
            `${example}`
        )
    });

    const initialValues = {
        id: Math.random(),
        title: addTutorialMode ? "" : tutorialInfo.title,
        author: addTutorialMode ? "" : tutorialInfo.author,
        creatingDate: addTutorialMode ? "" : tutorialInfo.creatingDate,
        topicTitle: addTutorialMode ? "" : console.log(topicTitles),
        topicAuthor: addTutorialMode ? "" : `${topicAuthor}`,
        topicCreatingDate: addTutorialMode ? "" : `${topicCreatingDate}`,
        subTitle: addTutorialMode ? "" : `${subTopicTitle}`,
        subDescription: addTutorialMode ? "" : `${subTopicDescription}`,
        subExample: addTutorialMode ? "" : `${subTopicExample}`,
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
                            title: values.subTitle,
                            description: values.subDescription,
                            example: values.subExample,
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
            topic: [
                {
                    title: values.topicTitle,
                    author: values.topicAuthor,
                    creatingDate: values.topicCreatingDate,
                    subTopic: [
                        {
                            title: values.subTitle,
                            description: values.subDescription,
                            example: values.subExample,
                        }
                    ]
                }
            ],
        }
        console.log(tutorial);
        props.onEdit(tutorial);
    }

    const deletingTopics = (topicId: any) => {
        // fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topicId}.json`, {
        //     method: 'DELETE',
        // }).then(response => {
        setTopics((prevTopics: any) =>
            prevTopics.filter((topic: any) => topic.id !== topicId)
        )
        // });
    }
    const deletingSubTopics = (subTopicId: any) => {
        setSubTopics((prevSubTopics: any) =>
            prevSubTopics.filter((subTopic: any) => subTopic.id !== subTopicId)
        )
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
    async function addSubHandler(subTopic: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topics.id}/subTopic.json`, {
            method: 'POST',
            body: JSON.stringify(subTopic),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddTopicsShow(false);
        setAddSubTopicsShow(false);
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
        subTitle: Yup.string()
            .required('Title is required!'),
        subDescription: Yup.string()
            .required('Description is required!'),
        subExample: Yup.string()
            .required('Example is required!'),
    })

    const [addTopicsShow, setAddTopicsShow] = useState(false);
    const [addSubTopicsShow, setAddSubTopicsShow] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const cancel = () => {
        setAddTopicsShow(false);
        setAddMode(false);
        setAddSubTopicsShow(false);
    }

    return (
        <Box>
            {/* <AdminsHomeComponent /> */}
            {!addTopicsShow && !addSubTopicsShow &&
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
                                                        // defaultValue={addTutorialMode ? '' : tutorialInfo.title}
                                                        value={values.title}
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
                                                        // defaultValue={addTutorialMode ? '' : tutorialInfo.author}
                                                        value={values.author}
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
                                                        // defaultValue={addTutorialMode ? '' : tutorialInfo.creatingDate}
                                                        value={values.creatingDate}
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
                                                    <ol>
                                                        {topics && topics.map((topic: any) => {
                                                            setTopicTitles(topic.title)
                                                            return (
                                                                <li style={{ fontSize: "30px", marginBottom: '50px' }} key={topic.id}>
                                                                    <Grid container>
                                                                        <Grid item xs={0.5}></Grid>
                                                                        <Grid item xs={2.5}>
                                                                            <FormikField
                                                                                name="topicTitle"
                                                                                placeholder={"Title"}
                                                                                type="text"
                                                                                // defaultValue={topic.title}
                                                                                value={values.topicTitle}
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
                                                                        <Grid item xs={2.5}>
                                                                            <FormikField
                                                                                name="topicAuthor"
                                                                                placeholder={"Author"}
                                                                                type="text"
                                                                                // defaultValue={topic.author}
                                                                                value={values.topicAuthor}
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
                                                                        <Grid item xs={2.5}>
                                                                            <FormikField
                                                                                name="topicCreatingDate"
                                                                                placeholder={"Creating Date"}
                                                                                type="text"
                                                                                // defaultValue={topic.creatingDate}
                                                                                value={values.topicCreatingDate}
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
                                                                        <Grid item xs={1.5}>
                                                                            <button className={styles.btnCancel} onClick={deletingTopics.bind(this, topic.id)}>
                                                                                Delete
                                                                            </button>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid>
                                                                        <Grid className={styles.create}>
                                                                            <Grid>
                                                                                Sub-Topics
                                                                            </Grid>
                                                                            <Grid style={{ textAlign: 'center' }}>
                                                                                <button onClick={() => {
                                                                                    setAddTopicsShow(false);
                                                                                    setAddSubTopicsShow(true);
                                                                                    setAddMode(true);
                                                                                }}
                                                                                    className={styles.btnAddTutorial}>Add SubTopic</button>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <ul>
                                                                            {topic.subTopic && topic.subTopic.map((subTopics: any) =>
                                                                                <li className={styles.subLi} key={subTopics.id}>
                                                                                    <Grid item container xs={12} className={styles.subGrid}>
                                                                                        <Grid item xs={12} container>
                                                                                            <Grid item xs={1.5}>
                                                                                                <label className={styles.TutorialTitleLetters}>Title</label>
                                                                                            </Grid>
                                                                                            <Grid item xs={0.4}></Grid>
                                                                                            <Grid item xs={4.1}>
                                                                                                <label className={styles.TutorialTitleLetters}>Description</label>
                                                                                            </Grid>
                                                                                            <Grid item xs={0.4}></Grid>
                                                                                            <Grid item xs={4.1}>
                                                                                                <label className={styles.TutorialTitleLetters}>Example</label>
                                                                                            </Grid>
                                                                                            <Grid item xs={1.5}></Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item container xs={12} className={styles.subGrid}>
                                                                                        <Grid item xs={1.5} sx={{ textAlign: 'left' }}>
                                                                                            <FormikField
                                                                                                name="subTitle"
                                                                                                // label={'title'}
                                                                                                placeholder={"Title"}
                                                                                                // inputProps={{ style: inpWidth }}
                                                                                                type="text"
                                                                                                // defaultValue={subTopics.title}
                                                                                                value={values.subTitle}
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
                                                                                        <Grid item xs={0.4}></Grid>
                                                                                        <Grid item xs={4.1} sx={{ textAlign: 'left' }}>
                                                                                            <textarea
                                                                                                onChange={handleChange}
                                                                                                onBlur={handleBlur}
                                                                                                name="subDescription"
                                                                                                // defaultValue={subTopics.description}
                                                                                                value={values.subDescription}
                                                                                                className={styles.subTopicEdit} />
                                                                                            {((errors.subDescription as unknown) as boolean) &&
                                                                                                ((touched.subDescription as unknown) as boolean) ? (
                                                                                                <ErrorMessage name={"subDescription"} component="dev">
                                                                                                    {(msg) => (
                                                                                                        <div className={styles.errorStyle}>{msg}</div>
                                                                                                    )}
                                                                                                </ErrorMessage>
                                                                                            ) : null}
                                                                                        </Grid>
                                                                                        <Grid item xs={0.4}></Grid>
                                                                                        <Grid item xs={4.1} sx={{ textAlign: 'left' }}>
                                                                                            <textarea
                                                                                                onChange={handleChange}
                                                                                                onBlur={handleBlur}
                                                                                                name="subExample"
                                                                                                // defaultValue={subTopics.example}
                                                                                                value={values.subExample}
                                                                                                className={styles.subTopicEdit} />
                                                                                            <ErrorMessage name="subExample" component="div" className="invalid-feedback" />
                                                                                        </Grid>
                                                                                        <Grid item xs={1.5}>
                                                                                            <button className={styles.btnCancel} onClick={deletingSubTopics.bind(this, subTopics.id)}>
                                                                                                Delete
                                                                                            </button>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </li>
                                                                            )}
                                                                        </ul>
                                                                    </Grid>
                                                                </li>
                                                            )
                                                        }
                                                        )}
                                                    </ol>
                                                    <Grid style={{ textAlign: 'center' }}>
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
                        {/* {!addTutorialMode && topics.length > 0 && !isLoading && !httpError &&
                            <Grid xs={12}>
                                <table style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '30%' }} className={styles.thTable}>Title</th>
                                            <th style={{ width: '30%' }} className={styles.thTable}>Author</th>
                                            <th style={{ width: '30%' }} className={styles.thTable}>Creating Date</th>
                                            <th style={{ width: '10%' }} className={styles.thTable}></th>
                                        </tr>
                                    </thead>
                                    {topics && topics.map((topic: any) =>
                                        <tbody key={topic.id}>
                                            <tr style={{ textAlign: 'center' }}>
                                                <td>{topic.title}</td>
                                                <td>{topic.author}</td>
                                                <td>{topic.creatingDate}</td>
                                                <td style={{ whiteSpace: 'nowrap' }}>
                                                    <button className={styles.btnSave} onClick={() => {
                                                        setAddEditShow(true);
                                                        setAddMode(false);
                                                        setTopicInfo(topic);
                                                        console.log(tutorialInfo)
                                                    }}>Edit</button>
                                                    <button className={styles.btnCancel} onClick={deletingTopics.bind(this, topic.id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                                <Grid className={styles.btnAddTopic} xs={12}>
                                    <button onClick={() => { setAddEditShow(true); setAddMode(true) }}>Add New Topic</button>
                                </Grid>
                            </Grid>
                        }
                        {!addTutorialMode && isLoading && !httpError &&
                            <section className={styles.loading}>
                                Loading...
                            </section>
                        }
                        {!addTutorialMode && !isLoading && httpError &&
                            <section className={styles.error}>
                                {httpError}
                            </section>
                        }
                        {!addTutorialMode && topics.length === 0 && !isLoading && !httpError &&
                            <Grid>
                                <section className={styles.noTutorials}>
                                    No Topics Yet..
                                </section>
                                <Grid style={{ textAlign: 'center' }}>
                                    <button onClick={() => { setAddEditShow(true); setAddMode(true) }} className={styles.btnAddTutorial}>Add Topic</button>
                                </Grid>
                            </Grid>
                        } */}
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
            {!addTopicsShow && addSubTopicsShow &&
                <AddEditSubComponent
                    onAddSub={addSubHandler}
                    // onEditSub={editSubHandler}
                    tutorialList={props.tutorialList}
                    // isAddMode={isAddSubMode}
                    // subTopicInfo={subTopicInfo}
                    cancel={cancel} />
            }
            <Footer />
        </Box>
    )
}

export default AddTutorialsComponent;