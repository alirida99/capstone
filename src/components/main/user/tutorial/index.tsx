import styles from './tutorial.module.scss';
import React, { useState } from 'react';
import Footer from '../../footer';
import UserAppbar from '../appbar';
import router, { useRouter } from 'next/router';

/** Tutorial List + Tutorial Page */
function UserTutorial() {
  const [popUp, setPopUp] = useState(false)
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
    <div className={styles.tutorialcontainer}>

         <h1 className={styles.tutorialtitle}  > Tutorial Title </h1>


         {/**new topic  */}
    <div> 
              <h1 className={styles.tutorialtopic}  > Topic </h1>

          <div>   {/**new sub topic   */}

                 <h2 className={styles.subtopic} >sub topic</h2>

                 <p className={styles.description} >DESCRIPTION HERE :Hypertext Markup Language, a standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages: </p>
          
                 <div className={styles.examplecontainer}>
                    <h1 className={styles.eg}>example:</h1>
                    <p className={styles.eg2}>Enter example here: example </p>
                 </div>

        </div>

    </div>

      <br/><br/>
      
      <button onClick={()=>setPopUp(true)} className={styles.takeexam}> Take Exam </button> {/**Pop up box : Are you sure yu want to start this exam? */}
      {popUp && <PopUp setPopUp={setPopUp}/>}
    </div>
    <Footer/></div>
    
    </>
    );

}
export default UserTutorial;

const PopUp = (props: { setPopUp: any; }) => {
  // function that takes boolean as param to conditionally display popup
  const { setPopUp } = props 

  return (
      <div className={styles.PopUp} >
          {/* x close window */}
          <button className={styles.popupx}  onClick={()=> setPopUp(false)} >X</button>
          <div  className={styles.pucontentcontainertut}>
             
              <h1>Are you sure you want to start the exam?</h1>
          </div>
          {/* button controls */}
          <div className={styles.pubuttoncontainer} >
              <button className={styles.popupbutton}  onClick={() => { router.push('/user/userExam') }}> Start exam </button>
          </div>
      </div>
  );
}