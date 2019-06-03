import React from 'react'
import { MessageReceived } from '../../model/message.model';
import { UserDefaultImage, NotificationImportantIcon } from '../../resources';

import styles from './received-message.module.sass'

interface Props {
    receivedMessage: MessageReceived
    onClick(): void
}

export function ReceivedMessage({ onClick, receivedMessage }: Props) {
    const { sender, createdDate } = receivedMessage


    return (
        <button onClick={onClick} className={`${styles.message} ${receivedMessage.isRead ? '' : styles.notRead}`}>
            <span>Mensagem de <b>{sender.username}</b></span>
            <img src={sender.imageUrl || UserDefaultImage} alt="" />
            <span> - {createdDate.slice(0, 10).replace(new RegExp('-', 'g'), '/')} </span>
            {receivedMessage.isRead ? null : (
                <NotificationImportantIcon className={styles.notificationIcon} />
            )}
        </button>
    )
}