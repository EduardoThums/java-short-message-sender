import React, { useState, useEffect, useContext } from 'react'

import styles from './inbox.module.sass'
import { messageService } from '../../../../services';
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
        messageService.findReceivedMessages(page).then((received) => {
            setReceivedMessages(received)
        })
    }, [page])

    const renderMessages = () => receivedMessages.content.map((m, key) => (
        <ReceivedMessage receivedMessage={m} onClick={() => { goToMessage(m.id) }} key={key} />
    ))

    const goToMessage = (id: number) => {
        history.push(`/home/message/${id}`)
    }

    const goNextPage = () => {
        if (!receivedMessages.last) {
            setPage(p => p + 1)
        }
    }

    const goPreviousPage = () => {
        if (!receivedMessages.first) {
            setPage(p => p - 1)
        }
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
                <button
                    disabled={receivedMessages.first}
                    onClick={goPreviousPage}
                >
                    <ArrowLeftIcon />
                </button>
                <button
                    disabled={receivedMessages.last}
                    onClick={goNextPage}
                >
                    <ArrowRightIcon />
                </button>
            </footer>
        </div>
    )
}
