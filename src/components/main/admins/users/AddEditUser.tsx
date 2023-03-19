import { Box, Grid, IconButton, InputAdornment, Link } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import FormikField from "../../../general/Layouts/TextField/FormikField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from "@mui/lab";
import styles from './users.module.scss';

const AddEditUser = (props: any) => {
    const addUserMode = props.addUserMode;
    const userInfo = props.userInfo;

    const initialValues = {
        id: Math.random(),
        firstName: addUserMode ? "" : userInfo.firstName,
        familyName: addUserMode ? "" : userInfo.familyName,
        email: addUserMode ? "" : userInfo.email,
        password: addUserMode ? "" : userInfo.password,
        confirmPassword: addUserMode ? "" : userInfo.password,
        age: addUserMode ? "" : userInfo.age,
        phoneNumber: addUserMode ? "" : userInfo.phoneNumber,
    };
    function onSubmit(values: any) {
        const user = {
            firstName: values.firstName,
            familyName: values.familyName,
            email: values.email,
            password: values.password,
            age: values.age,
            phoneNumber: values.phoneNumber,
        }
        console.log(user);
        props.onAdd(user);
    }
    function onEditSubmit(values: any) {
        const user = {
            firstName: values.firstName,
            familyName: values.familyName,
            email: values.email,
            password: values.password,
            age: values.age,
            phoneNumber: values.phoneNumber,
        }
        console.log(user);
        props.onEdit(user);
    }

    const validationSchema = Yup.object().shape({
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
            .required("Age should be entered!")
            .min(1, 'Age should be entered.')
            .max(2, 'Age must be contains maximum 2 numbers.')
    })

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

    return (
        <Box>
            <Grid className={styles.create} xs={12}>{addUserMode ? 'Add New User' : 'Edit User'}</Grid>
            <Grid container className={styles.addEditGrid}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={addUserMode ? onSubmit : onEditSubmit}>
                    {({ dirty, isValid, errors, touched, isSubmitting, setFieldValue, handleBlur, handleChange, values }) => {
                        return (
                            <Form autoComplete="off">
                                <Grid container>
                                    <Grid item xs={12} container style={{ textAlign: 'left', marginBottom: '50px' }}>
                                        <Grid item xs={5.5}>
                                            <FormikField
                                                name="firstName"
                                                label="First Name"
                                                placeholder={'First Name'}
                                                type="text"
                                                value={values.firstName}
                                                // defaultValue={addUserMode ? '' : userInfo.firstName}
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
                                                value={values.familyName}
                                                // defaultValue={addUserMode ? '' : userInfo.familyName}
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
                                            value={values.email}
                                            // defaultValue={addUserMode ? '' : userInfo.email}
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
                                                value={values.phoneNumber}
                                                // defaultValue={addUserMode ? '' : userInfo.phoneNumber}
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
                                                value={values.age}
                                                // defaultValue={addUserMode ? '' : userInfo.age}
                                                error={
                                                    (errors.age as unknown as boolean) && (touched.age as unknown as boolean)
                                                }
                                                sx={{ width: '100%' }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container style={{ textAlign: 'left', marginBottom: '50px' }}>
                                        <Grid item xs={5.5} style={{ textAlign: 'left', marginBottom: '50px' }}>
                                            <FormikField
                                                name="password"
                                                label="Password"
                                                placeholder="Password"
                                                type={showPassword ? "text" : "password"}
                                                sx={{ width: '100%' }}
                                                // defaultValue={addUserMode ? '' : userInfo.password}
                                                value={values.password}
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
                                                // defaultValue={addUserMode ? '' : userInfo.password}
                                                value={values.confirmPassword}
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
                                                // disabled={addUserMode && !dirty || !isValid}
                                                sx={{ textTransform: 'capitalize', width: '200px', height: '55px', fontSize: '18px !important', fontWeight: 'normal' }}
                                                variant="contained">
                                                {addUserMode ? 'ADD' : 'UPDATE'}
                                            </LoadingButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <LoadingButton
                                                type="submit"
                                                sx={{ textTransform: 'capitalize', width: '200px', height: '55px', fontSize: '18px !important', fontWeight: 'normal' }}
                                                onClick={props.cancel}
                                                variant="contained">
                                                Cancel
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }
                    }
                </Formik>
            </Grid>
        </Box>
    )
}

export default AddEditUser;