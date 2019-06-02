import React, { useContext, useEffect, useState } from 'react'
import { UserWithID, Paged } from '../../model';
import { UserContext } from '../../context/contexts/user.context';
import { getUsersByPage } from '../../services/user.service';

import styles from './user-search-sidebar.module.sass'
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from '../../resources';
import { SInput } from '../generics';
import { UserInSearch } from './user-in-search/user-in-search.component';

interface Props {
    open: boolean

    closeSidebar(): void
    selectUser(user: UserWithID): void
}

export function UserSearchSidebar({ open, closeSidebar, selectUser }: Props) {

    const [page, setPage] = useState(0)
    const [pagedUsers, setPagedUsers] = useState<Paged<UserWithID>>({
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
    const [search, setSearch] = useState('')

    useEffect(() => {
        getUsersByPage(page).then((pagedUsers) => {
            setPagedUsers(pagedUsers)
        })
    }, [page])

    const renderUsers = () => pagedUsers.content.map(u => (
        <UserInSearch user={u} onClick={() => { selectUser(u) }} />
    ))

    const goNextPage = () => {
        if (!pagedUsers.last) {
            setPage(p => p + 1)
        }
    }

    const goPreviousPage = () => {
        if (!pagedUsers.first) {
            setPage(p => p - 1)
        }
    }

    return (
        <div className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>

            <header>
                <div className={styles.titleSection}>
                    <span>PROCURAR USUARIO</span>
                    <button className={styles.closeButton} onClick={closeSidebar}>
                        <CloseIcon />
                    </button>
                </div>
                <SInput
                    id="user-search"
                    value={search}
                    handleChange={({ value }) => { setSearch(value) }}
                    type='text'
                    placeholder="Procurar"
                    className={styles.searchInput}
                    inputOptionalProps={{
                        onBlur: () => {

                        },
                        onKeyPress: () => {

                        }
                    }} />
            </header>

            <section>
                {renderUsers()}
            </section>

            <footer>
                <button
                    disabled={pagedUsers.first}
                    onClick={goPreviousPage}
                >
                    <ArrowLeftIcon />
                </button>
                <button
                    disabled={pagedUsers.last}
                    onClick={goNextPage}
                >
                    <ArrowRightIcon />
                </button>
            </footer>
        </div>
    )
}
