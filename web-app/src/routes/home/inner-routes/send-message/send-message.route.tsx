import React, { useState } from 'react'

import styles from './send-message.module.sass'
import { UserWithID } from '../../../../model';
import { SearchUserIcon } from '../../../../resources';

export function SendMessage() {

    const [text, setText] = useState('')
    const [user, setUser] = useState<UserWithID>({ id: 0, username: '', imageUrl: '' })

    const renderUser = () => user.id ? <div>
        {user.username}  {user.imageUrl}
    </div> : <span>
            Nenhum Usuario Selecionado
    </span>


    return (
        <div className={styles.sendMessageCard}>
            <header>
                <span> MANDE SUA MENSAGEM </span>
            </header>

            <section>
                <div className={styles.userSelect}>
                    {renderUser()}
                    <button>
                        <SearchUserIcon />
                    </button>
                </div>
            </section>
        </div>
    )
}