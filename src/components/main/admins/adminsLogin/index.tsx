/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import styles from './adminsLogin.module.scss';
import FormikField from '../../../general/Layouts/TextField/FormikField';
import { useAuth } from '../../../../../context/AuthContext';
import { useRouter } from 'next/router';

interface FormValues {
    email: string;
    password: string;
}

interface LoginComponentProps { }
const AdminsLoginComponent: React.FC<LoginComponentProps> = () => {
    const { user, login } = useAuth();
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")
    // const [data, setData] = useState({
    //     email: '',
    //     password: '',
    // })

    const handleLogin = async (values: FormValues) => {
        const { email, password } = values;
        // e.preventDefault();
        console.log(user)

        try {
            await login(email, password)
            router.push('/admins/adminsHome')
            setError("")
        } catch (error: any) {
            setError(`${error.message}`)
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
                    <Grid item xs={12} sx={{ marginBottom: error ? '-60px' : '0px' }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src='/images/eboardlogo.jpg' className={styles.logo} onClick={() => { router.push('/') }} />
                    </Grid>
                    {error &&
                        <Grid className={styles.error}>
                            {error}
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
                                <Box sx={{ marginTop: error ? '-150px' : '0px' }}>
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
                                                    <Link onClick={() => { router.push('/user/ForgotPass') }} variant="body2" style={{ fontSize: '18px' }}>
                                                        Forgot password?
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

export default AdminsLoginComponent;