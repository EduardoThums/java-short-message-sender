import React, { useState, useEffect, useContext } from 'react'

import styles from './inbox.module.sass'
import { findReceivedMessages } from '../../../../services';
import { MessageReceived } from '../../../../model/message.model';
import { Paged } from '../../../../model';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../../resources';
import { ReceivedMessage } from '../../../../components/received-message/received-message.component';
import { __RouterContext } from 'react-router';

export function Inbox() {

    const { history } = useContext(__RouterContext)

    const [page, setPage] = useState(0)
    const [receivedMessages, setReceivedMessages] = useState<Paged<MessageReceived>>({
        content: [],
        empty: true,
        number: 0,
        totalElements: false,
        numberOfElements: 0,
        first: true,
        last: false,
        pageable: {
            offset: 0,
            pageNumber: 0,
            pageSize: 0,
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            paged: false,
            unpaged: true
        },
        size: 0,
        sort: {
            sorted: false,
            unsorted: true,
            empty: true
        },
        totalPages: 0
    })

    useEffect(() => {
        findReceivedMessages(page).then((received) => {
            setReceivedMessages(received)
            console.log(received)
        })
    }, [page])

    const renderMessages = () => receivedMessages.content.map((m) => (
        <ReceivedMessage receivedMessage={m} onClick={() => { goToMessage(m.id) }} />
    ))

    const goToMessage = (id: number) => {
        history.push(`/home/message/${id}`)
    }

    return (
        <div className={styles.inboxCard}>
            <header>
                <span> CAIXA DE ENTRADA </span>
            </header>

            <section>
                {renderMessages()}
            </section>

            <footer>
                <button>
                    <ArrowLeftIcon />
                </button>
                <button>
                    <ArrowRightIcon />
                </button>
            </footer>
        </div>
    )
}
