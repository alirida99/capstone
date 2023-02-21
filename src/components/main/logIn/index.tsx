/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import styles from './login.module.scss';
import FormikField from '../../general/Layouts/TextField/FormikField';
import { useAuth } from '../../../../context/AuthContext';
import { useRouter } from 'next/router';
import AppContext from '../../AppContext/AppContext';

interface FormValues {
    email: string;
    password: string;
}

interface LoginComponentProps { }
const LoginComponent: React.FC<LoginComponentProps> = () => {
    const { user, login, loginUsers } = useAuth();
    const router = useRouter()
    const context = useContext(AppContext)

    const [showPassword, setShowPassword] = useState(false);
    // const [data, setData] = useState({
    //     email: '',
    //     password: '',
    // })

    const [users, setUsers] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json`);

            if (!response.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();

            const loadedUsers = [];

            for (const key in responseData) {
                loadedUsers.push({
                    id: key,
                    email: responseData[key].email,
                    password: responseData[key].password,
                });
            }
            setUsers(loadedUsers);
            setIsLoading(false);
        }
        fetchUsers().catch((error) => {
            setIsLoading(false);
            setHttpError(`${error.message}`)
        });
    }, []);

    const handleLogin = async (values: FormValues) => {
        // const { email, password } = values;
        // // e.preventDefault();
        // console.log(user)

        // try {
        //     await login(email, password)
        //     router.push('/home')
        // } catch (err) {
        //     console.log(err)
        // }
        const enteredUser = {
            email: values.email,
            password: values.password,
        }
        const email = users.map((user: any) => {
            return (
                `${user.email}`
            )
        });
        const password = users.map((user: any) => {
            return (
                `${user.password}`
            )
        });
        try {
            if (email.includes(enteredUser.email) && password.includes(enteredUser.password)) {
                context.setSession(enteredUser.email)
                await loginUsers
                router.push({
                    pathname: '/user/userHome',
                    query: { email: enteredUser.email }
                })
            } else {
                setHttpError("Incorrect Email OR Password")
            }
        } catch (err) {
            setHttpError(`${err}`)
        }
    }

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .max(320, "Email is too long, it should be 320 characters max!")
            .required("Email Address is required!")
            .test(
                "Validate Email",
                "Email Invalid",
                (value) => {
                    const re =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return re.test(String(value).trim())
                },
            ),
        password: Yup.string()
            .required("Password is required!"),
    });

    const handleClickShowPassword = () => {
        showPassword ? setShowPassword(false) : setShowPassword(true);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
    }

    return (
        <Box>
            <Grid container className={styles.container}>
                <Grid item xs={6}>
                    <img src='/images/e-learning-login.webp' className={styles.img} />
                </Grid>
                <Grid item xs={6} container className={styles.secondContainer}>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src='/images/eboardlogo.jpg' className={styles.logo} onClick={() => { router.push('/') }} />
                    </Grid>
                    {httpError &&
                        <Grid className={styles.error}>
                            {httpError}
                        </Grid>
                    }
                    <Formik
                        validationSchema={LoginSchema}
                        //   validateOnBlur={false}
                        validateOnChange
                        onSubmit={handleLogin}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                    >
                        {({ dirty, isValid, errors, touched }) => {
                            return (
                                <Box>
                                    <Form>
                                        <Grid container>
                                            <Grid item xs={12} style={{ textAlign: 'left', marginBottom: '50px' }}>
                                                <FormikField
                                                    // onChange={(e: any) => {
                                                    //     setData({
                                                    //         ...data,
                                                    //         email: e.target.value,
                                                    //     })
                                                    // }}
                                                    // value={data.email}
                                                    name="email"
                                                    label="Email Address"
                                                    placeholder={'Email'}
                                                    type="text"
                                                    error={
                                                        (errors.email as unknown as boolean) && (touched.email as unknown as boolean)
                                                    }
                                                    sx={{ width: '100%' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} style={{ textAlign: 'left', marginBottom: '50px' }}>
                                                <FormikField
                                                    // onChange={(e: any) => {
                                                    //     setData({
                                                    //         ...data,
                                                    //         password: e.target.value,
                                                    //     })
                                                    // }}
                                                    // value={data.password}
                                                    name="password"
                                                    label="Password"
                                                    placeholder="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    sx={{ width: '100%' }}
                                                    inputProps={{
                                                        endAdornment: (
                                                            <><InputAdornment position="end" sx={{ padding: '10px' }}>
                                                                <IconButton
                                                                    style={{ marginRight: '5px' }}
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    // onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ?
                                                                        <VisibilityIcon />
                                                                        :
                                                                        <VisibilityOffIcon />
                                                                    }
                                                                </IconButton>
                                                            </InputAdornment></>
                                                        ),
                                                    }}
                                                    error={
                                                        (errors.password as unknown as boolean) && (touched.password as unknown as boolean)
                                                    }
                                                />
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <LoadingButton
                                                        type="submit"
                                                        // loading={loading}
                                                        disabled={!dirty || !isValid}
                                                        sx={{ textTransform: 'capitalize', width: '200px', height: '55px', fontSize: '18px !important', fontWeight: 'normal' }}
                                                        variant="contained">
                                                        Sign in
                                                    </LoadingButton>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={5}>
                                                <Grid item xs>
                                                    <Link href="#" variant="body2" style={{ fontSize: '18px' }}>
                                                        Forgot password?
                                                    </Link>
                                                </Grid>
                                                <Grid item>
                                                    <Link href="/signUp" variant="body2" style={{ fontSize: '18px' }}>
                                                        {"Don't have an account? Sign Up"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Box>
                            )
                        }}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LoginComponent;