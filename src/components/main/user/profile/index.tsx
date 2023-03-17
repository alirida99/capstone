import styles from './profile.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import {
  Formik,
  Form,
  Field
} from 'formik';
import router, { useRouter } from 'next/router';
import UserAppbar from '../appbar';
import Footer from '../../footer';
import AppContext from '../../../AppContext/AppContext';
import FormikField from '@/components/general/Layouts/TextField/FormikField';
import { Grid } from '@mui/material';
import * as Yup from 'yup';
import Alert from '../alert';
import Snackbar from '@mui/material/Snackbar';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function UserProfileComponent() { //update profile information form 
  const router = useRouter()

  const [users, setUsers] = useState([] as any);
  // const [user, setUser] = useState([] as any);
  const [myUser, setMyUser] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const context = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [thisEmail, setThisEmail] = useState([] as any);

  const thisUser = users.filter((user: any) => {
    return user.email === `${thisEmail.map((email: any) => email.userEmail)}`;
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json');
      const responseUser = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/currentUser.json');

      if (!response.ok || !responseUser.ok) {
        throw new Error('Something went wrong!!')
      }

      const responseData = await response.json();
      const responseUserData = await responseUser.json();

      const loadedUsers = [];
      const loadedCurrentUser = [];

      for (const key in responseData) {
        loadedUsers.push({
          id: key,
          firstName: responseData[key].firstName,
          familyName: responseData[key].familyName,
          email: responseData[key].email,
          phoneNumber: responseData[key].phoneNumber,
          age: responseData[key].age,
          password: responseData[key].password,
          grades: responseData[key].grades,
        });
      }
      for (const key in responseUserData) {
        loadedCurrentUser.push({
          id: key,
          userEmail: responseUserData[key].userEmail,
        });
      }

      setThisEmail(loadedCurrentUser)
      setUsers(loadedUsers);
      setMyUser(thisUser)
      setIsLoading(false);
    }
    fetchUsers().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
  }, [thisEmail, thisUser]);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^(?!\s+$).*$/,
        "First Name don't match"
      )
      .matches(/^[A-Za-z ]*$/, "")
      .min(3, "Too short! Should be at least 3 characters.")
      .max(35, "Too long! Should be at most 35 characters.")
      .required("First Name is required!"),
    familyName: Yup.string()
      .matches(
        /^(?!\s+$).*$/,
        "Family Name don't match"
      )
      .matches(
        /^[A-Za-z ]*$/,
        "Family Name don't match"
      )
      .min(3, "Too short! Should be at least 3 characters.")
      .max(35, "Too long! Should be at most 35 characters.")
      .required("Family Name is required!"),
    phoneNumber: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is invalid'
      )
      .min(8, "Phone number should be 8 characters.")
      .max(8, "Phone number should be 8 characters.")
      .required("Phone number is required!"),
    age: Yup.string()
      .required('Age is required.')
      .min(1, 'Age should be entered.')
      .max(2, 'Age must be max 99.')
  });

  async function editUserHandler(user: any) {
    const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users/${myUser.map((user: any) => user.id)}.json`, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  }
  function onSubmit(values: any) {
    const user = {
      firstName: values.firstName,
      familyName: values.familyName,
      email: values.email,
      age: values.age,
      phoneNumber: values.phoneNumber,
    }
    console.log(user);
    editUserHandler(user);
    setOpen(true);
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
        <div className={styles.container}>
          <Formik
            initialValues={{
              firstName: myUser.firstName,
              familyName: myUser.familyName,
              age: myUser.age,
              phoneNumber: myUser.phoneNumber,
              email: myUser.email,
            }}
            validationSchema={SignupSchema}
            validateOnChange
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue, handleBlur, handleChange }) => {
              return (
                <Form>
                  <h2 className={styles.title} >Personal Information</h2>
                  {!httpError && !isLoading && myUser.map((user: any) => {
                    return (
                      <Grid container key={user.id}>
                        <Grid item xs={12} container paddingBottom={0} sx={{ width: '100%', height: '100px' }}>
                          <Grid item xs={5.5} paddingBottom={0} sx={{
                            width: "100%",
                            height: "100px",
                          }}>
                            <span style={{
                              width: "98px",
                              height: "20px",
                              fontSize: "16px",
                              lineHeight: "1.25",
                              color: 'white'
                            }}>First Name</span>
                            <FormikField
                              name="firstName"
                              placeholder={"First Name"}
                              // defaultValue={addExamMode ? '' : tutorialInfo.noq}
                              // value={values.firstName}
                              defaultValue={user.firstName}
                              type="text"
                              error={
                                ((errors.firstName as unknown) as boolean) &&
                                ((touched.firstName as unknown) as boolean)
                              }
                              sx={{
                                marginTop: "20px",
                                color: 'white',
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
                                  borderBottom: '1px solid green'
                                },
                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline: hover": {
                                  border: 'none',
                                  borderBottom: '1px solid green'
                                }
                              }}
                            />
                          </Grid>
                          <Grid xs={1}></Grid>
                          <Grid item xs={5.5} paddingBottom={0} sx={{
                            width: "100%",
                            height: "100px",
                          }}>
                            <span style={{
                              width: "98px",
                              height: "20px",
                              fontSize: "16px",
                              lineHeight: "1.25",
                              color: 'white',
                            }}>Family Name</span>
                            <FormikField
                              name="familyName"
                              placeholder={"Family Name"}
                              // defaultValue={addExamMode ? '' : tutorialInfo.noq}
                              // value={values.familyName}
                              defaultValue={user.familyName}
                              type="text"
                              error={
                                ((errors.familyName as unknown) as boolean) &&
                                ((touched.familyName as unknown) as boolean)
                              }
                              sx={{
                                marginTop: "20px",
                                "& .MuiOutlinedInput-root": {
                                  // textAlign: 'center',
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
                                  borderBottom: '1px solid green'
                                },
                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline: hover": {
                                  border: 'none',
                                  borderBottom: '1px solid green'
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                          <Grid item paddingBottom={0} sx={{
                            width: "100%",
                            height: "100px",
                          }}>
                            <span style={{
                              width: "98px",
                              height: "20px",
                              fontSize: "16px",
                              lineHeight: "1.25",
                              color: 'white'
                            }}>Age</span>
                            <FormikField
                              name="age"
                              placeholder={"Age"}
                              // defaultValue={addExamMode ? '' : tutorialInfo.noq}
                              // value={values.firstName}
                              defaultValue={user.age}
                              type="number"
                              error={
                                ((errors.age as unknown) as boolean) &&
                                ((touched.age as unknown) as boolean)
                              }
                              sx={{
                                marginTop: "20px",
                                color: 'white',
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
                                  borderBottom: '1px solid green'
                                },
                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline: hover": {
                                  border: 'none',
                                  borderBottom: '1px solid green'
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                          <Grid item paddingBottom={0} sx={{
                            width: "100%",
                            height: "100px",
                            // marginTop: '20px'
                          }}>
                            <span style={{
                              width: "98px",
                              height: "20px",
                              fontSize: "16px",
                              lineHeight: "1.25",
                              color: 'white'
                            }}>Phone Number</span>
                            <FormikField
                              name="phoneNumber"
                              placeholder={"Phone Number"}
                              // defaultValue={addExamMode ? '' : tutorialInfo.noq}
                              // value={values.firstName}
                              defaultValue={user.phoneNumber}
                              type="number"
                              error={
                                ((errors.phoneNumber as unknown) as boolean) &&
                                ((touched.phoneNumber as unknown) as boolean)
                              }
                              sx={{
                                marginTop: "20px",
                                color: 'white',
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
                                  borderBottom: '1px solid green'
                                },
                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:hover": {
                                  border: 'none',
                                  borderBottom: '1px solid green'
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                          <Grid item paddingBottom={0} sx={{
                            width: "100%",
                            height: "100px",
                          }}>
                            <span style={{
                              width: "98px",
                              height: "20px",
                              fontSize: "16px",
                              lineHeight: "1.25",
                              color: 'white'
                            }}>Email</span>
                            <FormikField
                              name="email"
                              placeholder={"Email"}
                              defaultValue={user.email}
                              disabled
                              type="text"
                              sx={{
                                marginTop: "20px",
                                color: 'white',
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
                                },
                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:hover": {
                                  border: 'none',
                                },
                                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                                  '-webkit-text-fill-color': 'gray',
                                  border: 'none',
                                  borderBottom: '1px solid green'
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  })}
                  <div style={{ textAlign: 'center' }}>
                    {!httpError && isLoading &&
                      <HourglassTopIcon sx={{ width: '50px', height: '50px', color: 'green', marginBottom: '50px' }} />
                    }
                  </div>
                  <button className={styles.update} type="submit">Update Information</button>
                  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Information Updated Successfully!
                    </Alert>
                  </Snackbar>
                  <br />
                  <br />
                  <button onClick={() => { router.push('/user/userChangepass') }} className={styles.changepass}>Change Password</button>

                  <button onClick={() => { router.push('/user/userGrades') }} className={styles.grades}>View Grades</button>

                </Form>
              )
            }}
          </Formik>
        </div>
        <Footer />
      </div>

    </>


  );

}
export default UserProfileComponent;