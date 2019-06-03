import React, { useEffect, useState } from 'react'
import { UserWithID, Paged } from '../../model';
import { getUsersByPage, getPagedUsersByUsername } from '../../services/user.service';

import styles from './user-search-sidebar.module.sass'
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from '../../resources';
import { SInput } from '../generics';
import { UserInSearch } from './user-in-search/user-in-search.component';
import { keyCodes } from '../../utils';

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
        search ? getPagedUsersByUsername({ page: page, username: search }).then((pagedUsers) => {
            setPagedUsers(pagedUsers)
        }) : getUsersByPage(page).then((pagedUsers) => {
            setPagedUsers(pagedUsers)
        })
    }, [page])

    const renderUsers = () => pagedUsers.content.map((u, key) => (
        <UserInSearch user={u} onClick={() => { selectUser(u) }} key={key} />
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

    const searchUsersByUsername = async () => {
        setPage(0)
        const pagedUsers = await getPagedUsersByUsername({ page: page, username: search })
        setPagedUsers(pagedUsers)
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
                    handleChange={({ value }) => { setSearch(value); searchUsersByUsername() }}
                    type='text'
                    placeholder="Procurar"
                    className={styles.searchInput} />
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
