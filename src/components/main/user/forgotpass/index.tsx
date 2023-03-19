import styles from './forgotpass.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import Back from '@mui/icons-material/ArrowBack';
import {
  Formik,
  Form,
  Field
} from 'formik';
import router, { useRouter } from 'next/router';
import UserAppbar from '../appbar';
import Icon from '@mui/material/Icon';
import FormikField from '@/components/general/Layouts/TextField/FormikField';
import { Grid,  InputAdornment } from '@mui/material';

function ForgetPass() { 
  const router = useRouter()
  
  function onSubmit(values: any) {
    const user = {
      password: values.newPassword,
    }
    
  }
  return (
    <>
      
        
        <div className={styles.container}>
          <Formik
            initialValues={{
              emailaddress: '',
              
            }}
            
            validateOnChange
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue, handleBlur, handleChange }) => {
              return (
                <Form>
                  <button className={styles.back} onClick={() => { router.push('/logIn') }}> <Icon><Back /></Icon></button>
                  <h1 className={styles.title}>
                    Forgot your password?
                  </h1>
                  <Grid container>
                    <Grid item xs={12}
                      style={{ textAlign: 'left', marginBottom: '50px' }}
                      sx={{
                        "& .formikStyles_label__RfNic": {
                          color: "white"
                        },
                      }}>
                      
                      <h1 className={styles.newpassword}> The new password will be sent to this email address.</h1>
                      
                      
                      <FormikField
                        name="emailaddress"
                        label="Email Address"
                        placeholder="Email Address"
                        
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
                              
                            </InputAdornment></>
                          ),
                        }}
                        
                      />
                    </Grid>
                  </Grid>
                  <button className={styles.update} type="submit">Send</button>
                 
                </Form>
              )
            }}
          </Formik>
        </div>

    </>

  );
}
export default ForgetPass;