import React from 'react'
import { MessageReceived } from '../../model/message.model';
import { UserDefaultImage, NotificationImportantIcon } from '../../resources';

import styles from './received-message.module.sass'

interface Props {
    receivedMessage: MessageReceived
    onClick(): void
}

export function ReceivedMessage({ onClick, receivedMessage }: Props) {
    const { sender, createdDate, subject } = receivedMessage


    return (
        <button onClick={onClick} className={`${styles.message} ${receivedMessage.isRead ? '' : styles.notRead}`}>
            <img src={sender.imageUrl || UserDefaultImage} alt="" />
            <div className={styles.messageInfo}>
                <span className={styles.subject}> {subject} </span>
                <span className={styles.info}> <b>{sender.username}</b>  - {createdDate.slice(0, 10).replace(new RegExp('-', 'g'), '/')} </span>
            </div>
            {receivedMessage.isRead ? null : (
                <NotificationImportantIcon className={styles.notificationIcon} />
            )}
        </button>
    )
}