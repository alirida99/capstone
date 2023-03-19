import styles from './exam.module.scss';
import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import { Flex, Heading } from "@chakra-ui/react";
import Dnd, { Blank } from "./DnD";


import {
  Formik,
  Form,
  Field
} from 'formik';
import Footer from '../../footer';
import UserAppbar from '../appbar';
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import FormikField from '@/components/general/Layouts/TextField/FormikField';
import ExamTimer from '../timer';
// import DragAndDrop from './dragAndDrop';
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
  const [grades, setGrades] = useState(0);
  const [finalGrade, setFinalGrade] = useState(0);
  const [thisEmail, setThisEmail] = useState([] as any);
  const [users, setUsers] = useState([] as any);
  const [myUser, setMyUser] = useState([] as any);
  const [myGrades, setMyGrades] = useState([] as any);
  const [optionsValues, setOptionsValues] = useState([] as any)
  const [fitbValues, setFITBValues] = useState([] as any)
  const [dndValues, setDNDValues] = useState([] as any)

  const examId = router.query.examId;
  const listMode = router.query.listMode;

  const thisUser = users.filter((user: any) => {
    return user.email === `${thisEmail.map((email: any) => email.userEmail)}`;
  });

  const thisExam = exams.filter((exam: any) => {
    return `${exam.type}`.toLowerCase() === `${tutorialTitle}`.toLowerCase();
  });
  const listExam = exams.filter((exam: any) => {
    return `${exam.id}` === `${examId}`;
  });
  const grade = {
    examTitle: `${myExam.map((exam: any) => exam.type)}`,
    gradePercent: Math.floor((grades / finalGrade) * 100)
  }
  const ifPercentGrade = myGrades.filter((thisGrade: any) => {
    return thisGrade.examTitle === grade.examTitle
  })

  useEffect(() => {
    const fetchExams = async () => {
      const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/exams.json');
      const responseQues = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/exams/${myExam.map((exam: any) => exam.id)}/questions.json`);
      const responseUsers = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json');
      const responseUser = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/currentUser.json');
      const responseGrade = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users/${myUser.map((user: any) => user.id)}/grades.json`);

      if (!response.ok || !responseQues.ok || !responseUser.ok || !responseUsers.ok || !responseGrade.ok) {
        throw new Error('Something went wrong!!')
      }

      const responseData = await response.json();
      const responseDataQues = await responseQues.json();
      const responseUserData = await responseUser.json();
      const responseUsersData = await responseUsers.json();
      const responseGradesData = await responseGrade.json();

      const loadedExams = [];
      const loadedQuestions = [];
      const loadedCurrentUser = [];
      const loadedAllUsers = [];
      const loadedGrades = [];

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
      for (const key in responseUsersData) {
        loadedAllUsers.push({
          id: key,
          firstName: responseUsersData[key].firstName,
          familyName: responseUsersData[key].familyName,
          email: responseUsersData[key].email,
          phoneNumber: responseUsersData[key].phoneNumber,
          age: responseUsersData[key].age,
          password: responseUsersData[key].password,
          grades: responseUsersData[key].grades,
        });
      }
      for (const key in responseUserData) {
        loadedCurrentUser.push({
          id: key,
          userEmail: responseUserData[key].userEmail,
        });
      }
      for (const key in responseGradesData) {
        loadedGrades.push({
          id: key,
          examTitle: responseGradesData[key].examTitle,
          gradePercent: responseGradesData[key].gradePercent,
        });
      }

      setMyGrades(loadedGrades)
      setThisEmail(loadedCurrentUser)
      setExams(loadedExams);
      setUsers(loadedAllUsers);
      setQuestions(loadedQuestions);
      setMyExam(!listMode ? thisExam : listExam)
      setMyUser(thisUser)
      setIsLoading(false);
    }
    fetchExams().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
    var result = questions.filter(function (o1: any) {
      // filter out (!) items in result2
      return optionsValues.some(function (o2: any) {
        return o1.id === o2.id && o1.trueAnswer.toLowerCase() === o2.value;          // assumes unique id
      });
    });
    var result2 = questions.filter(function (o1: any) {
      // filter out (!) items in result2
      return fitbValues.some(function (o2: any) {
        return o1.id === o2.id && o1.trueAnswer.toLowerCase() === o2.value;          // assumes unique id
      });
    });
    var result3 = questions.filter(function (o1: any) {
      // filter out (!) items in result2
      return dndValues.some(function (o2: any) {
        return o1.id === o2.id && o1.trueAnswer.toLowerCase() === o2.value.toLowerCase();          // assumes unique id
      });
    });
    setGrades(result.reduce((a: any, v: any) => a = a + parseInt(v.grade, 10), 0) + result2.reduce((a: any, v: any) => a = a + parseInt(v.grade, 10), 0) + result3.reduce((a: any, v: any) => a = a + parseInt(v.grade, 10), 0))
    setFinalGrade(questions.reduce((a: any, v: any) => a = a + parseInt(v.grade, 10), 0))
  }, [dndValues, fitbValues, listExam, listMode, myExam, myUser, optionsValues, questions, thisExam, thisUser]);

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
  }, [myUser]);

  async function addGradeToUser(grade: any) {
    const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users/${myUser.map((user: any) => user.id)}/grades.json`, {
      method: 'POST',
      body: JSON.stringify(grade),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  }
  async function editGradeUser(grade: any) {
    const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users/${myUser.map((user: any) => user.id)}/grades/${ifPercentGrade.map((grade: any) => grade.id)}.json`, {
      method: 'PATCH',
      body: JSON.stringify(grade),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  }

  const onSubmit = (values: any) => {
    // if (result) {
    const ifGrade = myGrades.map((grade: any) => grade.examTitle)
    if (!ifGrade.includes(grade.examTitle)) {
      addGradeToUser(grade)
    } else {
      if (ifPercentGrade.map((per: any) => per.gradePercent) >= grade.gradePercent) {
        console.log("Done!")
      } else {
        editGradeUser(grade)
      }
      // }
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
        filter: popUp ? 'blur(4px)' : 'none',
      }}>
        <UserAppbar />
        <div className={styles.center}>
          <div className={styles.tutorialcontainer}>
            <Formik
              initialValues={{
                options: '',
                fillIn: '',
                dnd: '',
              }}
              onSubmit={onSubmit}
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
                            {/* {`${Math.floor(time / 60)}`.padStart(2, `${0}`)}:
                            {`${time % 60}`.padStart(2, `${0}`)} */}
                            <ExamTimer time={exam.time * 60} />
                          </Grid>
                          {/**MCQ Questions */}
                          {questions.map((question: any) => {
                            const specificOption = optionsValues.find(
                              (option: any) => option.id === question.id
                            );
                            const specificFITB = fitbValues.find(
                              (fitb: any) => fitb.id === question.id
                            );
                            const specificDND = dndValues.find(
                              (dnd: any) => dnd.id === question.id
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
                                            setOptionsValues((current: any) => [...current, { id: question.id, value: e.target.value.toLowerCase() }])
                                          } else {
                                            specificOption.value = e.target.value.toLowerCase()
                                          }
                                        }}
                                      >
                                        {question.options?.map((option: any) => {
                                          return (
                                            <FormControlLabel disabled={popUp} key={option} value={option} control={<Radio />} label={option} />
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
                                    <FormControl fullWidth>
                                      <Grid container>
                                        <Grid item>{question.sentence1}</Grid>
                                        <Grid item xs={0.2}></Grid>
                                        <Grid item xs={4}>
                                          <Select
                                            // labelId="demo-simple-select-label"
                                            name='dnd'
                                            onChange={handleChange}
                                            onBlur={(e: any) => {
                                              if (!specificDND) {
                                                setDNDValues((current: any) => [...current, { id: question.id, value: e.target.value }])
                                              } else {
                                                specificDND.value = e.target.value
                                              }
                                              console.log(dndValues)
                                            }}
                                            sx={{ width: '100%', height: '40px', color: 'white', border: '1px solid white' }}
                                          >
                                            {question.options?.map((option: any) => {
                                              return (
                                                <MenuItem
                                                  disabled={popUp}
                                                  key={option}
                                                  value={option}
                                                >{option}</MenuItem>
                                              )
                                            })
                                            }
                                          </Select>
                                        </Grid>
                                        <Grid item xs={0.2}></Grid>
                                        <Grid item>{question.sentence2}</Grid>
                                      </Grid>
                                    </FormControl>
                                  </div>}
                                {question.type === 'DAD' &&
                                  <div>
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
                                      <Grid item xs={4}>
                                        <TextField
                                          id="standard-basic"
                                          onChange={handleChange}
                                          onBlur={(e: any) => {
                                            if (!specificFITB) {
                                              setFITBValues((current: any) => [...current, { id: question.id, value: e.target.value }])
                                            } else {
                                              specificFITB.value = e.target.value
                                            }
                                          }}
                                          disabled={popUp}
                                          sx={{
                                            '& .css-1x51dt5-MuiInputBase-input-MuiInput-input': {
                                              color: 'white !important',
                                              textAlign: 'center',
                                            },
                                          }}
                                          autoComplete='off'
                                          className={styles.FITB}
                                          variant="standard" />
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
        </div></div>
      {popUp && <PopUp setPopUp={() => setPopUp(false)} grades={grades} finalGrade={finalGrade} />}
      <Footer />
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
    <div className={styles.PopUp} style={{ filter: 'none !important' }}>
      <div className={styles.pucontentcontainer}>
        <h1>Result:</h1>
        <h1> {props.grades} of {props.finalGrade}</h1> {/**correct answers/total questions */}
        <h1> {Math.floor((props.grades / props.finalGrade) * 100)} %</h1> {/**percentage */}
        <h1>{talk}</h1> {/**if high grade : Good Job! */}
      </div>
      {/* button controls */}
      <div className={styles.pubuttoncontainer} >
        <button className={styles.popupbutton} onClick={() => { router.push('/user/userGrades') }}> View All Grades </button>
        <button className={styles.popupbutton} onClick={() => { router.push('/user/userHome') }}>Go Home</button>
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

