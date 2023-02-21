
import Footer from '../../footer';
import UserAppbar from '../appbar';
import styles from './tutlist.module.scss';
import { useRouter } from 'next/router';


export function UserTutorialList () { //TutorialList 
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
      <button className={styles.buttonlist} onClick={() => { router.push('/user/userTutorial') }}>Tutorial 1</button>
      <button className={styles.buttonlist}> Tutorial 2</button>
      <button className={styles.buttonlist}> Tutorial 3</button>
      <button className={styles.buttonlist}> Tutorial 4</button>
      <button className={styles.buttonlist}> Tutorial 5</button>
      <button className={styles.buttonlist}>Tutorial 6</button>

      </div>
   
    </div>
    <Footer/></div>
   
    </>
  
    );
  }