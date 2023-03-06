import styles from './exam.module.scss';
import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';


import {
  Formik,
  Form,
  Field
} from 'formik';
import Footer from '../../footer';
import UserAppbar from '../appbar';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import FormikField from '@/components/general/Layouts/TextField/FormikField';
/** Exam List + Exam Page */

function UsersExam() {
  const router = useRouter()
  const [popUp, setPopUp] = useState(false)
  const tutorialTitle = router.query.tutorialTitle;
  const [exams, setExams] = useState([] as any);
  const [questions, setQuestions] = useState([] as any);
  const [myExam, setMyExam] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [grades, setGrades] = useState()
  const [finalGrade, setFinalGrade] = useState()

  const examId = router.query.examId;
  const listMode = router.query.listMode;

  const thisExam = exams.filter((exam: any) => {
    return `${exam.type}`.toLowerCase() === `${tutorialTitle}`.toLowerCase();
  });
  const listExam = exams.filter((exam: any) => {
    return `${exam.id}` === `${examId}`;
  });

  useEffect(() => {
    const fetchExams = async () => {
      const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/exams.json');
      const responseQues = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/exams/${myExam.map((exam: any) => exam.id)}/questions.json`);

      if (!response.ok || !responseQues.ok) {
        throw new Error('Something went wrong!!')
      }

      const responseData = await response.json();
      const responseDataQues = await responseQues.json();

      const loadedExams = [];
      const loadedQuestions = [];

      for (const key in responseData) {
        loadedExams.push({
          id: key,
          type: responseData[key].type,
          numberOfQuestions: responseData[key].noq,
          time: responseData[key].time,
          questions: responseData[key].questions,
        });
      }
      for (const key in responseDataQues) {
        loadedQuestions.push({
          id: key,
          grade: responseDataQues[key].grade,
          options: responseDataQues[key].options,
          sentence1: responseDataQues[key].sentence1,
          sentence2: responseDataQues[key].sentence2,
          trueAnswer: responseDataQues[key].trueAnswer,
          type: responseDataQues[key].type,
        });
      }
      setExams(loadedExams);
      setQuestions(loadedQuestions);
      setMyExam(!listMode ? thisExam : listExam)
      setIsLoading(false);
    }
    fetchExams().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
  }, [listExam, listMode, myExam, thisExam]);

  const [time, setTime] = useState(0);

  useEffect(() => {
    // setTime(parseInt((`${myExam.map((exam: any) => exam.time * 60)}`), 10))
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  const [optionsValues, setOptionsValues] = useState([] as any)
  const onSubmit = (values: any) => {
    var result = questions.filter(function (o1: any) {
      // filter out (!) items in result2
      return optionsValues.some(function (o2: any) {
        return o1.id === o2.id && o1.trueAnswer === o2.value;          // assumes unique id
      });
    });
    if (result) {
      setGrades(result.reduce((a: any, v: any) => a = a + parseInt(v.grade, 10), 0))
      setFinalGrade(questions.reduce((a: any, v: any) => a = a + parseInt(v.grade, 10), 0))
    }
  }

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
        <div className={styles.center}>
          <div className={styles.tutorialcontainer}>
            <Formik
              initialValues={{
                options: '',
                fillIn: '',
              }}
              onSubmit={onSubmit}
            // onSubmit={(values, actions) => {
            //   console.log({ values, actions });
            // }}
            >
              {({ errors, touched, isSubmitting, values, setFieldValue, handleBlur, handleChange }) => {
                return (
                  <Form>
                    {myExam.map((exam: any) => {
                      setTime(exam.time * 60)
                      return (
                        <div key={exam.id}>
                          <h1 className={styles.tutorialtitle}> {exam.type} </h1>
                          {/* <Timer /> */}
                          <Grid className={styles.timer}>
                            {`${Math.floor(time / 60)}`.padStart(2, `${0}`)}:
                            {`${time % 60}`.padStart(2, `${0}`)}
                          </Grid>
                          {/**MCQ Questions */}
                          {questions.map((question: any) => {
                            const specificOption = optionsValues.find(
                              (option: any) => option.id === question.id
                            );
                            return (
                              <div key={question.id}>
                                {question.type === 'OP' &&
                                  <div className={styles.questionbox}> {/**each question is contained inside a questionbox */}
                                    <h2 className={styles.questionstatement}>{`${question.sentence1} ... ${question.sentence2}`}</h2> {/**Question from database  */}
                                    {/**if mcq question  */}
                                    <div>
                                      <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="options"
                                        onChange={handleChange}
                                        onBlur={(e: any) => {
                                          if (!specificOption) {
                                            setOptionsValues((current: any) => [...current, { id: question.id, value: e.target.value }])
                                          } else {
                                            specificOption.value = e.target.value
                                          }
                                        }}
                                      >
                                        {question.options?.map((option: any) => {
                                          return (
                                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                          )
                                        })}
                                      </RadioGroup>
                                    </div>
                                  </div>
                                }
                                {/** end of questionbox */}
                                <br /><br />
                                {/**Drag / Drop Questions */}

                                {question.type === 'DAD' &&
                                  <div className={styles.questionbox}>

                                    <div className={styles.questionstatement}>

                                      <span>Before drag/drop sentence </span>


                                      <span>After drag/drop sentence </span>


                                    </div>
                                  </div>}
                                {question.type === 'DAD' && <div>

                                  <br /><br />
                                </div>
                                }


                                {/**Fill in the blank */}
                                {question.type === 'FITB' &&
                                  <div className={styles.questionbox}>
                                    <Grid container>
                                      <Grid item>
                                        <span className={styles.questionstatement}>{question.sentence1}</span>
                                      </Grid>
                                      <Grid item xs={0.2}></Grid>
                                      <Grid item xs={5.4}>
                                        <FormikField
                                          name="fillIn"
                                          placeholder={"Fill In The Blank!"}
                                          // defaultValue={addExamMode ? '' : tutorialInfo.noq}
                                          // value={values.firstName}
                                          type="text"
                                          sx={{
                                            // marginTop: "20px",
                                            color: 'white',
                                            width: '300px',
                                            "& .css-0": {
                                              display: 'inline'
                                            },
                                            "& .MuiOutlinedInput-root": {
                                              height: { xs: "44px", lg: "34px" },
                                              padding: {
                                                xs: "10px 0 10px 0",
                                                lg: "20px 0 20px 0",
                                              },
                                              borderRadius: { xs: "8px", lg: "10px" },
                                              color: 'white',
                                              fontSize: { xs: "16px", lg: "18px" },
                                            },
                                            "& .MuiOutlinedInput-input": {
                                              textAlign: 'center',
                                            },
                                            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                              border: 'none',
                                              borderBottom: '1px solid white',
                                            },
                                            "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline: hover": {
                                              border: 'none',
                                              borderBottom: '1px solid green'
                                            },
                                          }}
                                        />
                                      </Grid>
                                      <Grid item xs={0.2}></Grid>
                                      <Grid item>
                                        <span className={styles.questionstatement}>{question.sentence2}</span>
                                      </Grid>
                                    </Grid>
                                    {/* <Field className={styles.fillblank} name="name" placeholder=' fill in the blank' /> */}
                                  </div>
                                }
                              </div>
                            )
                          })
                          }
                        </div>
                      )
                    })}

                    <br /><br />

                    <button type='submit' onClick={() => setPopUp(true)} className={styles.submit} > Submit </button> {/** when pressed popup box of grade + view grades button*/}
                  </Form>
                )
              }}
            </Formik>
          </div>
          {popUp && <PopUp setPopUp={() => setPopUp(false)} grades={grades} finalGrade={finalGrade} />}
          <Footer />
        </div></div>

    </>
  );

}
export default UsersExam;






const PopUp = (props: any) => {
  // function that takes boolean as param to conditionally display popup
  const setPopUp = props.setPopUp;

  const percentage = Math.floor((props.grades / props.finalGrade) * 100)

  const talk = percentage >= 90 && 'Excellent Work!'
    || percentage >= 80 && percentage < 90 && "Very Good Work!"
    || percentage >= 70 && percentage < 80 && 'Good Work!'
    || percentage < 70 && percentage >= 60 && 'You Can Do Better!'
    || percentage < 60 && 'You must study harder!'

  return (
    <div className={styles.PopUp} >
      <div className={styles.pucontentcontainer}>
        <h1>Result:</h1>
        <h1> {props.grades} of {props.finalGrade}</h1> {/**correct answers/total questions */}
        <h1> {Math.floor((props.grades / props.finalGrade) * 100)} %</h1> {/**percentage */}
        <h1>{talk}</h1> {/**if high grade : Good Job! */}
      </div>
      {/* button controls */}
      <div className={styles.pubuttoncontainer} >
        <button className={styles.popupbutton} onClick={() => { router.push('/user/userGrades') }}> View All Grades </button>
        <button className={styles.popupbutton} onClick={() => { router.push('/user/userExamList') }}>Back to exams</button>
      </div>
    </div>
  );
}
const Timer = () => {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  var timer: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000)

    return () => clearInterval(timer);

  });

  const restartTimer = () => {

    setSeconds(0);
    setMinutes(0);
  }
  return (

    <div className={styles.timer}>
      Time: {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
    </div>
  )
}

