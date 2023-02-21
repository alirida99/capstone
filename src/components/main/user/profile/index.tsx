import styles from './profile.module.scss';
import React from 'react';
import {
  Formik,
  Form,
  Field} from 'formik';
import router, { useRouter } from 'next/router';
import UserAppbar from '../appbar';
import Footer from '../../footer';

  

function UserProfileComponent() { //update profile information form 
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

        name: '',
        age: '',
        phonenumber:'',
        email:'',

      }}

        onSubmit={(values, actions) => {
          console.log({ values, actions });}}
      
      >
      <Form>
      <h2 className={styles.title} >Personal Information</h2>
      
         <label htmlFor="name" className={styles.labels} >

           <span>Full name
           <Field className={styles.textfields} name="name" placeholder='Maryam Nassreddine' />
           </span>
         </label> 
         
         <br/><br/>
         <label htmlFor="age" className={styles.labels}>
           <span> Age          
           <Field className={styles.textfields} name="age" placeholder=' 23 '/>
           </span>
         </label>
         <br/><br/>
         <label htmlFor="phonenumber" className={styles.labels}>
           <span>Phone
           <Field className={styles.textfields} name="phonenumber" placeholder='81 993696'/>
           </span>
         </label> 
         <br/><br/>
         <label htmlFor="email" className={styles.labels}>
           <span>email
           <a href='' className={styles.email}> maryamnd@gmail.com/</a>
           </span>
         </label> 
         <br/><br/>
       
       <button className={styles.update} type="submit">Update Information</button>
       <br/>
       <br/>
       
       <button  onClick={() => { router.push('/user/userChangepass') }} className={styles.changepass} type="submit">Change Password</button>
       
       <button onClick={() => { router.push('/user/userGrades') }} className={styles.grades} type="submit">View Grades</button>
       
      </Form>
      </Formik>
    </div>
    <Footer/>
    </div>
    
    </>
    
    
    );

}
export default UserProfileComponent;