import styles from './grades.module.scss'
import Footer from "../../footer";
import UserAppbar from "../appbar";
import Icon from '@mui/material/Icon';
import Back from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

function Grades (){
    
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
      <button  className={styles.back} onClick={() => { router.push('/user/userProfile') }}> <Icon><Back/></Icon></button>
      <h1 className={styles.titletext} >Grades</h1>
  
        {/**Loading bar for 100% grade */}
      <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.skillboxper}>
                  <span className={styles.skillpertooltip}>100%</span>  
              </span>
          </div>
      </div>
  
       {/**Loading bar for 90% grade */}
       <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
                <span  className={styles.ninety}>
              <span className={styles.skillpertooltip}>90%</span>
              </span>
          </div>
      </div>
  
       {/**Loading bar for 80% grade */}
       <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.eighty}>
              <span className={styles.skillpertooltip}>80%</span>
              </span>
          </div>
      </div>
      {/**Loading bar for 70% grade */}
      <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.seventy}>
              <span className={styles.skillpertooltip}>70%</span>
              </span>
          </div>
      </div>
  
      {/**Loading bar for 60% grade */}
      <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.sixty}>
              <span className={styles.skillpertooltip}>60%</span>
              </span>
          </div>
      </div>
      {/**Loading bar for 50% grade */}
      <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.fifty}>
              <span className={styles.skillpertooltip}>50%</span>
              </span>
          </div>
      </div>
      {/**Loading bar for 40% grade */}
      <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.fourty}>
              <span className={styles.skillpertooltip}>40%</span>
              </span>
          </div>
      </div>
       {/**Loading bar for 30% grade */}
       <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.thirty}>
              <span className={styles.skillpertooltip}>30%</span>
              </span>
          </div>
      </div>
      {/**Loading bar for 20% grade */}
      <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.twenty}>
              <span className={styles.skillpertooltip}>20%</span>
              </span>
          </div>
      </div>
      {/**Loading bar for 10% grade */}
      <div className={styles.skillboxtitle}>
          <span >Exam title</span>
          <div className={styles.skillboxbar}>
              <span className={styles.ten}>
              <span className={styles.skillpertooltip}>10%</span>
              </span>
          </div>
      </div>
  </div><Footer/></div>
  
  </>
          
    );
  }
  export default Grades;