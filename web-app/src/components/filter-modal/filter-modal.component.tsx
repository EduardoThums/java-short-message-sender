import React from 'react'

import { MessageFilter } from '../../model';

import styles from './filter-modal.module.sass'
import { SFormInput } from '../generics';

interface Props {
    filterState: [MessageFilter, React.Dispatch<React.SetStateAction<MessageFilter>>],
    modalState: {
        isOpen: boolean,
        closeModal(): void
    }
}

export function FilterModal({ filterState, modalState }: Props) {
    const [filter, setFilter] = filterState
    const { isOpen, closeModal } = modalState


    const handleFilterChange = ({ value,id }: { value: string, id: keyof MessageFilter & string }) => {
        setFilter((prev) => (
            {
                ...prev,
                [id]: value
            }
        ))
    }
    
    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : styles.closed }`}>
            <div className={styles.emptyScreen} onClick={closeModal}/>
            <div className={styles.modalBody}>
                <span> Filter Messages </span>

                <SFormInput<MessageFilter> id='username' handleChange={handleFilterChange} value={filter.username} type="text" label="Sender Username" />
                <SFormInput<MessageFilter> id='subject' handleChange={handleFilterChange} value={filter.subject} type="text" label="Message Subject" />
            </div>
        </div>
    )
}