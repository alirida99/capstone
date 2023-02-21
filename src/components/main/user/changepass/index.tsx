import styles from './password.module.scss';
import React from 'react';
import Back from '@mui/icons-material/ArrowBack';
import {
  Formik,
  Form,
  Field} from 'formik';
import router, { useRouter } from 'next/router';
import UserAppbar from '../appbar';
import Footer from '../../footer';
import Icon from '@mui/material/Icon';

function UserChangepass () { //change password form
    const router = useRouter()
    return (
        <>
        
        <div  style={{ backgroundImage:  "url(/background.jpg)",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    
                    }}>
                      <UserAppbar/>
      <div className={styles.container}>
        <Formik 
        initialValues={{
  
          currentpass: '',
          newpass: '',
          confirmpass:'',
          
  
        }}
  
          onSubmit={(values, actions) => {
            console.log({ values, actions });}}
        
        >
         
        <Form>
        <button  className={styles.back} onClick={() => { router.push('/user/userProfile') }}> <Icon><Back/></Icon></button>
        <h1 className={styles.title}>
         
          Change Password
        </h1>
        
           <label htmlFor="currentpass" className={styles.labels}>
             <span>Current Password
             <Field className={styles.textfields} name="current" />
             </span>
           </label> 
           <br/><br/>
           <label htmlFor="newpass" className={styles.labels}>
             <span>New Password
             <Field className={styles.textfields} name="new" />
             </span>
           </label>
           <br/><br/>
           <label htmlFor="confirmpass" className={styles.labels}>
             <span> Confirm Password         
             <Field className={styles.textfields} name="confirm" />
             </span>
           </label>
         
         <br/>
         <br/>
         
         <button className={styles.update} type="submit">Change Password</button>
         
        </Form>
        </Formik>
      </div><Footer/></div>
      
      </>
  
    );
  }
  export default UserChangepass;