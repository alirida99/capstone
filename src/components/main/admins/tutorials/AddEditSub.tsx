import React from "react";
import { Box, Grid } from "@mui/material";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from './tutorials.module.scss';
import FormikField from "../../../general/Layouts/TextField/FormikField";
import { useDispatch } from "react-redux";

const AddEditSubComponent = (props: any) => {
    // const isAddMode = props.isAddMode;
    // const subTopicInfo = props.subTopicInfo;

    const initialValues = {
        title: '',
        description: '',
        example: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required!'),
        description: Yup.string()
            .required('Description is required!'),
        example: Yup.string()
            .required('Example is required!'),
    })

    function onSubmit(values: any) {
        const subTopic = {
            title: values.title,
            description: values.description,
            example: values.example,
        }
        props.onAddSub(subTopic);
    }

    // function onEditSubmit(values: any) {
    //     const subTopic = {
    //         title: values.title,
    //         description: values.description,
    //         example: values.example,
    //     }
    //     props.onEditSub(subTopic);
    // }

    return (
        <Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting, setFieldValue, handleChange, handleBlur }) => {
                    return (
                        <Form>
                            <h1 className={styles.create}>Add Sub-Topic</h1>
                            <Grid container style={{ textAlign: 'center' }}>
                                <Grid item container xs={12} className={styles.subGrid}>
                                    <Grid item xs={2}>
                                        <label className={styles.TutorialTitleLetters}>Title</label>
                                    </Grid>
                                    <Grid item xs={7} sx={{ textAlign: 'left' }}>
                                        <FormikField
                                            name="title"
                                            placeholder={"Title"}
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
                                </Grid>
                                <Grid item container xs={12} className={styles.subGrid}>
                                    <Grid item xs={2}>
                                        <label className={styles.TutorialTitleLetters}>Description</label>
                                    </Grid>
                                    <Grid item xs={10} sx={{ textAlign: 'left' }}>
                                        <textarea
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="description"
                                            className={styles.SubTopicDesEx} />
                                        {((errors.description as unknown) as boolean) &&
                                            ((touched.description as unknown) as boolean) ? (
                                            <ErrorMessage name={"description"} component="dev">
                                                {(msg) => (
                                                    <div className={styles.errorStyle}>{msg}</div>
                                                )}
                                            </ErrorMessage>
                                            // <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                        ) : null}
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} className={styles.subGrid}>
                                    <Grid item xs={2}>
                                        <label className={styles.TutorialTitleLetters}>Example</label>
                                    </Grid>
                                    <Grid item xs={10} sx={{ textAlign: 'left' }}>
                                        <textarea
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="example"
                                            className={styles.SubTopicDesEx} />
                                        <ErrorMessage name="example" component="div" className="invalid-feedback" />
                                    </Grid>
                                </Grid>
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
        </Box>
    )
}

export default AddEditSubComponent;