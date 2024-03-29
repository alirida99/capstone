import { Box, Grid, TextField } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import styles from './tutorials.module.scss';
import FormikField from "@/components/general/Layouts/TextField/FormikField";
import AddEditSubComponent from "./AddEditSub";

const ViewAllSubs = (props: any) => {

    const topicInfo = props.topicInfo;
    const tutorialInfo = props.tutorialInfo;

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [subTopics, setSubTopics] = useState([] as any);
    const [mySubTopics, setMySubTopics] = useState([] as any);
    const [addSubTopic, setAddSubTopic] = useState(false);

    useEffect(() => {
        const fetchSubTopics = async () => {
            const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topicInfo.id}/subTopic.json`);

            if (!response.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();

            const loadedSubs = [];

            for (const key in responseData) {
                loadedSubs.push({
                    id: key,
                    title: responseData[key].title,
                    description: responseData[key].description,
                    example: responseData[key].example,
                });
            }

            setSubTopics(loadedSubs);
            setIsLoading(false);
        }
        fetchSubTopics().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, [topicInfo.id, tutorialInfo.id]);

    const initialValues = {
        title: subTopics.title,
        description: subTopics.description,
        example: subTopics.example,
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required!'),
        description: Yup.string()
            .required('Description is required!'),
        example: Yup.string()
            .required('Example is required!'),
    })

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
        setAddSubTopic(false)
    }

    async function editSubHandler(subTopic: any) {
        const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${tutorialInfo.id}/topic/${topicInfo.id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(subTopic),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setAddSubTopic(false)
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

    const cancel = () => {
        setAddSubTopic(false);
    }

    function onEditSubmit(values: any) {
        const subTopic = {
            subTopic: mySubTopics
        }
        editSubHandler(subTopic)
    }

    return (
        <Box>
            {!addSubTopic &&
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onEditSubmit}>
                    {({ errors, touched, isSubmitting, setFieldValue, handleChange, handleBlur, values }) => {
                        return (
                            <Form>
                                <Grid>
                                    <Grid className={styles.create}>
                                        <Grid>
                                            Sub-Topics
                                        </Grid>
                                        <Grid style={{ textAlign: 'center' }}>
                                            <button onClick={() => setAddSubTopic(true)}
                                                className={styles.btnAddTutorial}>Add SubTopic</button>
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        {subTopics && subTopics?.map((subTopics: any, i: any) => {
                                            const specificSub = mySubTopics.find(
                                                (sub: any) => sub.id === subTopics.id
                                            );
                                            // setMySubTopics(subTopics.id)
                                            return (
                                                <Grid className={styles.subLi} key={subTopics.id}>
                                                    <Grid>
                                                        <Grid className={styles.numero}>{`Sub-Topic #${i + 1}`}</Grid>
                                                    </Grid>
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
                                                            <TextField
                                                                id="title"
                                                                name="title"
                                                                placeholder="Title"
                                                                defaultValue={subTopics.title}
                                                                onChange={handleChange}
                                                                onBlur={(e: any) => {
                                                                    if (!specificSub) {
                                                                        setMySubTopics((current: any) => [...current, { id: subTopics.id, title: e.target.value, description: '', example: '' }])
                                                                    } else {
                                                                        specificSub.title = e.target.value
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
                                                            {((errors.title as unknown) as boolean) &&
                                                                ((touched.title as unknown) as boolean) ? (
                                                                <ErrorMessage name={"title"} component="dev">
                                                                    {(msg) => (
                                                                        <div className={styles.errorStyle}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            ) : null}
                                                        </Grid>
                                                        <Grid item xs={0.4}></Grid>
                                                        <Grid item xs={4.1} sx={{ textAlign: 'left' }}>
                                                            <TextField
                                                                id="description"
                                                                name="description"
                                                                multiline
                                                                rows={7}
                                                                defaultValue={subTopics.description}
                                                                className={styles.subTopicEdit}
                                                                onChange={handleChange}
                                                                // onBlur={handleBlur}
                                                                onBlur={(e: any) => {
                                                                    if (!specificSub) {
                                                                        setMySubTopics((current: any) => [...current, { id: subTopics.id, title: '', description: e.target.value, example: '' }])
                                                                    } else {
                                                                        specificSub.description = e.target.value
                                                                    }
                                                                    // console.log(mySubTopics)
                                                                }}
                                                            />
                                                            {((errors.description as unknown) as boolean) &&
                                                                ((touched.description as unknown) as boolean) ? (
                                                                <ErrorMessage name={"description"} component="dev">
                                                                    {(msg) => (
                                                                        <div className={styles.errorStyle}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            ) : null}
                                                            {/* <textarea
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                name="subDescription"
                                                                defaultValue={subTopics.description}
                                                                // value={values.description}
                                                                className={styles.subTopicEdit} />
                                                            {((errors.description as unknown) as boolean) &&
                                                                ((touched.description as unknown) as boolean) ? (
                                                                <ErrorMessage name={"subDescription"} component="dev">
                                                                    {(msg) => (
                                                                        <div className={styles.errorStyle}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            ) : null} */}
                                                        </Grid>
                                                        <Grid item xs={0.4}></Grid>
                                                        <Grid item xs={4.1} sx={{ textAlign: 'left' }}>
                                                            <TextField
                                                                id="example"
                                                                name="example"
                                                                multiline
                                                                rows={7}
                                                                defaultValue={subTopics.example}
                                                                className={styles.subTopicEdit}
                                                                onChange={handleChange}
                                                                // onBlur={handleBlur}
                                                                onBlur={(e: any) => {
                                                                    if (!specificSub) {
                                                                        setMySubTopics((current: any) => [...current, { id: subTopics.id, title: '', description: '', example: e.target.value }])
                                                                    } else {
                                                                        specificSub.example = e.target.value
                                                                    }
                                                                    // console.log(mySubTopics)
                                                                }}
                                                            />
                                                            {((errors.example as unknown) as boolean) &&
                                                                ((touched.example as unknown) as boolean) ? (
                                                                <ErrorMessage name={"example"} component="dev">
                                                                    {(msg) => (
                                                                        <div className={styles.errorStyle}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            ) : null}
                                                            {/* <textarea
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                name="subExample"
                                                                defaultValue={subTopics.example}
                                                                // value={values.example}
                                                                className={styles.subTopicEdit} />
                                                            <ErrorMessage name="subExample" component="div" className="invalid-feedback" /> */}
                                                        </Grid>
                                                        <Grid item xs={1.5}>
                                                            <button className={styles.btnCancel} onClick={deletingSubTopics.bind(this, subTopics.id)}>
                                                                Delete
                                                            </button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                        )}
                                    </Grid>
                                    <Grid className={styles.submitting}>
                                        <button type="submit" className={styles.btnSave} disabled={isSubmitting}>
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Save
                                        </button>
                                        <button className={styles.btnCancel} onClick={props.cancel}>Cancel</button>
                                    </Grid>
                                </Grid>
                            </Form>
                        );
                    }}
                </Formik>
            }
            {addSubTopic &&
                <AddEditSubComponent
                    onAddSub={addSubHandler}
                    // onEditSub={editSubHandler}
                    tutorialList={props.tutorialList}
                    // isAddMode={isAddSubMode}
                    topicInfo={topicInfo}
                    cancel={cancel} />
            }
        </Box>
    )
}

export default ViewAllSubs;