import styles from './tutorial.module.scss';
import React, { useEffect, useState } from 'react';
import Footer from '../../footer';
import UserAppbar from '../appbar';
import router, { useRouter } from 'next/router';
import MySubTopics from './subTopics';
import AddCircleIcon from '@mui/icons-material/AddCircle';

/** Tutorial List + Tutorial Page */
function UserTutorial() {
  const [popUp, setPopUp] = useState(false)
  const router = useRouter();

  const [tutorials, setTutorials] = useState([] as any);
  const [topics, setTopics] = useState([] as any);
  const [myTutorial, setMyTutorial] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [showSubs, setShowSubs] = useState(false);

  const [myTopic, setMyTopic] = useState('');

  const id = router.query.id;

  const thisTutorial = tutorials.filter((tutorial: any) => {
    return tutorial.id === id;
  });

  useEffect(() => {
    const fetchTutorials = async () => {
      const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials.json');
      const responseTopic = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${myTutorial.map((tutorial: any) => tutorial.id)}/topic.json`);

      if (!response.ok || !responseTopic.ok) {
        throw new Error('Something went wrong!!')
      }

      const responseData = await response.json();
      const responseTopicData = await responseTopic.json();

      const loadedTutorials = [];
      const loadedTopics = [];

      for (const key in responseData) {
        loadedTutorials.push({
          id: key,
          title: responseData[key].title,
          author: responseData[key].author,
          creatingDate: responseData[key].creatingDate,
          topic: responseData[key].topic,
        });
      }
      for (const key in responseTopicData) {
        loadedTopics.push({
          id: key,
          title: responseTopicData[key].title,
          author: responseTopicData[key].author,
          creatingDate: responseTopicData[key].creatingDate,
          subTopic: responseTopicData[key].subTopic,
        });
      }
      setTutorials(loadedTutorials);
      setTopics(loadedTopics);
      setMyTutorial(thisTutorial);
      setIsLoading(false);
    }
    fetchTutorials().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
  }, [myTopic, myTutorial, thisTutorial]);

  const cancel = () => {
    setShowSubs(false)
  }

  return (
    <>
      <div style={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        filter: popUp ? 'blur(4px)' : 'none',
      }}>
        <UserAppbar />
        {!showSubs && myTutorial?.map((tutorial: any) => {
          return (
            <div
              key={tutorial.id}
              className={styles.tutorialcontainer}>
              <h1 className={styles.tutorialtitle} >{tutorial.title}</h1>
              {topics.map((topic: any) => {
                return (
                  <div key={topic.id}>
                    <h1 className={styles.tutorialtopic} onClick={() => { setShowSubs(true); setMyTopic(topic.id) }}> {topic.title} <AddCircleIcon sx={{ color: "green" }} /> </h1>
                  </div>
                )
              }
              )}
              <br /><br />
              <button onClick={() => setPopUp(true)} className={styles.takeexam}> Take Exam </button> {/**Pop up box : Are you sure yu want to start this exam? */}
            </div>
          )
        })
        }
        {showSubs &&
          <MySubTopics
            myTutorial={myTutorial}
            myTopic={myTopic}
            cancel={cancel}
          />
        }
      </div>
      {popUp && <PopUp setPopUp={() => setPopUp(false)} tutorialTitle={myTutorial.map((myT: any) => {
        return (myT.title)
      })} />}
      <Footer />

    </>
  );

}
export default UserTutorial;

const PopUp = (props: any) => {
  // function that takes boolean as param to conditionally display popup
  const setPopUp = props.setPopUp;
  const tutorialTitle = props.tutorialTitle;
  const router = useRouter();

  return (
    <div className={styles.PopUp} style={{ filter: 'none !important' }}>
      {/* x close window */}
      <button className={styles.popupx} onClick={setPopUp} >X</button>
      <div className={styles.pucontentcontainertut}>

        <h1>Are you sure you want to start the exam?</h1>
      </div>
      {/* button controls */}
      <div className={styles.pubuttoncontainer} >
        <button className={styles.popupbutton} onClick={() => {
          router.push({
            pathname: '/user/userExam',
            query: {
              tutorialTitle: tutorialTitle,
            },
          })
        }}> Start exam </button>
      </div>
    </div>
  );
}