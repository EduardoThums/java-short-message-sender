import React, { useContext, useEffect, useState } from 'react'
import { UserWithID } from '../../model';
import { UserContext } from '../../context/contexts/user.context';
import { getUsersByPage } from '../../services/user.service';

import styles from './user-search-sidebar.module.sass'
import { CloseIcon } from '../../resources';

interface Props {
    open: boolean

    closeSidebar(): void
    selectUser(user: UserWithID): void
}

export function UserSearchSidebar({ open, closeSidebar, selectUser } : Props) {

    const [page, setPage] = useState(0)

    let users: UserWithID[] = []

    useEffect(() => {
        getUsersByPage(page).then((pagedUsers) => {
            users = pagedUsers.content
        })
    }, [page])

    const renderUsers = () => users.map(u => (
        <span> {u.id} - {u.username} </span>
    ))

    return (
        <div className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>

            <header>
                <span>PROCURAR USUARIO</span>
                <button className={styles.closeButton} onClick={closeSidebar}>
                    <CloseIcon />
                </button>
            </header>

            {renderUsers()}
        </div>
    )
}