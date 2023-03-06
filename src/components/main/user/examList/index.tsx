
import { useEffect, useState } from 'react';
import Footer from '../../footer';
import UserAppbar from '../appbar';
import styles from './examlist.module.scss';
import { useRouter } from 'next/router';

export function UserExamList() { //TutorialList 
  const router = useRouter();
  const [exams, setExams] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [listMode, setListMode] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/exams.json');

      if (!response.ok) {
        throw new Error('Something went wrong!!')
      }

      const responseData = await response.json();

      const loadedExams = [];

      for (const key in responseData) {
        loadedExams.push({
          id: key,
          type: responseData[key].type,
          numberOfQuestions: responseData[key].noq,
          time: responseData[key].time,
          questions: responseData[key].questions,
        });
      }
      setExams(loadedExams);
      setIsLoading(false);
    }
    fetchExams().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
  }, []);

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
        <div className={styles.containerlist}>
          <div className={styles.containergrid}>
            {exams.map((exam: any) => {
              return (
                <button
                  key={exam.id}
                  className={styles.buttonlist}
                  onClick={() => {
                    setListMode(true);
                    router.push({
                      pathname: '/user/userExam',
                      query: {
                        examId: exam.id,
                        listMode: listMode,
                      }
                    })
                  }}>{exam.type}</button>
              )
            })}
          </div>
        </div>
        <Footer />
      </div>

    </>

  );
}