import styles from './exam.module.scss';
import React, { useState } from 'react';
import router, { useRouter } from 'next/router';


import {
  Formik,
  Form,
  Field
} from 'formik';
import Footer from '../../footer';
import UserAppbar from '../appbar';
/** Exam List + Exam Page */

function UsersExam() {
  const router = useRouter()
  const [popUp, setPopUp] = useState(false)


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
        <div className={styles.center}>
          <div className={styles.tutorialcontainer}>

            <Formik
              initialValues={{

                correctanswer: '',
                useranswer: '',


              }}

              onSubmit={(values, actions) => {
                console.log({ values, actions });
              }}

            >
              <Form>

                <h1 className={styles.tutorialtitle}> Exam Title </h1>


                {/**MCQ Questions */}
                <div className={styles.questionbox}> {/**each question is contained inside a questionbox */}
                  <h2 className={styles.questionstatement}>MCQ Question? </h2> {/**Question from database  */}

                  {/**if mcq question  */}
                  <div className={styles.radio} >

                    <label htmlFor="option1">
                      <Field type="radio" name="option" value="option1" />
                      Option 1
                    </label><br />

                    <label htmlFor="option2">
                      <Field type="radio" name="option" value="option2" />
                      Option 2
                    </label><br />
                    <label htmlFor="option3">
                      <Field type="radio" name="option" value="option3" />
                      Option 3
                    </label><br />

                  </div>

                </div> {/** end of questionbox */}
                <br /><br />



                {/**Drag / Drop Questions */}

                <div className={styles.questionbox}>

                  <div className={styles.questionstatement}>

                    <span>Before drag/drop sentence </span>


                    <span>After drag/drop sentence </span>


                  </div>
                </div>
                <br /><br />


                {/**Fill in the blank */}
                <div className={styles.questionbox}>
                  <span className={styles.questionstatement}>First sentence</span>
                  <Field className={styles.fillblank} name="name" placeholder=' fill in the blank' />
                  <span className={styles.questionstatement}> second sentence</span>


                </div>

                <br /><br />

                <button onClick={() => setPopUp(true)} className={styles.submit} > Submit </button> {/** when pressed popup box of grade + view grades button*/}
              </Form>
            </Formik>
          </div>
          {popUp && <PopUp setPopUp={setPopUp} />}
          <Footer />
        </div></div>

    </>
  );

}
export default UsersExam;






const PopUp = (props: { setPopUp: any; }) => {
  // function that takes boolean as param to conditionally display popup
  const { setPopUp } = props

  return (
    <div className={styles.PopUp} >


      <div className={styles.pucontentcontainer}>

        <h1>Result:</h1>
        <h1> 8 of 25</h1> {/**correct answers/total questions */}
        <h1> 32%</h1> {/**percentage */}
        <h1> You must study harder!</h1> {/**if high grade : Good Job! */}
      </div>
      {/* button controls */}
      <div className={styles.pubuttoncontainer} >
        <button className={styles.popupbutton} onClick={() => { router.push('/user/userGrades') }}> View All Grades </button>
        <button className={styles.popupbutton} onClick={() => { router.push('/user/userExamList') }}>Back to exams</button>

      </div>
    </div>
  );
}


