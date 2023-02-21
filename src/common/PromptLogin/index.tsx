import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, IconButton, InputAdornment, Modal, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './promptLogin.module.scss';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormikField from '../../components/general/Layouts/TextField/FormikField';
import { useAuth } from '../../../context/AuthContext';

interface FormValues {
    email: string;
    password: string;
}

interface LoginComponentProps {
    open: boolean;
    title: string;
    handleClose: () => void;
}

const PromptLogin: React.FC<LoginComponentProps> = ({ open, title, handleClose }: LoginComponentProps) => {
    const StyledLink = styled.a`
      color: #4dc5c0;
      margin: 0px 10px;
      font-size: 16px;
      font-weight: 500; `;

    const BackdropPropsModel = {
        style: {
            backgroundColor: 'rgba(22, 32, 76, 0.2)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
        },
    };

    const StyledRespLink = styled.a`
    color: #4dc5c0;
    margin: 0px 12px;
    font-size: 14px;
    font-weight: 500;`;

    const { user, login, loginUsers } = useAuth();
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);

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
        // console.log(user)

        // try {
        //     await loginUsers
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
        // if (email.includes(enteredUser.email) && password.includes(enteredUser.password)) {
        //     await loginUsers
        //     router.push('/home')
        // }
        // console.log(enteredUser)
        // console.log(email)
        // console.log(password)
        try {
            if (email.includes(enteredUser.email) && password.includes(enteredUser.password)) {
                await loginUsers
                router.push('/home')
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
    const clearErrors = () => {
        handleClose();
        setHttpError("")
    }

    return (
        <>
            <Modal
                sx={{
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}
                className={styles.modalPopup}
                BackdropProps={BackdropPropsModel}
                open={open}
                onClose={clearErrors}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 'auto',
                            marginTop: '9%',
                            marginBottom: '20px',
                            bgcolor: "#fff",
                            borderRadius: "10px",
                            boxShadow: 24,
                            width: "652px",
                            p: 4,
                            display: { xs: "none", md: "none", lg: "block" },
                        }}>
                        <Grid
                            container
                            style={{ marginTop: "0px" }}>
                            <Grid item sx={{ width: "100% !important", display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <IconButton
                                    aria-label="close"
                                    onClick={clearErrors} >
                                    <img
                                        src="/images/icons-close.svg"
                                        onClick={clearErrors} />
                                </IconButton>
                            </Grid>
                            <Grid item sx={{ width: "652px !important" }}>
                                <Grid
                                    container
                                    style={{
                                        margin: "auto 0px",
                                        width: "100%",
                                        textAlign: "center",
                                    }} >
                                    <Grid
                                        item
                                        style={{
                                            margin: "auto 0px",
                                            width: "100%",
                                            textAlign: "center",
                                        }} >
                                        <Typography
                                            className={styles.loginTitle}
                                            sx={{
                                                width: '354px',
                                                height: "84px",
                                                margin: 'auto',
                                                fontSize: "32px",
                                                lineHeight: "1.31",
                                            }} >
                                            {title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {httpError &&
                                <Grid className={styles.error}>
                                    {httpError}
                                </Grid>
                            }
                            <Formik
                                validationSchema={LoginSchema}
                                validateOnChange
                                onSubmit={handleLogin}
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}>
                                {({ dirty, isValid, errors, touched }) => {
                                    return (
                                        <Box style={{ width: '100%' }}>
                                            <Form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    style={{ marginTop: "10px" }}
                                                    paddingBottom={0} >
                                                    <Grid item xs={12} paddingBottom={0}>
                                                        <FormikField
                                                            name="email"
                                                            label={"Email Address"}
                                                            placeholder={"Email"}
                                                            type="text"
                                                            error={
                                                                ((errors.email as unknown) as boolean) &&
                                                                ((touched.email as unknown) as boolean)
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid
                                                    container
                                                    spacing={2}
                                                    style={{ marginTop: "0px", paddingTop: "0px" }} >
                                                    <Grid item xs={12} style={{ paddingTop: "0px" }}>
                                                        <FormikField
                                                            name="password"
                                                            label="Password"
                                                            placeholder="Password"
                                                            type={showPassword ? "text" : "password"}
                                                            inputProps={{
                                                                endAdornment: (
                                                                    <>
                                                                        <InputAdornment
                                                                            position="end"
                                                                            sx={{ padding: "10px" }}
                                                                        >
                                                                            <IconButton
                                                                                aria-label="toggle password visibility"
                                                                                onClick={handleClickShowPassword}
                                                                                edge="end"
                                                                            >
                                                                                {showPassword ?
                                                                                    <VisibilityIcon />
                                                                                    :
                                                                                    <VisibilityOffIcon />
                                                                                }
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                        <InputAdornment position="end">
                                                                            <Link href="/forgotPassword" passHref>
                                                                                <StyledRespLink>
                                                                                    Forgot password?
                                                                                </StyledRespLink>
                                                                            </Link>
                                                                        </InputAdornment>
                                                                    </>
                                                                ),
                                                            }}
                                                            error={
                                                                ((errors.password as unknown) as boolean) &&
                                                                ((touched.password as unknown) as boolean)
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container marginTop={'32px'}>
                                                    <Grid item xs={12}>
                                                        <LoadingButton
                                                            type="submit"
                                                            disabled={!dirty || !isValid}
                                                            variant="contained"
                                                            sx={{
                                                                textTransform: "capitalize",
                                                                height: "55px",
                                                                fontSize: "18px !important",
                                                                fontWeight: "normal",
                                                                width: "97.5%",
                                                                margin: 'auto'
                                                            }} >
                                                            Sign in
                                                        </LoadingButton>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        </Box>
                                    );
                                }}
                            </Formik>
                            <Grid container>
                                <Grid item style={{ marginTop: "24px" }}>
                                    not a member yet?
                                    <Link href="/signUp" passHref>
                                        <StyledLink> Sign UP</StyledLink>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            maxHeight: '550px',
                            height: '100%',
                            // overflowY:'scroll',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 'auto',
                            // padding: 0px 100px 100px 100px;
                            marginTop: '9%',
                            marginBottom: '40px',
                            bgcolor: "#fff",
                            borderRadius: "10px",
                            boxShadow: 24,
                            width: "385px",
                            p: 2,
                            display: { xs: "none", md: "block", lg: "none" },
                        }}
                    >
                        <Grid
                            container
                            justifyContent={"center"}
                            style={{ marginTop: "0px" }} >

                            <Grid item width="100%">
                                <Grid item sx={{ textAlign: "end" }}>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={{ color: (theme) => theme.palette.grey[500] }}>
                                        <img
                                            src="/icons/icons-close.svg"
                                            onClick={handleClose} />
                                    </IconButton>
                                </Grid>
                                <Box style={{ width: '285px', margin: 'auto' }}>
                                    <Grid
                                        container
                                        style={{
                                            margin: "auto 0px",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Grid
                                            item
                                            style={{
                                                margin: "auto 0px",
                                                width: "100%",
                                                textAlign: "center",
                                            }}
                                        >
                                            <Typography
                                                className={styles.loginTitle}
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "1.25",
                                                }}
                                            >
                                                {title}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Formik
                                        validationSchema={LoginSchema}
                                        //   validateOnBlur={false}
                                        validateOnChange
                                        onSubmit={handleLogin}
                                        initialValues={{
                                            email: "",
                                            password: "",
                                        }}
                                    >
                                        {({ dirty, isValid, errors, touched }) => {
                                            return (
                                                <Box>
                                                    <Form>
                                                        <Grid
                                                            container
                                                            spacing={2}
                                                            style={{ marginTop: "10px" }}
                                                            paddingBottom={0}
                                                        >
                                                            <Grid item xs={12} paddingBottom={0}>
                                                                <FormikField
                                                                    fontSize="18px"
                                                                    size="small"
                                                                    name="email"
                                                                    label="Email Address"
                                                                    placeholder={"Email"}
                                                                    type="text"
                                                                    error={
                                                                        ((errors.email as unknown) as boolean) &&
                                                                        ((touched.email as unknown) as boolean)
                                                                    }
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                        <Grid
                                                            container
                                                            spacing={2}
                                                            style={{ marginTop: "12px", paddingTop: "0px" }}
                                                        >
                                                            <Grid item xs={12} style={{ paddingTop: "0px" }}>
                                                                <FormikField
                                                                    name="password"
                                                                    size="small"
                                                                    fontSize="18px"
                                                                    label="Password"
                                                                    placeholder="Password"
                                                                    type={showPassword ? "text" : "password"}
                                                                    inputProps={{
                                                                        endAdornment: (
                                                                            <>
                                                                                <InputAdornment
                                                                                    position="end"
                                                                                    sx={{ padding: "10px" }}
                                                                                >
                                                                                    <IconButton
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
                                                                                </InputAdornment>
                                                                                <InputAdornment position="end">
                                                                                    <Link href="/forgotPassword" passHref>
                                                                                        <StyledRespLink>
                                                                                            Forgot password?
                                                                                        </StyledRespLink>
                                                                                    </Link>
                                                                                </InputAdornment>
                                                                            </>
                                                                        ),
                                                                    }}
                                                                    error={
                                                                        ((errors.password as unknown) as boolean) &&
                                                                        ((touched.password as unknown) as boolean)
                                                                    }
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                        <Grid container marginTop={'24px'} marginBottom={'24px'}>
                                                            <Grid item xs={12}>
                                                                <LoadingButton
                                                                    type="submit"
                                                                    disabled={!dirty || !isValid}
                                                                    sx={{
                                                                        textTransform: "capitalize",
                                                                        height: "40px",
                                                                        fontSize: "16px !important",
                                                                        fontWeight: "normal",
                                                                        width: "100%",
                                                                    }}
                                                                    variant="contained"
                                                                >
                                                                    Sign in
                                                                </LoadingButton>
                                                            </Grid>
                                                        </Grid>
                                                    </Form>
                                                </Box>
                                            );
                                        }}
                                    </Formik>
                                    <Grid container>
                                        <Grid item style={{ marginTop: "10px", textAlign: "center", margin: 'auto' }}>
                                            not a member yet?
                                            <Link href="/signUp" passHref>
                                                <StyledRespLink> Sign UP</StyledRespLink>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 'auto',
                            // padding: 0px 100px 100px 100px;
                            marginTop: '9%',
                            marginBottom: '20px',
                            bgcolor: "#fff",
                            borderRadius: "10px",
                            boxShadow: 24,
                            width: "280px",
                            p: 2,
                            display: { xs: "block", md: "none", lg: "none" },
                        }}
                    >

                        <Grid
                            container
                            style={{ marginTop: "0px" }}
                            flexDirection={'row-reverse'}
                        >
                            <Grid item sx={{ textAlign: "end" }}>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{ color: (theme) => theme.palette.grey[500] }}>
                                    <img
                                        src="/icons/icons-close.svg"
                                        onClick={handleClose} />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Box margin={'auto'} style={{ width: '240px' }}>
                            <Grid
                                container
                                style={{
                                    margin: "auto 0px",
                                    width: "100%",
                                    textAlign: "center",
                                }}
                            >
                                <Grid
                                    item
                                    style={{
                                        margin: "auto 0px",
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        className={styles.loginTitle}
                                        sx={{
                                            width: '182px',
                                            fontSize: "16px",
                                            lineHeight: "1.25",
                                            textAlign: "center",
                                            margin: "auto"
                                        }}
                                    >
                                        {title}

                                    </Typography>
                                </Grid>
                            </Grid>
                            <Formik
                                validationSchema={LoginSchema}
                                //   validateOnBlur={false}
                                validateOnChange
                                onSubmit={handleLogin}
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                            >
                                {({ dirty, isValid, errors, touched }) => {
                                    return (
                                        <Box>
                                            <Form>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    style={{ marginTop: "10px" }}
                                                    paddingBottom={0}
                                                >
                                                    <Grid item xs={12} paddingBottom={0}>
                                                        <FormikField
                                                            size="small"
                                                            fontSize='18px'
                                                            name="email"
                                                            label="Email Address"
                                                            placeholder={"Email"}
                                                            type="text"
                                                            error={
                                                                ((errors.email as unknown) as boolean) &&
                                                                ((touched.email as unknown) as boolean)
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid
                                                    container
                                                    spacing={2}
                                                    style={{ marginTop: "0px", paddingTop: "0px" }}
                                                >
                                                    <Grid item xs={12} style={{ paddingTop: "0px" }}>
                                                        <FormikField
                                                            size="small"
                                                            fontSize='18px'
                                                            name="password"
                                                            label="Password"
                                                            placeholder="Password"
                                                            type={showPassword ? "text" : "password"}
                                                            inputProps={{
                                                                endAdornment: (
                                                                    <>
                                                                        <InputAdornment
                                                                            position="end"
                                                                            sx={{ padding: "10px" }}
                                                                        >
                                                                            <IconButton
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
                                                                        </InputAdornment>
                                                                        <InputAdornment position="end">
                                                                            <Link href="/forgotPassword" passHref>
                                                                                <StyledRespLink>
                                                                                    Forgot password?
                                                                                </StyledRespLink>
                                                                            </Link>
                                                                        </InputAdornment>
                                                                    </>
                                                                ),
                                                            }}
                                                            error={
                                                                ((errors.password as unknown) as boolean) &&
                                                                ((touched.password as unknown) as boolean)
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container mt={2}>
                                                    <Grid item xs={12}>
                                                        <LoadingButton
                                                            type="submit"
                                                            disabled={!dirty || !isValid}
                                                            sx={{
                                                                textTransform: "capitalize",
                                                                fontSize: "14px !important",
                                                                fontWeight: "normal",
                                                                width: "248px", height: "40px"
                                                            }}
                                                            variant="contained"
                                                        >
                                                            Sign in
                                                        </LoadingButton>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        </Box>
                                    );
                                }}
                            </Formik>
                            <Grid container>
                                <Grid item style={{
                                    textAlign: 'center', margin: 'auto', marginTop: '16px', marginBottom: '20px',
                                    fontSize: "14px", lineHeight: "1.29"
                                }}>
                                    not a member yet?
                                    <Link href="/signUp" passHref>
                                        <StyledLink style={{
                                            fontSize: "14px", lineHeight: "1.29"
                                        }}> Sign UP</StyledLink>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </>
            </Modal>
        </>
    );
};

export default PromptLogin;