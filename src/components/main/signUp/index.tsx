/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import * as Yup from 'yup';
import React, { useEffect, useState } from "react";
import { Form, Formik } from 'formik';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormikField from '../../general/Layouts/TextField/FormikField';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styles from './signUp.module.scss';
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/router";

interface FormValues {
    firstName: string;
    familyName: string;
    age: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const MenuProps = {
    PaperProps: {
        style: {
            borderRadius: "10px",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            border: "1px solid black",
            width: "100%",
        },
    },
};

interface SignUpComponentProps { }
const SignUpComponent: React.FC<SignUpComponentProps> = () => {
    // const { user, signup } = useAuth();
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(
        false
    );

    const handleClickShowPassword = () => {
        showPassword
            ? setShowPassword(false)
            : setShowPassword(true);
    };

    const handleClickShowConfirmPassword = () => {
        showConfirmPassword
            ? setShowConfirmPassword(false)
            : setShowConfirmPassword(true);
    };

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
        email: Yup.string()
            .max(320, "Email address invalid!")
            .required("Email address is required!")
            .test(
                "Validate Email",
                "Email address invalid!",
                (value) => {
                    const re =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return re.test(String(value).trim())
                },
            ),
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
        password: Yup.string()
            .min(8, "Too short! Should be at least 8 characters.")
            .required("Password is required!"),
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref("password"), null],
                "Passwords missmatch!"
            )
            .required("Confirm Password is required!"),
        phoneNumber: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Phone number is invalid'
            )
            .min(8, "Phone number should be 8 characters.")
            .max(8, "Phone number should be 8 characters.")
            .required("Phone number is required!"),
        age: Yup.string()
            .min(1, 'Age should be entered.')
            .max(2, 'Age must be max 99.')
    });

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
                    firstName: responseData[key].firstName,
                    familyName: responseData[key].familyName,
                    email: responseData[key].email,
                    phoneNumber: responseData[key].phoneNumber,
                    age: responseData[key].age,
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

    const submitHandler = async (values: FormValues) => {
        // const { email, password } = values;
        // e.preventDefault();
        // console.log(user)
        const user = {
            firstName: values.firstName,
            familyName: values.familyName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            age: values.age,
            password: values.password,
        }
        const email = users.map((user: any) => {
            return (
                `${user.email}`
            )
        });
        if (email.includes(user.email)) {
            setHttpError("Email already exists!!")
            console.log(httpError)
        } else {
            const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            router.push('/')
        }


        // try {
        //     await signup(email, password)
        //     router.push('/logIn')
        // } catch (err) {
        //     console.log(err)
        // }
    }

    return (
        <Box>
            <Grid container className={styles.container}>
                <Grid item xs={6} container className={styles.secondContainer}>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src='/images/eboardlogo.jpg' className={styles.logo} onClick={() => { router.push('/') }} />
                    </Grid>
                    {httpError &&
                        <Grid>
                            {httpError}
                        </Grid>
                    }
                    <Formik
                        validationSchema={SignupSchema}
                        validateOnChange
                        onSubmit={submitHandler}
                        initialValues={{
                            firstName: '',
                            familyName: '',
                            phoneNumber: '',
                            age: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                    >
                        {({ dirty, isValid, errors, touched }) => {
                            return (
                                <Box>
                                    <Form>
                                        <Grid container>
                                            <Grid item xs={12} container style={{ textAlign: 'left', marginBottom: '50px' }}>
                                                <Grid item xs={5.5}>
                                                    <FormikField
                                                        name="firstName"
                                                        label="First Name"
                                                        placeholder={'First Name'}
                                                        type="text"
                                                        error={
                                                            (errors.firstName as unknown as boolean) && (touched.firstName as unknown as boolean)
                                                        }
                                                        sx={{ width: '100%' }}
                                                    />
                                                </Grid>
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={5.5}>
                                                    <FormikField
                                                        name="familyName"
                                                        label="Family Name"
                                                        placeholder={'Family Name'}
                                                        type="text"
                                                        error={
                                                            (errors.familyName as unknown as boolean) && (touched.familyName as unknown as boolean)
                                                        }
                                                        sx={{ width: '100%' }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} style={{ textAlign: 'left', marginBottom: '50px' }}>
                                                <FormikField
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
                                            <Grid item xs={12} container style={{ textAlign: 'left', marginBottom: '50px' }}>
                                                <Grid item xs={7.5}>
                                                    <FormikField
                                                        name="phoneNumber"
                                                        label="Phone Number"
                                                        placeholder={'Phone Number'}
                                                        type="number"
                                                        error={
                                                            (errors.phoneNumber as unknown as boolean) && (touched.phoneNumber as unknown as boolean)
                                                        }
                                                        sx={{ width: '100%' }}
                                                    />
                                                </Grid>
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={3.5}>
                                                    <FormikField
                                                        name="age"
                                                        label="Age"
                                                        placeholder={'Age'}
                                                        type="number"
                                                        error={
                                                            (errors.age as unknown as boolean) && (touched.age as unknown as boolean)
                                                        }
                                                        sx={{ width: '100%' }}
                                                    />
                                                </Grid>
                                                {/* <Grid item xs={5.5}>
                                                    <FormControl fullWidth>
                                                        <span className={styles.label}>
                                                            Class
                                                        </span>
                                                        <Select
                                                            // id="demo-simple-select"
                                                            name="class"
                                                            value={myClass}
                                                            displayEmpty
                                                            onChange={handleChange}
                                                            error={
                                                                ((errors.class as unknown) as boolean) &&
                                                                ((touched.class as unknown) as boolean)
                                                            }
                                                            IconComponent={() => (
                                                                <KeyboardArrowDownIcon
                                                                    sx={{
                                                                        position: "absolute",
                                                                        right: "24px",
                                                                        cursor: "pointer",
                                                                    }}
                                                                />
                                                            )}
                                                            input={
                                                                <OutlinedInput
                                                                    sx={{ color: "gray" }}
                                                                    placeholder="Beirut, Lebanon"
                                                                />
                                                            }
                                                            // onBlur={formik.handleBlur}
                                                            MenuProps={MenuProps}
                                                            inputProps={{ "aria-label": "Without label" }}
                                                        >
                                                            <MenuItem disabled value="">--Class-</MenuItem>
                                                            <MenuItem value={10}>Brevet</MenuItem>
                                                            <MenuItem value={20}>LS</MenuItem>
                                                            <MenuItem value={30}>GS</MenuItem>
                                                            <MenuItem value={30}>ES</MenuItem>
                                                            <MenuItem value={30}>LH</MenuItem>
                                                        </Select>
                                                        <FormHelperText error>
                                                            {((errors.class as unknown) as boolean) &&
                                                                ((touched.class as unknown) as boolean) && (
                                                                    <div className={styles.errorMessage}>
                                                                        {errors.class}
                                                                    </div>
                                                                )}
                                                        </FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={1}></Grid> */}
                                            </Grid>
                                            <Grid item xs={12} container style={{ textAlign: 'left', marginBottom: '50px' }}>
                                                <Grid item xs={5.5} style={{ textAlign: 'left', marginBottom: '50px' }}>
                                                    <FormikField
                                                        name="password"
                                                        label="Password"
                                                        placeholder="Password"
                                                        type={showPassword ? "text" : "password"}
                                                        sx={{ width: '100%' }}
                                                        inputProps={{
                                                            endAdornment: (
                                                                <><InputAdornment position="end" sx={{ padding: '10px' }}>
                                                                    <IconButton
                                                                        // style={{ marginRight: '5px' }}
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
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={5.5} style={{ textAlign: 'left', marginBottom: '50px' }}>
                                                    <FormikField
                                                        name="confirmPassword"
                                                        label="Confirm Password"
                                                        placeholder="Confirm Password"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        sx={{ width: '100%' }}
                                                        inputProps={{
                                                            endAdornment: (
                                                                <><InputAdornment position="end" sx={{ padding: '10px' }}>
                                                                    <IconButton
                                                                        // style={{ marginRight: '5px' }}
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowConfirmPassword}
                                                                        // onMouseDown={handleMouseDownPassword}
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
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <LoadingButton
                                                        type="submit"
                                                        // loading={loading}
                                                        disabled={!dirty || !isValid}
                                                        sx={{ textTransform: 'capitalize', width: '200px', height: '55px', fontSize: '18px !important', fontWeight: 'normal' }}
                                                        variant="contained">
                                                        Sign Up
                                                    </LoadingButton>
                                                </Grid>
                                            </Grid>
                                            <Grid container mt={5}>
                                                <Grid item xs>
                                                </Grid>
                                                <Grid item>
                                                    <Link href="/logIn" variant="body2" style={{ fontSize: '18px' }}>
                                                        {"Already have an account? Sign in"}
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
                <Grid item xs={6}>
                    <img src='/images/e-learning-signup.webp' className={styles.img} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default SignUpComponent;