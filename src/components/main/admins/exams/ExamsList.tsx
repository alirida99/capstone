import React from "react";
import styles from './exams.module.scss';

const ExamsList = (props: any) => {
    const examInfo = {
        id: props.id,
        type: props.type,
        noq: props.noq,
        time: props.time,
        questions: props.questions,
    }

    return (
        <tr key={props.id}>
            <td style={{ width: '25%' }}>{examInfo.type}</td>
            <td style={{ width: '25%' }}>{examInfo.noq} {examInfo.noq === 1 ? "question" : "questions"}</td>
            <td style={{ width: '25%' }}>{examInfo.time} minutes</td>
            <td style={{ whiteSpace: 'nowrap', width: '25%' }}>
                <button className={styles.btnSave} onClick={props.edit.bind(this, examInfo)}>Edit</button>
                <button className={styles.btnCancel} onClick={props.onRemoveItem.bind(this, props.id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default ExamsList;