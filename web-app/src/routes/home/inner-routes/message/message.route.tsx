import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';

import styles from './message.module.sass'
import { BackArrowIcon } from '../../../../resources';
import { __RouterContext } from 'react-router';
import { findMessageById, markMessageAsRead } from '../../../../services';
import { MessageReceived } from '../../../../model/message.model';
import ReactQuill from 'react-quill';

export function MessageRoute({ match }: RouteComponentProps<{ id: string }>) {
    const { id } = match.params

    const { history } = useContext(__RouterContext)

    const [message, setMessage] = useState<MessageReceived>({
        id: 0,
        sender: {
            id: 0,
            username: '',
            imageUrl: ''
        },
        text: '{}',
        createdDate: '',
        isRead: false
    })

    useEffect(() => {
        findMessageById(+id).then((receivedMessage) => {
            setMessage(receivedMessage)

            markMessageAsRead(+id).catch((err) => {
                console.log(err);

            })
        })
    }, [])

    const goBack = () => {
        history.goBack()
    }

    return (
        <div className={styles.messageCard}>
            <header>
                <button onClick={goBack}>
                    <BackArrowIcon />
                </button>
                <span>
                    <b> {message.sender.username} </b> - <b>{message.createdDate.slice(0, 10).replace(new RegExp('-', 'g'), '/')}</b>
                </span>
            </header>

            <section>
                <ReactQuill
                    readOnly={true}
                    value={JSON.parse(message.text)}
                    theme="bubble"
                />
            </section>
        </div>
    )
}