import { Box } from "@mui/material";
import React from "react";
import styles from './users.module.scss';

const UsersList = (props: any) => {
    const usersInfo = {
        id: props.id,
        email: props.email,
        firstName: props.firstName,
        familyName: props.familyName,
        age: props.age,
        phoneNumber: props.phoneNumber,
        password: props.password,
    }

    return (
        <tr key={props.id}>
            <td style={{ width: '16.5%' }}>{props.firstName} {props.familyName}</td>
            <td style={{ width: '16.5%' }}>{props.email}</td>
            <td style={{ width: '16.5%' }}>{props.password}</td>
            <td style={{ width: '16.5%' }}>{props.age}</td>
            <td style={{ width: '16.5%' }}>{props.phoneNumber}</td>
            <td style={{ whiteSpace: 'nowrap', width: '17.5%' }}>
                <button className={styles.btnSave} onClick={props.edit.bind(this, usersInfo)}>Edit</button>
                <button className={styles.btnCancel} onClick={props.onRemoveItem.bind(this, props.id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default UsersList;