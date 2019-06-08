import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';

import styles from './message.module.sass'
import { BackArrowIcon } from '../../../../resources';
import { __RouterContext } from 'react-router';
import { messageService } from '../../../../services';
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
        subject: '',
        createdDate: '',
        isRead: false
    })

    useEffect(() => {
        messageService.findMessageById(+id).then((receivedMessage) => {
            setMessage(receivedMessage)

            messageService.markMessageAsRead(+id)
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
                    <b> {message.subject} </b>
                </span>
            </header>

            <section>
                <ReactQuill
                    readOnly={true}
                    value={JSON.parse(message.text)}
                    theme="bubble"
                    className={styles.quill}
                />
            </section>
            <footer>
                <span>
                    {message.sender.username} - {message.createdDate.slice(0, 10).replace(new RegExp('-', 'g'), '/')}
                </span>
            </footer>
        </div>
    )
}