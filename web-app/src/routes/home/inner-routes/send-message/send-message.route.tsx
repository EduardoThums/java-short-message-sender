import React, { useState } from 'react'

import styles from './send-message.module.sass'
import { UserWithID } from '../../../../model';
import { SearchUserIcon } from '../../../../resources';
import { UserSearchSidebar } from '../../../../components/user-search-sidebar/user-search-sidebar.component';

export function SendMessage() {

    const [text, setText] = useState('')
    const [user, setUser] = useState<UserWithID>({ id: 0, username: '', imageUrl: '' })

    const [userSearch, setUserSearch] = useState(false)

    const renderUser = () => user.id ? <div>
        {user.username}  {user.imageUrl}
    </div> : <span>
            Nenhum Usuario Selecionado
    </span>

    const openUserSearch = () => {
        setUserSearch(true)
    }

    const closeUserSearch = () => {
        setUserSearch(false)
    }


    return (
        <>
            <UserSearchSidebar open={userSearch} closeSidebar={closeUserSearch} selectUser={() => {}}/>
            <div className={styles.sendMessageCard}>
                <header>
                    <span> MANDE SUA MENSAGEM </span>
                </header>

                <section>
                    <div className={styles.userSelect}>
                        {renderUser()}
                        <button onClick={openUserSearch}>
                            <SearchUserIcon />
                        </button>
                    </div>
                </section>
            </div>
        </>
    )
}