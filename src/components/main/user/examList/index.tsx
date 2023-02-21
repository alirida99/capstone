
import Footer from '../../footer';
import UserAppbar from '../appbar';
import styles from './examlist.module.scss';
import { useRouter } from 'next/router';

export function UserExamList () { //TutorialList 
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
      <div className={styles.containerlist}>
        <div className={styles.containergrid}>
        <button className={styles.buttonlist} onClick={() => { router.push('/user/userExam') }}>Exam 1</button>
        <button className={styles.buttonlist}> Exam 2</button>
        <button className={styles.buttonlist}> Exam 3</button>
        <button className={styles.buttonlist}> Exam 4</button>
        <button className={styles.buttonlist}> Exam 5</button>
        <button className={styles.buttonlist}>Exam 6</button>
  
        </div>
        
      </div>
      <Footer/>
      </div>
      
      </>
  
    );
  }