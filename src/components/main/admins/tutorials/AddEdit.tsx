import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from './tutorials.module.scss';
import AddEditSubComponent from "./AddEditSub";
import FormikField from "../../../general/Layouts/TextField/FormikField";

const AddEditTutorialsComponent = (props: any) => {
    const isAddMode = props.isAddMode;
    const tutorialInfo = props.tutorialInfo;
    const topicInfo = props.topicInfo;
    const [subTopicInfo, setSubTopicInfo] = useState([] as any);

    const initialValues = {
        title: '',
        author: '',
        creatingDate: '',
        subTitle: '',
        subDescription: '',
        subExample: '',
    };

    const [subTopics, setSubTopics] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchTutorials = async () => {
            const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topicInfo.id}/subTopic.json`);

            if (!response.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();

            const loadedTutorials = [];

            for (const key in responseData) {
                loadedTutorials.push({
                    id: key,
                    title: responseData[key].title,
                    description: responseData[key].description,
                    example: responseData[key].example,
                    // topic: responseData[key].topic,
                });
            }

            setSubTopics(loadedTutorials);
            setIsLoading(false);
        }
        fetchTutorials().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, [topicInfo, tutorialInfo])

    const [addEditSubShow, setAddEditSubShow] = useState(false);
    const [isAddSubMode, setIsAddSubMode] = useState(false);
    const cancel = () => {
        setAddEditSubShow(false);
        setIsAddSubMode(false);
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required!'),
        author: Yup.string()
            .required('Author is required!'),
        creatingDate: Yup.string()
            .required('Title is required!'),
        subTitle: Yup.string()
            .required('Title is required!'),
        subDescription: Yup.string()
            .required('Description is required!'),
        subExample: Yup.string()
            .required('Example is required!'),
    })

    function onSubmit(values: any) {
        const topic = {
            title: values.title,
            author: values.author,
            creatingDate: values.creatingDate,
            subTopic: [
                {
                    title: values.subTitle,
                    description: values.subDescription,
                    example: values.subExample,
                }
            ]
        }
        console.log(topic)
        props.onAdd(topic)
    }

    function onEditSubmit(values: any) {
        const topic = {
            title: values.title,
            author: values.author,
            creatingDate: values.creatingDate,
            subTopic: topicInfo.subTopic,
        }
        console.log(topic)
        props.onEdit(topic)
    }


    async function addSubHandler(subTopic: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topicInfo.id}/subTopic.json`, {
            method: 'POST',
            body: JSON.stringify(subTopic),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddEditSubShow(false);
    }
    async function editSubHandler(subTopic: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topicInfo.id}/subTopic/${subTopicInfo.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(subTopic),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddEditSubShow(false);
    }
    const deletingSubTopics = (subTopicId: any) => {
        fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topicInfo.id}/subTopic/${subTopicId}.json`, {
            method: 'DELETE',
        }).then(response => {
            setSubTopics((prevSubTopics: any) =>
                prevSubTopics.filter((subTopic: any) => subTopic.id !== subTopicId)
            )
        });
    }

    return (
        <Box>
            {!addEditSubShow ?
                <Grid>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={isAddMode ? onSubmit : onEditSubmit}>
                        {({ errors, touched, isSubmitting, setFieldValue, handleBlur, handleChange }) => {
                            return (
                                <Form>
                                    <h1 className={styles.create}>{isAddMode ? 'Add New Topic' : 'Edit Topic'}</h1>
                                    <Grid container>
                                        <Grid container>
                                            <Grid item xs={0.5}></Grid>
                                            <Grid item xs={3}>
                                                <FormikField
                                                    name="title"
                                                    placeholder={"Title"}
                                                    defaultValue={isAddMode ? '' : topicInfo.title}
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
                                                    type="text"
                                                    defaultValue={isAddMode ? '' : topicInfo.author}
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
                                                    defaultValue={isAddMode ? '' : topicInfo.creatingDate}
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
                                        {isAddMode &&
                                            <Grid sx={{ width: '100%' }}>
                                                <Grid className={styles.create}>First Sub-Topic</Grid>
                                                <Grid sx={{ marginBottom: '20px', textAlign: 'center' }}>You can add more after you save...</Grid>
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
                                    </Grid>
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
                    {!isAddMode && subTopics.length > 0 && !isLoading && !httpError &&
                        <Grid>
                            <Grid container sx={{ textAlign: 'center' }}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <label className={styles.thTable}>Title</label>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <label className={styles.thTable}>Description</label>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <label className={styles.thTable}>Example</label>
                                    </Grid>
                                    <Grid item xs={3}></Grid>
                                </Grid>
                                {subTopics && subTopics.map((subTopic: any) =>
                                    <Grid key={subTopic.id} container>
                                        <Grid item xs={3}>
                                            {subTopic.title}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {subTopic.description}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {subTopic.example}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <button className={styles.btnSave} onClick={() => {
                                                setAddEditSubShow(true);
                                                setIsAddSubMode(false);
                                                setSubTopicInfo(subTopic);
                                            }}>Edit</button>
                                            <button className={styles.btnCancel} onClick={deletingSubTopics.bind(this, subTopic.id)}>
                                                Delete
                                            </button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                            <Grid className={styles.btnAddSubTopic}>
                                <button onClick={() => { setAddEditSubShow(true); setIsAddSubMode(true) }}>Add New Sub-Topic</button>
                            </Grid>
                        </Grid>
                    }
                    {!isAddMode && isLoading && !httpError &&
                        <section className={styles.loading}>
                            Loading...
                        </section>
                    }
                    {!isAddMode && !isLoading && httpError &&
                        <section className={styles.error}>
                            {httpError}
                        </section>
                    }
                    {!isAddMode && subTopics.length === 0 && !isLoading && !httpError &&
                        <Grid>
                            <section className={styles.noTutorials}>
                                No Sub-Topics Here..
                            </section>
                            <Grid style={{ textAlign: 'center' }}>
                                <button onClick={() => { setAddEditSubShow(true); setIsAddSubMode(true) }} className={styles.btnAddTutorial}>Add Sub-Topic</button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
                :
                <AddEditSubComponent
                    onAddSub={addSubHandler}
                    onEditSub={editSubHandler}
                    tutorialList={props.tutorialList}
                    isAddMode={isAddSubMode}
                    subTopicInfo={subTopicInfo}
                    cancel={cancel} />
            }
        </Box>
    )
}

export default AddEditTutorialsComponent;