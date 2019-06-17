import React, { useState, useEffect, useContext } from 'react'

import styles from './inbox.module.sass'
import { messageService } from '../../../../services';
import { MessageReceived } from '../../../../model/message.model';
import { Paged, MessageFilter } from '../../../../model';
import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon, FilterIcon } from '../../../../resources';
import { ReceivedMessage } from '../../../../components/received-message/received-message.component';
import { __RouterContext } from 'react-router';
import { FilterModal } from '../../../../components/filter-modal/filter-modal.component';

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
        last: true,
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
    const [isFilterOpen, setFilterOpen] = useState(false)
    const [filter, setFilter] = useState<MessageFilter>({
        username: '',
        subject: '',
    })

    useEffect(() => {
        messageService.findReceivedMessages(page, filter).then((received) => {
            setReceivedMessages(received)
        })
    }, [page])

    useEffect(() => {
        messageService.findReceivedMessages(0, filter).then((received) => {
            setReceivedMessages(received)
        })
    }, [filter])

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

    const refreshReceivedMessages = () => {
        setFilter({
            username: '',
            subject: ''
        })
        messageService.findReceivedMessages(page, {
            username: '',
            subject: ''
        }).then((received) => {
            setReceivedMessages(received)
        })
    }

    const goPreviousPage = () => {
        if (!receivedMessages.first) {
            setPage(p => p - 1)
        }
    }

    const closeModal = () => {
        setFilterOpen(false)
    }

    const openModal = () => {
        setFilterOpen(true)
    }

    return (
        <>
            <FilterModal filterState={[filter, setFilter]} modalState={{ isOpen: isFilterOpen, closeModal }} />
            <div className={styles.inboxCard}>
                <header>
                    <span> CAIXA DE ENTRADA </span>
                    <div className={styles.buttons}>
                        <button
                            onClick={openModal}
                        >
                            <FilterIcon />
                        </button>
                        <button
                            onClick={refreshReceivedMessages}
                        >
                            <RefreshIcon />
                        </button>
                    </div>
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
        </>
    )
}
