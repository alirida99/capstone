import styles from './password.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import Back from '@mui/icons-material/ArrowBack';
import {
  Formik,
  Form,
  Field
} from 'formik';
import router, { useRouter } from 'next/router';
import UserAppbar from '../appbar';
import Footer from '../../footer';
import Icon from '@mui/material/Icon';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import AppContext from '../../../AppContext/AppContext';
import FormikField from '@/components/general/Layouts/TextField/FormikField';
import { Grid, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from "../alert";

function UserChangepass() { //change password form
  const router = useRouter()
  const [users, setUsers] = useState([] as any);
  const [myUser, setMyUser] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");
  const context = useContext(AppContext);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [thisEmail, setThisEmail] = useState([] as any);

  const email = context.session;

  const thisUser = users.filter((user: any) => {
    return user.email === `${thisEmail.map((email: any) => email.userEmail)}`;
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
    setErrorOpen(false);
  };
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(
    false
  );

  const handleClickShowCurrentPassword = () => {
    showCurrentPassword
      ? setShowCurrentPassword(false)
      : setShowCurrentPassword(true);
  };

  const handleClickShowNewPassword = () => {
    showNewPassword
      ? setShowNewPassword(false)
      : setShowNewPassword(true);
  };

  const handleClickShowConfirmPassword = () => {
    showConfirmPassword
      ? setShowConfirmPassword(false)
      : setShowConfirmPassword(true);
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
        });
      }
      for (const key in responseUserData) {
        loadedCurrentUser.push({
          id: key,
          userEmail: responseUserData[key].userEmail,
        });
      }
      setUsers(loadedUsers);
      setThisEmail(loadedCurrentUser)
      setMyUser(thisUser)
      setIsLoading(false);
    }
    fetchUsers().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
  }, [thisUser]);

  const SignupSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(8, "Too short! Should be at least 8 characters.")
      .required("Password is required!"),
    newPassword: Yup.string()
      .min(8, "Too short! Should be at least 8 characters.")
      .required("Password is required!"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords missmatch!"
      )
      .required("Confirm Password is required!"),
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
      password: values.newPassword,
    }
    if (values.currentPassword === `${myUser.map((user: any) => user.password)}`) {
      console.log(user);
      editUserHandler(user);
      setSuccessOpen(true);
      router.push('/user/userProfile')
    } else {
      setErrorOpen(true);
      setHttpError("Current Password is false!");
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
        <div className={styles.container}>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            validateOnChange
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue, handleBlur, handleChange }) => {
              return (
                <Form>
                  <button className={styles.back} onClick={() => { router.push('/user/userProfile') }}> <Icon><Back /></Icon></button>
                  <h1 className={styles.title}>
                    Change Password
                  </h1>
                  <Grid container>
                    <Grid item xs={12}
                      style={{ textAlign: 'left', marginBottom: '50px' }}
                      sx={{
                        "& .formikStyles_label__RfNic": {
                          color: "white"
                        },
                      }}>
                      <FormikField
                        name="currentPassword"
                        label="Current Password"
                        placeholder="Current Password"
                        type={showCurrentPassword ? "text" : "password"}
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
                        inputProps={{
                          endAdornment: (
                            <><InputAdornment position="end" sx={{
                              "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
                                color: 'green !important'
                              },
                              padding: '10px',
                            }}>
                              <IconButton
                                // style={{ marginRight: '5px' }}
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCurrentPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showCurrentPassword ?
                                  <VisibilityIcon />
                                  :
                                  <VisibilityOffIcon />
                                }
                              </IconButton>
                            </InputAdornment></>
                          ),
                        }}
                        error={
                          (errors.currentPassword as unknown as boolean) && (touched.currentPassword as unknown as boolean)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}
                      style={{ textAlign: 'left', marginBottom: '50px' }}
                      sx={{
                        "& .formikStyles_label__RfNic": {
                          color: "white"
                        },
                      }}>
                      <FormikField
                        name="newPassword"
                        label="New Password"
                        placeholder="New Password"
                        type={showNewPassword ? "text" : "password"}
                        sx={{
                          marginTop: "20px",
                          color: 'white',
                          "& .formikStyles_label__RfNic": {
                            color: "white"
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
                            borderBottom: '1px solid green'
                          },
                          "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline: hover": {
                            border: 'none',
                            borderBottom: '1px solid green'
                          }
                        }}
                        inputProps={{
                          endAdornment: (
                            <><InputAdornment position="end" sx={{
                              "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
                                color: 'green !important'
                              },
                              padding: '10px',
                            }}>
                              <IconButton
                                // style={{ marginRight: '5px' }}
                                aria-label="toggle password visibility"
                                onClick={handleClickShowNewPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showNewPassword ?
                                  <VisibilityIcon />
                                  :
                                  <VisibilityOffIcon />
                                }
                              </IconButton>
                            </InputAdornment></>
                          ),
                        }}
                        error={
                          (errors.newPassword as unknown as boolean) && (touched.newPassword as unknown as boolean)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} style={{ textAlign: 'left', marginBottom: '50px' }}
                      sx={{
                        "& .formikStyles_label__RfNic": {
                          color: "white"
                        },
                      }}>
                      <FormikField
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        sx={{
                          marginTop: "20px",
                          color: 'white',
                          "& .formikStyles_label__RfNic": {
                            color: "white"
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
                            borderBottom: '1px solid green'
                          },
                          "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline: hover": {
                            border: 'none',
                            borderBottom: '1px solid green'
                          }
                        }}
                        inputProps={{
                          endAdornment: (
                            <><InputAdornment position="end" sx={{
                              "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
                                color: 'green !important'
                              },
                              padding: '10px',
                            }}>
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ?
                                  <VisibilityIcon />
                                  :
                                  <VisibilityOffIcon />
                                }
                              </IconButton>
                            </InputAdornment></>
                          ),
                        }}
                        error={
                          (errors.confirmPassword as unknown as boolean) && (touched.confirmPassword as unknown as boolean)
                        }
                      />
                    </Grid>
                  </Grid>
                  <button className={styles.update} type="submit">Change Password</button>
                  <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Password Changed Successfully!
                    </Alert>
                  </Snackbar>
                  <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      {httpError}
                    </Alert>
                  </Snackbar>
                </Form>
              )
            }}
          </Formik>
        </div><Footer /></div>

    </>

  );
}
export default UserChangepass;