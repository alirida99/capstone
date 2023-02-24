
import { useEffect, useState } from 'react';
import Footer from '../../footer';
import UserAppbar from '../appbar';
import styles from './tutlist.module.scss';
import { useRouter } from 'next/router';


export function UserTutorialList() { //TutorialList 
  const router = useRouter();
  const [tutorials, setTutorials] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchTutorials = async () => {
      const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials.json');

      if (!response.ok) {
        throw new Error('Something went wrong!!')
      }

      const responseData = await response.json();

      const loadedTutorials = [];

      for (const key in responseData) {
        loadedTutorials.push({
          id: key,
          title: responseData[key].title,
          author: responseData[key].author,
          creatingDate: responseData[key].creatingDate,
          topic: responseData[key].topic,
        });
      }

      setTutorials(loadedTutorials);
      setIsLoading(false);
    }
    fetchTutorials().catch((error) => {
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
          {!isLoading && !httpError &&
            <div className={styles.containergrid}>
              {tutorials && tutorials.map((tutorial: any) => {
                return (
                  <button
                    key={tutorial.id}
                    className={styles.buttonlist}
                    onClick={() => {
                      router.push({
                        pathname: '/user/userTutorial',
                        query: {
                          id: tutorial.id,
                        }
                      })
                    }}>{tutorial.title}</button>
                )
              })}
            </div>
          }

        </div>
        <Footer /></div>

    </>

  );
}