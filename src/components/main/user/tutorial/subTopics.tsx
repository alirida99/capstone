import { Box, Grid, Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import Back from '@mui/icons-material/ArrowBack';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

import styles from './tutorial.module.scss';

function MySubTopics(props: any) {

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [subTopics, setSubTopics] = useState([] as any);

    useEffect(() => {
        const fetchSubTopics = async () => {
            const response = await fetch(`https://capstone-final-adf33-default-rtdb.firebaseio.com/tutorials/${props.myTutorial.map((tutorial: any) => tutorial.id)}/topic/${props.myTopic}/subTopic.json`);

            if (!response.ok) {
                throw new Error('Something went wrong!!')
            }

            const responseData = await response.json();

            const loadedSubTopics = [];

            for (const key in responseData) {
                loadedSubTopics.push({
                    id: key,
                    title: responseData[key].title,
                    description: responseData[key].description,
                    example: responseData[key].example,
                });
            }

            setSubTopics(loadedSubTopics);
            setIsLoading(false);
        }
        fetchSubTopics().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
        console.log(props.myTopic)
    }, [props.myTopic, props.myTutorial, subTopics]);

    return (
        <Box className={styles.tutorialcontainer}>
            <Grid>
                <button className={styles.back} onClick={props.cancel}> <Icon><Back /></Icon></button>
            </Grid>
            {!isLoading && !httpError &&
                <Grid>
                    {subTopics.map((subTopic: any) => {
                        return (
                            <div key={subTopic.id}>
                                <h2 className={styles.subtopic} >{subTopic.title}</h2>
                                <p className={styles.description}>{subTopic.description}</p>
                                <div className={styles.examplecontainer}>
                                    <h1 className={styles.eg}>example:</h1>
                                    <p className={styles.eg2}>{subTopic.example}</p>
                                </div>
                            </div>
                        )
                    })}
                </Grid>
            }
            {!httpError && isLoading &&
                <HourglassTopIcon sx={{ width: '50px', height: '50px', color: 'green', textAlign: 'center' }} />
            }
            {httpError && !isLoading &&
                <Grid className={styles.error}>
                    {httpError}
                </Grid>
            }
        </Box>
    )
}

export default MySubTopics;