import React, { useState } from "react";
import styles from './exams.module.scss';
import { Autocomplete, Box, Grid, MenuItem, Select, TextField } from "@mui/material";
import { ErrorMessage } from "formik";
import FormikField from "../../../general/Layouts/TextField/FormikField";

const AddQuestions = (props: any) => {
    const [value, setValue] = useState("");

    return (
        <Box>
            <Grid sx={{ padding: '0 80px 0 80px' }}>
                {props.addExamMode &&
                    <Grid>
                        <Grid className={styles.addMore}>First Question</Grid>
                        <Grid sx={{ textAlign: 'center' }}>You can add more after you save...</Grid>
                    </Grid>
                }

                {!props.addExamMode && !props.showAddQuestions &&
                    <Grid>
                        <Grid className={styles.numero}>{`Question #${props.index}`}</Grid>
                    </Grid>
                }
                <Grid container>
                    <Grid item xs={!props.addExamMode ? 8 : 12} paddingBottom={0} sx={{
                        width: "100%",
                        height: '63px',
                    }}>
                        <span style={{
                            width: "98px",
                            height: "20px",
                            fontSize: "16px",
                            lineHeight: "1.25",
                        }}>Question Type</span>
                        <Select
                            id="qType"
                            name="qType"
                            placeholder="Select your question type"
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
                            // value={!props.addExamMode ? props.question.type : ""}
                            defaultValue={!props.addExamMode && !props.showAddQuestions ? props.question.type : ""}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            error={
                                ((props.errors.qType as unknown) as boolean) &&
                                ((props.touched.qType as unknown) as boolean)
                            }
                        >
                            <MenuItem disabled value="">--Select your question type--</MenuItem>
                            <MenuItem value="DAD">Select Options</MenuItem>
                            <MenuItem value="OP">MCQ</MenuItem>
                            <MenuItem value="FITB">Fill In The Blank</MenuItem>
                        </Select>
                        {((props.errors.type as unknown) as boolean) &&
                            ((props.touched.type as unknown) as boolean) ? (
                            <ErrorMessage name={"qType"}>
                                {(msg) => (
                                    <div className={styles.errorStyle}>{msg}</div>
                                )}
                            </ErrorMessage>
                        ) : null}
                    </Grid>
                    <Grid item xs={!props.addExamMode ? 1 : 0}></Grid>
                    {!props.addExamMode && !props.showAddQuestions &&
                        <Grid item xs={3} sx={{ marginTop: '60px', textAlign: 'center' }}>
                            <button className={styles.btnCancel} onClick={props.deletingQuestion.bind(this, props.id)}>
                                Delete
                            </button>
                        </Grid>
                    }
                </Grid>
                <Grid container sx={{ marginTop: "50px" }}>
                    <Grid item xs={0.5}></Grid>
                    <Grid item xs={5} paddingBottom={0} sx={{
                        width: "100%",
                        height: "100px",
                    }}>
                        <span style={{
                            width: "98px",
                            height: "20px",
                            fontSize: "16px",
                            lineHeight: "1.25",
                        }}>Sentence 1</span>
                        <FormikField
                            name="qSentence1"
                            placeholder={"Enter First Part Of The Sentence."}
                            // value={props.values.qSentence1}
                            defaultValue={!props.addExamMode && !props.showAddQuestions ? props.question.sentence1 : ""}
                            type="text"
                            error={
                                ((props.errors.qSentence1 as unknown) as boolean) &&
                                ((props.touched.qSentence1 as unknown) as boolean)
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
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5} paddingBottom={0} sx={{
                        width: "100%",
                        height: "100px",
                    }}>
                        <span style={{
                            width: "98px",
                            height: "20px",
                            fontSize: "16px",
                            lineHeight: "1.25",
                        }}>Sentence 2</span>
                        <FormikField
                            name="qSentence2"
                            placeholder={"Enter Second Part Of The Sentence."}
                            // value={props.values.qSentence2}
                            defaultValue={!props.addExamMode && !props.showAddQuestions ? props.question.sentence2 : ""}
                            type="text"
                            error={
                                ((props.errors.qSentence2 as unknown) as boolean) &&
                                ((props.touched.qSentence2 as unknown) as boolean)
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
                    <Grid item xs={0.5}></Grid>
                </Grid>
                <Grid container sx={{ marginTop: "50px" }}>
                    <Grid item xs={0.5}></Grid>
                    <Grid item xs={5} paddingBottom={0} sx={{
                        width: "100%",
                        height: "100px",
                    }}>
                        <span style={{
                            width: "98px",
                            height: "20px",
                            fontSize: "16px",
                            lineHeight: "1.25",
                        }}>Question Grade</span>
                        <FormikField
                            name="qGrade"
                            placeholder={"Enter Question Grade."}
                            // value={props.values.qGrade}
                            defaultValue={!props.addExamMode && !props.showAddQuestions ? props.question.grade : ""}
                            type="number"
                            error={
                                ((props.errors.qGrade as unknown) as boolean) &&
                                ((props.touched.qGrade as unknown) as boolean)
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
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5} paddingBottom={0} sx={{
                        width: "100%",
                        height: "100px",
                    }}>
                        <span style={{
                            width: "98px",
                            height: "20px",
                            fontSize: "16px",
                            lineHeight: "1.25",
                        }}>True Answer</span>
                        <FormikField
                            name="qTrueAnswer"
                            placeholder={"Enter The True Answer."}
                            // value={props.values.qTrueAnswer}
                            defaultValue={!props.addExamMode && !props.showAddQuestions ? props.question.trueAnswer : ""}
                            type="text"
                            error={
                                ((props.errors.qTrueAnswer as unknown) as boolean) &&
                                ((props.touched.qTrueAnswer as unknown) as boolean)
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
                    <Grid item xs={0.5}></Grid>
                </Grid>
                <Grid container sx={{ marginTop: "50px" }}>
                    <Autocomplete
                        id="tags-outlined"
                        className={styles.qOptionsFieldInput}
                        multiple
                        options={[]}
                        freeSolo
                        // value={props.values.qOptions}
                        defaultValue={!props.addExamMode && !props.showAddQuestions ? props.question.options : ""}
                        onChange={(e, value) => {
                            props.setFieldValue("qOptions", value);
                        }}
                        onBlur={props.handleBlur}
                        sx={{
                            width: '100%',
                            '& .MuiFilledInput-root:after': {
                                borderBottom: 0,
                            },
                        }}
                        inputValue={value}
                        onInputChange={(event, newInputValue) => {
                            const options: string[] = newInputValue.split(",");
                            const spaceOptions: string[] = newInputValue.split(" ");

                            if (options.length > 1) {
                                setValue('');
                                props.setFieldValue("qOptions", (props.values.qOptions as string[]).concat(options)
                                    .map(x => x.trim())
                                    .filter(x => x))
                            } else if (spaceOptions.length > 1) {
                                setValue('');
                                props.setFieldValue("qOptions", (props.values.qOptions as string[]).concat(spaceOptions)
                                    .map(x => x.trim())
                                    .filter(x => x))
                            } else {
                                setValue(newInputValue);
                            }
                            console.log(props.values.qOptions)
                        }}
                        renderInput={params => {
                            return (
                                <>
                                    <TextField
                                        {...params}
                                        className={styles.inputInvite}
                                        variant="filled"
                                        placeholder={"Options"}
                                        inputProps={{
                                            ...params.inputProps
                                        }}
                                        sx={{
                                            // backgroundColor: "#fbe3e3",
                                            '& .MuiFilledInput-root': {
                                                padding: { lg: '10px', xs: '6px 8px' },
                                                // backgroundColor: props.errors.qOptions ? '#fbe3e3' : '',
                                                // color: props.errors.qOptions ? '#c41a1a' : '',
                                            }
                                        }}
                                    />
                                    {((props.errors.qOptions as unknown) as boolean) &&
                                        ((props.touched.qOptions as unknown) as boolean) ? (
                                        <ErrorMessage name={"qOptions"}>
                                            {(msg) => (
                                                <div className={styles.errorStyle}>{msg}</div>
                                            )}
                                        </ErrorMessage>
                                    ) : null}
                                </>
                            );
                        }}

                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddQuestions;