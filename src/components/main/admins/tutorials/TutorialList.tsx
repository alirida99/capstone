import { Box } from "@mui/material";
import React, { useContext } from "react";
import styles from './tutorials.module.scss';

const TutorialList = (props: any) => {
    const tutorialInfo = {
        id: props.id,
        title: props.title,
        author: props.author,
        creatingDate: props.creatingDate,
        topic: props.topic,
    }

    return (
        <tr key={props.id}>
            <td style={{ width: '25%' }}>{props.title}</td>
            <td style={{ width: '25%' }}>{props.author}</td>
            <td style={{ width: '25%' }}>{props.creatingDate}</td>
            <td style={{ whiteSpace: 'nowrap', width: '25%' }}>
                <button className={styles.btnSave} onClick={props.edit.bind(this, tutorialInfo)}>Edit</button>
                <button className={styles.btnCancel} onClick={props.onRemoveItem.bind(this, tutorialInfo)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default TutorialList;