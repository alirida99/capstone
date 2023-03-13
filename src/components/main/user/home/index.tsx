import styles from './userhome.module.scss';
import { useContext, useEffect } from "react";
import styless from './Carousel.module.scss';
import React, { useState } from "react"
import { useRouter } from 'next/router';
import UserAppbar from '../appbar';
import AppContext from '../../../AppContext/AppContext';

function UserHomeComponent() {
  const router = useRouter()
  const [users, setUsers] = useState([] as any);
  const [user, setUser] = useState([] as any);
  const [thisEmail, setThisEmail] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const context = useContext(AppContext)

  const thisUser = users.filter((user: any) => {
    return user.email === `${thisEmail.map((email: any) => email.userEmail)}`;
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/users.json');
      const responseUser = await fetch('https://capstone-final-adf33-default-rtdb.firebaseio.com/currentUser.json');

      if (!response.ok || !responseUser.ok) {
        throw new Error('Something went wrong!!')
      }

      const responseData = await response.json();
      const responseUserData = await responseUser.json();

      const loadedUsers = [];
      const loadedCurrentUser = [];

      for (const key in responseData) {
        loadedUsers.push({
          id: key,
          firstName: responseData[key].firstName,
          familyName: responseData[key].familyName,
          email: responseData[key].email,
          phoneNumber: responseData[key].phoneNumber,
          age: responseData[key].age,
          password: responseData[key].password,
        });
      }
      for (const key in responseUserData) {
        loadedCurrentUser.push({
          id: key,
          userEmail: responseUserData[key].userEmail,
        });
      }
      setThisEmail(loadedCurrentUser)
      setUsers(loadedUsers);
      setUser(thisUser)
      setIsLoading(false);
    }
    fetchUsers().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
    console.log("-------------------")
    console.log(thisEmail)
  }, [thisEmail, thisUser]);

  return (

    <>

      <div style={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        height: '749px'
      }}>
        <UserAppbar />
        <p className={styles.welcome} >Welcome{isLoading ? '...' : ','}</p>
        {user.map((user: any) => {
          return (
            <p key={user} className={styles.homename} >{user.firstName}</p>
          )
        })}
        <Carousel images={slides} />

      </div>
    </>

  );

}
export default UserHomeComponent;

const slides = [
  {
    image: "/images/cplus.jpg",
    title: "Today's language of creativity ",
  },
  {
    image: "/images/coding3.jpg",
    title: "Good coding takes time",
  },
  {
    image: "/images/coding2.jpg",
    title: "This is a software powered world",
  },
  {
    image: "/images/codinghome2.jpg",
    title: "Keep learning",
  },

];

function Carousel({ images }: { images: any }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  useEffect(() => {

    timeOut =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 2500);
  });

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };
  // console.log(current);
  return (
    <div
      className={styless.carousel}

      onMouseEnter={() => {
        setAutoPlay(false);
        //clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div className={styless.carousel_wrapper} >
        {images.map((image: { image: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => {
          return (
            /* (condition) ? true : false */

            index == current ?
              <div className={styless.carouseloverall}>
                <img className={styless.card_image} src={image.image} alt="" />
                <div className={styless.card_overlay} >
                  <h2 className={styless.card_title} >{image.title}</h2>
                </div>
              </div>
              :
              <div className={styless.carousel_card}>
                <img className={styless.card_image} src={image.image} alt="" />
                <div className={styless.card_overlay} >
                  <h2 className={styless.card_title} >{image.title}</h2>
                </div>
              </div>

          );
        })}
        <div className={styless.carousel_arrow_left} onClick={slideLeft}>
          &lsaquo;
        </div>
        <div className={styless.carousel_arrow_right} onClick={slideRight}>
          &rsaquo;
        </div>

      </div>

    </div>


  );
}